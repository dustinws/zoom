'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = curry;

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a curried function from a regular function.
 *
 * @param  {Function} func
 * @return {Function}
 */
function curry(func) {
  return (0, _curryN2.default)(func.length, func);
}
module.exports = exports['default'];