'use strict';

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$controller$res) {
  (0, _inherits3.default)(_class, _think$controller$res);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$controller$res.apply(this, arguments));
  }

  _class.prototype.init = function init(http) {
    var _prizeTable;

    _think$controller$res.prototype.init.call(this, http);
    this._isRest = false;
    var prizeTable = (_prizeTable = {
      "1": 1
    }, _prizeTable["1"] = 1, _prizeTable["1"] = 1, _prizeTable["1"] = 1, _prizeTable);
  };

  _class.prototype.currentAction = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var user, current, user_lottery, lotteryId;
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

              return _context.abrupt("return");

            case 5:
              _context.next = 7;
              return this.modelInstance.where({ 'owner': user.u_id, status: 1 }).find();

            case 7:
              current = _context.sent;

              if (think.isEmpty(current)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", this.success(current));

            case 12:
              _context.next = 14;
              return this.modelInstance.where({ 'owner': user.u_id }).select();

            case 14:
              user_lottery = _context.sent;
              lotteryId = void 0;
              // 前三次免费
              // status: 0可以开奖,1人数不够开奖,2已经开过奖

              if (!(user_lottery.length <= 3)) {
                _context.next = 22;
                break;
              }

              _context.next = 19;
              return this.modelInstance.add({ 'owner': user.u_id, status: 1 });

            case 19:
              lotteryId = _context.sent;
              _context.next = 31;
              break;

            case 22:
              if (!(user.point > 10)) {
                _context.next = 30;
                break;
              }

              _context.next = 25;
              return this.model('user').where({ 'u_id': user.u_id }).decrement('point', 10);

            case 25:
              _context.next = 27;
              return this.modelInstance.add({ 'owner': user.u_id, status: 1 });

            case 27:
              lotteryId = _context.sent;
              _context.next = 31;
              break;

            case 30:
              return _context.abrupt("return", this.fail('积分不足以发起抽奖'));

            case 31:
              _context.next = 33;
              return this.model('user_lottery').add({ 'user_id': user.u_id, lottery_id: lotteryId });

            case 33:
              return _context.abrupt("return", this.success({ id: lotteryId, status: 1 }));

            case 34:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function currentAction() {
      return _ref.apply(this, arguments);
    }

    return currentAction;
  }();

  _class.prototype.joinAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var userId, _post, lotteryId, lotteryInfo;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userId = think.service('auth').getUserId(this);
              _post = this.post(), lotteryId = _post.lotteryId;
              _context2.next = 4;
              return this.model('user_lottery').where({ user_id: userId, lottery_id: lotteryId }).find();

            case 4:
              lotteryInfo = _context2.sent;

              if (!think.isEmpty(lotteryInfo)) {
                _context2.next = 11;
                break;
              }

              _context2.next = 8;
              return this.model('user_lottery').add({ user_id: userId, lottery_id: lotteryId });

            case 8:
              return _context2.abrupt("return", this.success('成功加入'));

            case 11:
              return _context2.abrupt("return", this.fail('你已经加入过了'));

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function joinAction() {
      return _ref2.apply(this, arguments);
    }

    return joinAction;
  }();

  _class.prototype.startAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function startAction() {
      return _ref3.apply(this, arguments);
    }

    return startAction;
  }();

  _class.prototype.historyAction = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function historyAction() {
      return _ref4.apply(this, arguments);
    }

    return historyAction;
  }();

  _class.prototype.myAction = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function myAction() {
      return _ref5.apply(this, arguments);
    }

    return myAction;
  }();

  return _class;
}(think.controller.rest);

exports.default = _class;
module.exports = exports["default"];