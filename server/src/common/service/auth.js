'use strict';

const jwt = require('jsonwebtoken')
const conf = require('../../../config.js')

export default {
  getUserId:function(token){
    if(token){
      const decoded = jwt.verify(token, conf.jwtSecret);
      return decoded.id;
    }else{
      return null;
    }
  }
}