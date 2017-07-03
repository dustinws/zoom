"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = negate;
/**
 * @memberof module:Zoom.Lambda
 * @description Given a function that returns a truthy / falsy value,
 * return a new function that returns the the opposite truthy / falsy value.
 * @since v1.0.0
 * @function negate
 * @example
 * // negate :: (a..c -> Bool) -> (a..c) -> Bool
 * import { negate } from '@dustinws/zoom/packages/core';
 *
 * const isOdd = n => n % 2;
 * const isEven = negate(isOdd);
 *
 * isOdd(5) // true
 * isEven(5) // false
 *
 * @param  {Function} func The function to negate
 * @return {Function}
 */
function negate(func) {
  return function () {
    return !func.apply(undefined, arguments);
  };
}
module.exports = exports["default"];