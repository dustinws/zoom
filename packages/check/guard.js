'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tupleOf = require('./tupleOf');

var _tupleOf2 = _interopRequireDefault(_tupleOf);

var _curryN = require('../core/curryN');

var _curryN2 = _interopRequireDefault(_curryN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var guard = function guard(contracts, func) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var returnType = contracts[contracts.length - 1];

  return (0, _tupleOf2.default)(contracts.slice(0, -1), args).chain(function () {
    return returnType(func.apply(undefined, args));
  }).cata({
    Failure: function Failure(error) {
      if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'testing') {
        console.log('[CheckError]', error);
      }
      return func.apply(undefined, args);
    },
    Success: function Success(value) {
      return value;
    }
  });
};

exports.default = (0, _curryN2.default)(3, guard);
module.exports = exports['default'];