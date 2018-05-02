'use strict';

const axios = require('axios')
const conf = require('../../../config.js')
const jwt = require('jsonwebtoken')

export default class extends think.controller.rest {
  
  init(http){
    super.init(http);
    this._isRest = false;
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
    let user = await this.modelInstance.where({open_id: openid}).find();
    let userId,userPoint;
    if(!think.isEmpty(user)){
      userId = user.u_id;
      userPoint = user.point;
      if(nickName!==user.name || avatarUrl!== user.image_url)await this.modelInstance.where({open_id: openid}).update({name: nickName, image_url: avatarUrl})
    }else{
      let userInsert = await this.modelInstance.add({name: nickName, image_url: avatarUrl, open_id: openid, session_key: session_key});
      userId = userInsert.u_id;
      userPoint = 0;//默认积分为0
    }
    const token = jwt.sign({ id: userId }, conf.jwtSecret, { expiresIn: '7d' });
    return this.success({token,user:{nickName, avatarUrl, point:userPoint}});
  }

}