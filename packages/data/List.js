'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../core/curry');

var _curry2 = _interopRequireDefault(_curry);

var _complement = require('../core/complement');

var _complement2 = _interopRequireDefault(_complement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class List
 * @memberof module:Zoom.Data
 * @type {Object}
 */
var List = {};

/**
 * @description Turn multiple values into an array.
 * @memberof module:Zoom.Data.List
 * @since v1.0.0
 * @function of
 * @example
 * import { List } from '@dustinws/zoom/packages/data';
 *
 * List.of(1, 2, 3); // [1, 2, 3]
 *
 * @param  {...Any} args
 * @return {Array<Any>}
 */
List.of = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args;
};

/**
 * @description Run a function for each item in an array. Returns the array.
 * Does not provide an index.
 * @memberof module:Zoom.Data.List
 * @since v1.0.0
 * @function each
 * @example
 * import { List } from '@dustinws/zoom/packages/data';
 *
 * List.each(console.log, [1, 2, 3]);
 * // 1
 * // 2
 * // 3
 *
 * @param  {Function} func The function to run
 * @param  {Array<Any>} array The array to use
 * @return {Array<Any>}
 */
List.each = (0, _curry2.default)(function (func, array) {
  for (var i = 0; i < array.length; i += 1) {
    func(array[i]);
  }
  return array;
});

/**
 * @description Turn a list into a single value.
 * @memberof module:Zoom.Data.List
 * @since v1.0.0
 * @function fold
 * @example
 * import { List } from '@dustinws/zoom/packages/data';
 *
 * const add = (a, b) => a + b;
 * const numbers = [1, 2, 3, 4, 5];
 *
 * List.fold(add, 0, numbers); // 15
 *
 * @param  {Function} fn
 * @param  {Any} seed
 * @param  {Array<Any>} list
 * @return {Any}
 */
List.fold = (0, _curry2.default)(function (fn, seed, list) {
  var result = seed;
  List.each(function (item) {
    result = fn(result, item);
  }, list);
  return result;
});

/**
 * @description Apply a function to each element in a list and return
 * the results in a new array.
 * @memberof module:Zoom.Data.List
 * @since v1.0.0
 * @function map
 * @example
 * import { List } from '@dustinws/zoom/packages/data';
 *
 * const inc = n => n + 1;
 * const numbers = [1, 2, 3, 4, 5];
 *
 * List.map(inc, numbers); // [2, 3, 4, 5, 6]
 *
 * @param  {Function} fn
 * @param  {Array<Any>} list
 * @return {Array<Any>}
 */
List.map = (0, _curry2.default)(function (fn, list) {
  return List.fold(function (results, item) {
    results.push(fn(item));

    return results;
  }, [], list);
});

/**
 * @description Apply a predicate to each element in an array and
 * return a new array containing all of the values the predicate
 * returned a truthy response for.
 * @memberof module:Zoom.Data.List
 * @since v1.0.0
 * @function filter
 * @example
 * import { List } from '@dustinws/zoom/packages/data';
 *
 * const isOdd = n => n % 2;
 * const numbers = [1, 2, 3, 4, 5];
 *
 * List.filter(isOdd, numbers); // [1, 3, 5]
 *
 * @param  {Function} fn
 * @param  {Array<Any>} list
 * @return {Array<Any>}
 */
List.filter = (0, _curry2.default)(function (fn, list) {
  return List.fold(function (results, item) {
    if (fn(item)) {
      results.push(item);
    }

    return results;
  }, [], list);
});

/**
 * @description Apply a predicate to each element in an array and
 * return a new array containing all of the values the predicate
 * returned a falsy response for.
 * @memberof module:Zoom.Data.List
 * @since v1.0.0
 * @function reject
 * @example
 * import { List } from '@dustinws/zoom/packages/data';
 *
 * const isOdd = n => n % 2;
 * const numbers = [1, 2, 3, 4, 5];
 *
 * List.reject(isOdd, numbers); // [2, 4]
 *
 * @param  {Function} fn
 * @param  {Array<Any>} list
 * @return {Array<Any>}
 */
List.reject = (0, _curry2.default)(function (fn, list) {
  return list.filter((0, _complement2.default)(function (x) {
    return fn(x);
  }));
});

exports.default = List;
module.exports = exports['default'];