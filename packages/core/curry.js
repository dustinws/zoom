'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = curry;

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof module:core
 * @description Convert a non-curried function to a curried function. This
 * includes compatibility with "core.__".
 * @since v1.0.0
 * @function curry
 * @example
 * import { curry } from '@dustinws/zoom/packages/core';
 *
 * const add = curry((a, b) => a + b);
 *
 * add(1, 4); // 5
 * add(1)(4); // 5
 * add(1); // [Function]
 * add(1)(); // [Function]
 *
 * @param  {Function} func The function to curry.
 * @return {Function}
 */
function curry(func) {
  return (0, _curryN2.default)(func.length, func);
}
module.exports = exports['default'];