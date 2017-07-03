"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @description Get an object's enumberable keys as an array of strings
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function keys
 * @example
 * // keys :: { String: * } -> [String]
 * import { keys } from '@dustinws/zoom/packages/data/record';
 *
 * keys({ a: 1, b: 2 }) // ['a', 'b']
 *
 * @param  {Object} object The object to query
 * @return {Array<String>}
 */
function keys(object) {
  return Object.keys(object);
}

exports.default = keys;
module.exports = exports["default"];