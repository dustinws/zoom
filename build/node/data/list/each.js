'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Run a function for each item in an array. Returns the array.
 * Does not provide an index.
 * @memberof List
 * @since v1.15.0
 * @function each
 * @example
 * // each :: (a -> *) -> [a] -> [a]
 * import { each } from '@dustinws/zoom/data/list';
 *
 * each(console.log, [1, 2, 3]);
 * // 1
 * // 2
 * // 3
 *
 * @param  {Function} func The function to run
 * @param  {Array<Any>} array The array to use
 * @return {Array<Any>}
 */
function each(func, array) {
  for (var i = 0; i < array.length; i += 1) {
    func(array[i]);
  }
  return array;
}

exports.default = (0, _curry2.default)(each);
module.exports = exports['default'];