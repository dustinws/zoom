"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = complement;
/**
 * @memberof module:core
 * @description Given a function that returns a truthy / falsy value,
 * return a new function that returns the the opposite truthy / falsy value.
 * @since v1.0.0
 * @function complement
 * @example
 * import { complement } from '@dustinws/zoom/packages/core';
 *
 * const isOdd = n => n % 2;
 * const isEven = complement(isOdd);
 *
 * isOdd(5) // true
 * isEven(5) // false
 *
 * @param  {Function} func The function to complement
 * @return {Function}
 */
function complement(func) {
  return function () {
    return !func.apply(undefined, arguments);
  };
}
module.exports = exports["default"];