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

  //获取用户信息


  _class.prototype.infoAction = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var user;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return think.service('auth').getUser(this);

            case 2:
              user = _context.sent;

              if (user) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return');

            case 5:
              return _context.abrupt('return', this.success(user));

            case 6:
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
      var _post, code, nickName, avatarUrl, url, res, _res$data, openid, session_key, user, userId, userPoint, userInsert, token;

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
              return this.modelInstance.where({ open_id: openid }).find();

            case 10:
              user = _context2.sent;
              userId = void 0, userPoint = void 0;

              if (think.isEmpty(user)) {
                _context2.next = 20;
                break;
              }

              userId = user.u_id;
              userPoint = user.point;

              if (!(nickName !== user.name || avatarUrl !== user.image_url)) {
                _context2.next = 18;
                break;
              }

              _context2.next = 18;
              return this.modelInstance.where({ open_id: openid }).update({ name: nickName, image_url: avatarUrl });

            case 18:
              _context2.next = 25;
              break;

            case 20:
              _context2.next = 22;
              return this.modelInstance.add({ name: nickName, image_url: avatarUrl, open_id: openid, session_key: session_key });

            case 22:
              userInsert = _context2.sent;

              userId = userInsert.u_id;
              userPoint = 0; //默认积分为0

            case 25:
              token = jwt.sign({ id: userId }, conf.jwtSecret, { expiresIn: '7d' });
              return _context2.abrupt('return', this.success({ token: token, user: { nickName: nickName, avatarUrl: avatarUrl, point: userPoint } }));

            case 27:
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

  _class.prototype.pointAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var user;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return think.service('auth').getUser(this);

            case 2:
              user = _context3.sent;

              if (user) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt('return');

            case 5:
              return _context3.abrupt('return', this.success({ point: user.point }));

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function pointAction() {
      return _ref3.apply(this, arguments);
    }

    return pointAction;
  }();

  return _class;
}(think.controller.rest);

exports.default = _class;
module.exports = exports['default'];