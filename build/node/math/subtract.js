'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Multiply two numbers.
 * @memberof module:Zoom.Math
 * @function subtract
 * @since v2.1.0
 * @example
 * import { subtract } from '@dustinws/zoom/math';
 *
 * subtract(15, 5); // 10
 *
 * @param  {Number} minuend The first number
 * @param  {Number} subtrahend The second number
 * @return {Number}
 */
var subtract = (0, _curry2.default)(function (minuend, subtrahend) {
  return minuend - subtrahend;
});

exports.default = subtract;
module.exports = exports['default'];