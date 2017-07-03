'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Concatenate two arrays together.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function concat
 * @example
 * // concat :: [a] -> [a] -> [a]
 * import { concat } from '@dustinws/zoom/packages/data/list';
 *
 * concat([1], [2]); // [1, 2]
 *
 * @param  {Array<T>} left The first array
 * @param  {Array<T>} right The second array
 * @return {Array<T>}
 */
function concat(left, right) {
  return left.concat(right);
}

exports.default = (0, _curry2.default)(concat);
module.exports = exports['default'];