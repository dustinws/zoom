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
 * @function multiply
 * @since v2.1.0
 * @example
 * import { multiply } from '@dustinws/zoom/math';
 *
 * multiply(5, 10); // 50
 *
 * @param  {Number} left The first number
 * @param  {Number} right The second number
 * @return {Number}
 */
var multiply = (0, _curry2.default)(function (a, b) {
  return a * b;
});

exports.default = multiply;
module.exports = exports['default'];