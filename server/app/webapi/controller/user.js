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

/**
 * rest controller
 * @type {Class}
 */

var _class = function (_think$controller$res) {
  (0, _inherits3.default)(_class, _think$controller$res);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$controller$res.apply(this, arguments));
  }

  /**
   * init
   * @param  {Object} http []
   * @return {}      []
   */
  _class.prototype.init = function init(http) {
    _think$controller$res.prototype.init.call(this, http);
  };
  /**
   * before magic method
   * @return {Promise} []
   */


  _class.prototype.__before = function __before() {
    this.modelInstance.fieldReverse('password,open_id,session_key');
  };

  _class.prototype.getAction = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var auth, userId, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              auth = think.service('auth');
              userId = auth.getUserId(this.header('token'));

              if (!userId) {
                _context.next = 9;
                break;
              }

              _context.next = 5;
              return this.modelInstance.find({ u_id: userId });

            case 5:
              data = _context.sent;
              return _context.abrupt('return', this.success(data));

            case 9:
              return _context.abrupt('return', this.fail('token无效'));

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getAction() {
      return _ref.apply(this, arguments);
    }

    return getAction;
  }();

  //添加用户


  _class.prototype.postAction = function () {
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

    function postAction() {
      return _ref2.apply(this, arguments);
    }

    return postAction;
  }();

  //不允许删除


  _class.prototype.deleteAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt('return', this.deny());

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function deleteAction() {
      return _ref3.apply(this, arguments);
    }

    return deleteAction;
  }();

  //不允许更新


  _class.prototype.putAction = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt('return', this.deny());

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function putAction() {
      return _ref4.apply(this, arguments);
    }

    return putAction;
  }();

  return _class;
}(think.controller.rest);

exports.default = _class;
module.exports = exports['default'];