'use strict';

const jwt = require('jsonwebtoken')
const conf = require('../../../config.js')

export default {
  getUserId:function(controllerInstance){
    let token = controllerInstance.header('token')
    try {
      const decoded = jwt.verify(token, conf.jwtSecret);
      return decoded.id
    } catch (error) {
      controllerInstance.fail('token无效');
    }
  }
}