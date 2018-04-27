'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require('axios');
var conf = require('../../../config.js');
var jwt = require('jsonwebtoken');

var _class = function (_think$controller$res) {
  (0, _inherits3.default)(_class, _think$controller$res);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$controller$res.apply(this, arguments));
  }

  _class.prototype.init = function init(http) {
    _think$controller$res.prototype.init.call(this, http);
    this._isRest = false;
  };

  _class.prototype.__before = function __before() {
    this.modelInstance.fieldReverse('password,open_id,session_key');
  };

  //获取用户信息


  _class.prototype.infoAction = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var userId, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userId = think.service('auth').getUserId(this);

              if (userId) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return');

            case 3:
              _context.next = 5;
              return this.modelInstance.find({ u_id: userId });

            case 5:
              data = _context.sent;
              return _context.abrupt('return', this.success(data));

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function infoAction() {
      return _ref.apply(this, arguments);
    }

    return infoAction;
  }();

  //添加用户


  _class.prototype.loginAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var _post, code, nickName, avatarUrl, url, res, _res$data, openid, session_key, insertId, token;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _post = this.post(), code = _post.code, nickName = _post.nickName, avatarUrl = _post.avatarUrl;
              url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + conf.appId + '&secret=' + conf.appSecret + '&js_code=' + code + '&grant_type=authorization_code';
              _context2.next = 4;
              return axios.get(url);

            case 4:
              res = _context2.sent;
              _res$data = res.data, openid = _res$data.openid, session_key = _res$data.session_key;

              if (openid) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt('return', this.fail('code无效'));

            case 8:
              _context2.next = 10;
              return this.modelInstance.thenAdd({ name: nickName, image_url: avatarUrl, open_id: openid, session_key: session_key }, { open_id: openid });

            case 10:
              insertId = _context2.sent;
              token = jwt.sign({ id: insertId.u_id }, conf.jwtSecret, { expiresIn: '7d' });
              return _context2.abrupt('return', this.success({ token: token }));

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function loginAction() {
      return _ref2.apply(this, arguments);
    }

    return loginAction;
  }();

  return _class;
}(think.controller.rest);

exports.default = _class;
module.exports = exports['default'];