'use strict';

const axios = require('axios')
const conf = require('../../../config.js')
const jwt = require('jsonwebtoken')

/**
 * rest controller
 * @type {Class}
 */
export default class extends think.controller.rest {
  /**
   * init
   * @param  {Object} http []
   * @return {}      []
   */
  init(http){
    super.init(http);
    this._isRest = false;
  }
  
  /**
   * before magic method
   * @return {Promise} []
   */
  __before(){
    this.modelInstance.fieldReverse('password,open_id,session_key');
  }

  //获取用户信息
  async infoAction(){
    let auth = think.service('auth'); 
    let userId = auth.getUserId(this.header('token'))
    if(userId){
      let data = await this.modelInstance.find({u_id:userId});
      return this.success(data);
    }else{
      return this.fail('token无效');
    }
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