'use strict';
/**
 * db config
 * @type {Object}
 */

exports.__esModule = true;
var conf = require('../../../config.js');

exports.default = {
  type: 'mysql',
  adapter: {
    mysql: {
      host: conf.mysql.host,
      port: conf.mysql.port,
      database: conf.mysql.db,
      user: conf.mysql.user,
      password: conf.mysql.pass,
      prefix: '',
      encoding: conf.mysql.char
    },
    mongo: {}
  }
};
module.exports = exports['default'];