'use strict';

const axios = require('axios')
const conf = require('../../../config.js')
const jwt = require('jsonwebtoken')

export default class extends think.controller.rest {
  
  init(http){
    super.init(http);
    this._isRest = false;
  }
  
  __before(){
    this.modelInstance.fieldReverse('password,open_id,session_key');
  }

  //获取用户信息
  async infoAction(){
    let user = await think.service('auth').getUser(this)
    if(!user)return;
    return this.success(user);
  }

  //添加用户
  async loginAction(){
    let { code, nickName, avatarUrl } = this.post();
    const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' +
      conf.appId + '&secret=' + conf.appSecret + '&js_code=' + code + '&grant_type=authorization_code'
    const res = await axios.get(url)
    const { openid, session_key } = res.data
    if (!openid){
      return this.fail('code无效');
    }
    let insertId = await this.modelInstance.thenAdd({name: nickName, image_url: avatarUrl, open_id: openid, session_key: session_key},{open_id: openid});
    const token = jwt.sign({ id: insertId.u_id }, conf.jwtSecret, { expiresIn: '7d' })
    return this.success({token});
  }

}