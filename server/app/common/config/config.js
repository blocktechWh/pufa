'use strict';
/**
 * config
 */

exports.__esModule = true;
var conf = require('../../../config.js');

exports.default = {
  port: conf.port,
  deny_module_list: ['home']
};
module.exports = exports['default'];