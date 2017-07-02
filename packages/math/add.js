'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../core/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description A curried wrapper around the + operator.
 * @memberof module:Zoom.Math
 * @function add
 * @since v1.0.0
 * @example
 * import { add } from '@dustinws/zoom/packages/math';
 *
 * add(3, 2); // 5
 *
 * @param  {Number} left The first value
 * @param  {Number} right The second value
 * @return {Number}
 */
var add = (0, _curry2.default)(function (left, right) {
  return Number(left) + Number(right);
});

exports.default = add;
module.exports = exports['default'];