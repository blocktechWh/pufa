'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwt = require('jsonwebtoken');
var conf = require('../../../config.js');

exports.default = {
  getUserId: function getUserId(controllerInstance) {
    var token = controllerInstance.header('token');
    if (!token) {
      controllerInstance.fail('token不能为空');
      return;
    }
    try {
      var decoded = jwt.verify(token, conf.jwtSecret);
      return decoded.id;
    } catch (error) {
      controllerInstance.fail('token无效');
    }
  },
  getUser: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(controllerInstance) {
      var token, decoded, user;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = controllerInstance.header('token');

              if (token) {
                _context.next = 4;
                break;
              }

              controllerInstance.fail('token不能为空');
              return _context.abrupt('return');

            case 4:
              _context.prev = 4;
              decoded = jwt.verify(token, conf.jwtSecret);
              _context.next = 8;
              return controllerInstance.model('user').find({ 'u_id': decoded.id }).select();

            case 8:
              user = _context.sent;
              return _context.abrupt('return', user);

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](4);

              controllerInstance.fail('token无效');

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[4, 12]]);
    }));

    function getUser(_x) {
      return _ref.apply(this, arguments);
    }

    return getUser;
  }()
};
module.exports = exports['default'];