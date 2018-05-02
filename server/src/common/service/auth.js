'use strict';

const jwt = require('jsonwebtoken')
const conf = require('../../../config.js')

export default {
  getUserId:function(controllerInstance){
    let token = controllerInstance.header('token')
    if(!token){
      controllerInstance.fail('token不能为空');
      return;
    }
    try {
      const decoded = jwt.verify(token, conf.jwtSecret);
      return decoded.id
    } catch (error) {
      controllerInstance.fail('token无效');
    }
  },
  getUser:async function(controllerInstance){
    let token = controllerInstance.header('token')
    if(!token){
      controllerInstance.fail('token不能为空');
      return;
    }
    try {
      const decoded = jwt.verify(token, conf.jwtSecret);
      const user = await controllerInstance.model('user').where({'u_id': decoded.id}).find();
      return user
    } catch (error) {
      controllerInstance.fail('token无效');
    }
  }
}