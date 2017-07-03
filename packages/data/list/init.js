"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @description Get all elements except the last one.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function init
 * @example
 * // init :: [a] -> [a]
 * import { init } from '@dustinws/zoom/packages/data/list';
 *
 * init([1, 2, 3, 4]); // [2, 3, 4]
 * init([1]); // []
 * init([]); // []
 *
 * @param  {Array<T>} array The array to use
 * @return {Array<T>}
 */
function init(array) {
  return array.slice(0, -1);
}

exports.default = init;
module.exports = exports["default"];