'use strict';
/**
 * config
 */
const conf = require('../../../config.js')

export default {
  port: conf.port,
  deny_module_list:['home']
};