'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */

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

var _class = function (_think$logic$base) {
  (0, _inherits3.default)(_class, _think$logic$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$logic$base.apply(this, arguments));
  }

  _class.prototype.startAction = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.validate({
                lotteryId: "int|required"
              })) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', this.fail('validate error', this.errors()));

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function startAction() {
      return _ref.apply(this, arguments);
    }

    return startAction;
  }();

  _class.prototype.joinAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.validate({
                lotteryId: "int|required"
              })) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', this.fail('validate error', this.errors()));

            case 2:
            case 'end':
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

  _class.prototype.infoAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.validate({
                lotteryId: "int|required"
              })) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', this.fail('validate error', this.errors()));

            case 2:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function infoAction() {
      return _ref3.apply(this, arguments);
    }

    return infoAction;
  }();

  return _class;
}(think.logic.base);

exports.default = _class;
module.exports = exports['default'];