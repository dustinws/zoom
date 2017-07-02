'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = guard;

var _tupleOf = require('./tupleOf');

var _tupleOf2 = _interopRequireDefault(_tupleOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function guard(contracts) {
  return function (func) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var returnType = contracts[contracts.length - 1];

      return (0, _tupleOf2.default)(contracts.slice(0, -1), args).chain(function () {
        return returnType(func.apply(undefined, args));
      }).cata({
        Failure: function Failure(error) {
          console.log('[CheckError]', error); // eslint-disable-line no-console
          return error;
        },
        Success: function Success(value) {
          return value;
        }
      });
    };
  };
}
module.exports = exports['default'];