'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../core/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description A curried wrapper around the logical && operator.
 * @memberof module:Zoom.Logic
 * @function and
 * @since v1.0.0
 * @example
 * import { and } from '@dustinws/zoom/packages/logic';
 *
 * and(false, true); // false
 * and(true, false); // false
 * and(true, true); // true
 *
 * @param  {Any} left The first value
 * @param  {Any} right The second value
 * @return {Any}
 */
var and = (0, _curry2.default)(function (left, right) {
  return left && right;
});

exports.default = and;
module.exports = exports['default'];