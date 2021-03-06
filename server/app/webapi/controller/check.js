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

  _class.prototype.__before = function __before() {};

  _class.prototype.indexAction = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var userId, checkInfo, dateService, last_visit_date, check_times, check_times_total;
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
              return this.modelInstance.where({ user_id: userId }).find();

            case 5:
              checkInfo = _context.sent;

              if (!think.isEmpty(checkInfo)) {
                _context.next = 13;
                break;
              }

              _context.next = 9;
              return this.modelInstance.add({ user_id: userId, check_times: 1, check_times_total: 1 });

            case 9:
              _context.next = 11;
              return this.model('user').where({ 'u_id': userId }).increment('point', 1);

            case 11:
              _context.next = 32;
              break;

            case 13:
              dateService = think.service('date');
              last_visit_date = new Date(checkInfo.last_visit_time);

              if (!dateService.isToday(last_visit_date)) {
                _context.next = 19;
                break;
              }

              return _context.abrupt('return', this.fail('今天已经签到过了'));

            case 19:
              if (!dateService.isYestday(last_visit_date)) {
                _context.next = 28;
                break;
              }

              check_times = checkInfo.check_times === 7 ? 1 : checkInfo.check_times + 1; //7天清零

              check_times_total = checkInfo.check_times_total + 1;
              _context.next = 24;
              return this.modelInstance.where({ user_id: userId }).update({ check_times: check_times, check_times_total: check_times_total, last_visit_time: ['exp', 'CURRENT_TIMESTAMP()'] }, { user_id: userId });

            case 24:
              _context.next = 26;
              return this.model('user').where({ 'u_id': userId }).increment('point', check_times);

            case 26:
              _context.next = 32;
              break;

            case 28:
              _context.next = 30;
              return this.modelInstance.where({ user_id: userId }).update({ check_times: 1, check_times_total: 1, last_visit_time: ['exp', 'CURRENT_TIMESTAMP()'] }, { user_id: userId });

            case 30:
              _context.next = 32;
              return this.model('user').where({ 'u_id': userId }).increment('point', 1);

            case 32:
              _context.next = 34;
              return this.model('check_log').add({ user_id: userId });

            case 34:
              _context.next = 36;
              return this.modelInstance.where({ user_id: userId }).getField('check_times,check_times_total,last_visit_time', true);

            case 36:
              checkInfo = _context.sent;
              return _context.abrupt('return', this.success({ checkInfo: checkInfo }));

            case 38:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function indexAction() {
      return _ref.apply(this, arguments);
    }

    return indexAction;
  }();

  _class.prototype.historyAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var userId, _post, year, month, MonthHistory, checkInfo;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userId = think.service('auth').getUserId(this);

              if (userId) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt('return');

            case 3:
              _post = this.post(), year = _post.year, month = _post.month;
              _context2.next = 6;
              return this.model('check_log').where('user_id=' + userId + ' AND DATE_FORMAT( check_time, \'%Y%m\' ) = ' + year + '' + month + ' ').getField('check_time');

            case 6:
              MonthHistory = _context2.sent;
              _context2.next = 9;
              return this.modelInstance.where({ user_id: userId }).getField('check_times,check_times_total,last_visit_time', true);

            case 9:
              checkInfo = _context2.sent;
              return _context2.abrupt('return', this.success({ checkInfo: checkInfo, MonthHistory: MonthHistory }));

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function historyAction() {
      return _ref2.apply(this, arguments);
    }

    return historyAction;
  }();

  return _class;
}(think.controller.rest);

exports.default = _class;
module.exports = exports['default'];