'use strict';

exports.__esModule = true;
var jwt = require('jsonwebtoken');
var conf = require('../../../config.js');

exports.default = {
  getUserId: function getUserId(controllerInstance) {
    var token = controllerInstance.header('token');
    try {
      var decoded = jwt.verify(token, conf.jwtSecret);
      return decoded.id;
    } catch (error) {
      controllerInstance.fail('token无效');
    }
  }
};
module.exports = exports['default'];