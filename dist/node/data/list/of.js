"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @description Turn multiple values into an array.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function of
 * @example
 * // of :: (...a) -> [a]
 * import { of } from '@dustinws/zoom/packages/data/list';
 *
 * of(1, 2, 3); // [1, 2, 3]
 *
 * @param  {...Any} items The items to put in the array
 * @return {Array<Any>}
 */
function of() {
  for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  return items;
}

exports.default = of;
module.exports = exports["default"];