'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('./each');

var _each2 = _interopRequireDefault(_each);

var _curry = require('../../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Turn a list into a single value.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function fold
 * @example
 * // fold :: (a -> b -> a) -> a -> [b] -> a
 * import { fold } from '@dustinws/zoom/data/list';
 *
 * // Create a function that combines two elements at a time
 * const add = (a, b) => a + b;
 *
 * // Partially apply fold with our "add" function and an initial value of 0
 * const sum = fold(add, 0);
 *
 * sum([1, 2, 3, 4, 5]) // 15
 *
 * @param  {Function} concat The function used to combine the accumulator and the current item
 * @param  {Any} seed The initial seed value.
 * @param  {Array<Any>} list The list to be used.
 * @return {Any}
 */
function fold(concat, seed, list) {
  var result = seed;
  (0, _each2.default)(function (item) {
    result = concat(result, item);
  }, list);
  return result;
}

exports.default = (0, _curry2.default)(fold);
module.exports = exports['default'];