"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @description Return the identity element of the List monoid.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function empty
 * @example
 * // empty :: * -> [*]
 * import { concat, empty, fold } from '@dustinws/zoom/data/list';
 *
 * empty(); // []
 *
 * // Practical usage
 * const concatAll = fold(concat, empty());
 *
 * concatAll([[1], [2], [3], [4]]); // [1, 2, 3, 4]
 *
 * @return {Array}
 */
function empty() {
  return [];
}

exports.default = empty;
module.exports = exports["default"];