'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$logic$base) {
  (0, _inherits3.default)(_class, _think$logic$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$logic$base.apply(this, arguments));
  }

  _class.prototype.infoAction = function infoAction() {
    var rules = {
      token: {
        required: true,
        value: this.header('token')
      }
    };
    var flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.errors());
    }
  };

  _class.prototype.loginAction = function loginAction() {
    var rules = {
      code: "string|required",
      nickName: "string|maxLength:100|required",
      avatarUrl: "string|url|required"
    };
    var flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.errors());
    }
  };

  return _class;
}(think.logic.base);

exports.default = _class;
module.exports = exports['default'];