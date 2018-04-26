'use strict';

exports.__esModule = true;
var jwt = require('jsonwebtoken');
var conf = require('../../../config.js');

exports.default = {
  getUserId: function getUserId(token) {
    if (token) {
      var decoded = jwt.verify(token, conf.jwtSecret);
      return decoded.id;
    } else {
      return null;
    }
  }
};
module.exports = exports['default'];