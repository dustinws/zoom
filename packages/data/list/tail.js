"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @description Return a new array that does not include the first element.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function tail
 * @example
 * // tail :: [a] -> [a]
 * import { tail } from '@dustinws/zoom/packages/data/tail';
 *
 * tail([1, 2, 3, 4]); // [2, 3, 4]
 * tail([1]); // []
 * tail([]); // []
 *
 * @param  {Array<T>} array The array to use
 * @return {Array<T>}
 */
function tail(array) {
  return array.slice(1);
}

exports.default = tail;
module.exports = exports["default"];