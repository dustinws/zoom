'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../core/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description A curried wrapper around the logical || operator.
 * @memberof module:Zoom.Logic
 * @function or
 * @since v1.0.0
 * @example
 * import { or } from '@dustinws/zoom/packages/logic';
 *
 * or(false, true); // true
 * or(true, false); // true
 * or(true, true); // true
 * or(false, false); // false
 *
 * @param  {Any} left The first value
 * @param  {Any} right The second value
 * @return {Any}
 */
var or = (0, _curry2.default)(function (left, right) {
  return left || right;
});

exports.default = or;
module.exports = exports['default'];