"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @description A delegate to `Math.ceil`.
 * @memberof module:Zoom.Math
 * @function ceil
 * @since v2.1.0
 * @example
 * import { ceil } from '@dustinws/zoom/math';
 *
 * ceil(4.000213); // 5
 *
 * @param  {Number} num The number to round up.
 * @return {Number}
 */
var ceil = function ceil(num) {
  return Math.ceil(num);
};

exports.default = ceil;
module.exports = exports["default"];