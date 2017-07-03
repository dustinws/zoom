'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Divide two numbers.
 * @memberof module:Zoom.Math
 * @function divide
 * @since v2.1.0
 * @example
 * import { divide } from '@dustinws/zoom/math';
 *
 * divide(10, 5); // 2
 *
 * @param  {Number} dividend The number to divide
 * @param  {Number} divisor The number to divide by
 * @return {Number}
 */
var divide = (0, _curry2.default)(function (dividend, divisor) {
  return dividend / divisor;
});

exports.default = divide;
module.exports = exports['default'];