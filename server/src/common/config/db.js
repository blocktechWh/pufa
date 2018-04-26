'use strict';
/**
 * db config
 * @type {Object}
 */
const conf = require('../../../config.js')

export default {
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
    mongo: {

    }
  }
};