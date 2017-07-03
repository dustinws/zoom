"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @description A delegate to `Math.floor`.
 * @memberof module:Zoom.Math
 * @function floor
 * @since v2.1.0
 * @example
 * import { floor } from '@dustinws/zoom/math';
 *
 * floor(4.000213); // 5
 *
 * @param  {Number} num The number to round up.
 * @return {Number}
 */
var floor = function floor(num) {
  return Math.floor(num);
};

exports.default = floor;
module.exports = exports["default"];