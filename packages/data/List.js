'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../core/curry');

var _curry2 = _interopRequireDefault(_curry);

var _Maybe = require('../data/Maybe');

var _Maybe2 = _interopRequireDefault(_Maybe);

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
 * @param  {...Any} items The items to put in the array
 * @return {Array<Any>}
 */
List.of = function () {
  for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  return items;
};

/**
 * @description Determine if an array is empty.
 * @memberof module:Zoom.Data.List
 * @since v1.0.0
 * @function isEmpty
 * @example
 * import { List } from '@dustinws/zoom/packages/data';
 *
 * List.isEmpty([]); // true
 * List.isEmpty([1]); // false
 *
 * @param  {Array<Any>} array The array to use
 * @return {Boolean}
 */
List.isEmpty = function (array) {
  return array.length === 0;
};

/**
 * @description Return the identity element of the List monoid.
 * @memberof module:Zoom.Data.List
 * @since v1.0.0
 * @function empty
 * @example
 * import { List } from '@dustinws/zoom/packages/data';
 *
 * List.empty(); // []
 *
 * // Example usage
 * const concatAll = List.fold(List.concat, List.empty());
 * concatAll([[1], [2], [3], [4]]); // [1, 2, 3, 4]
 *
 * @return {Array}
 */
List.empty = function () {
  return [];
};

/**
 * @description Concatenate two arrays together.
 * @memberof module:Zoom.Data.List
 * @since v1.0.0
 * @function concat
 * @example
 * import { List } from '@dustinws/zoom/packages/data';
 *
 * List.concat([1], [2]); // [1, 2]
 *
 * @return {Array}
 */
List.concat = (0, _curry2.default)(function (left, right) {
  return left.concat(right);
});

/**
 * @description Map a function over an array and flatten
 * the results by one level.
 * @memberof module:Zoom.Data.List
 * @since v1.0.0
 * @function chain
 * @example
 * import { List } from '@dustinws/zoom/packages/data';
 *
 * List.chain(x => [x, x], [1, 2, 3]); // [1, 1, 2, 2, 3, 3]
 *
 * @return {Array}
 */
List.chain = (0, _curry2.default)(function (func, array) {
  return List.fold(List.concat, [], List.map(func, array));
});

/**
 * @description Get the first element of a potentially empty array.
 * @memberof module:Zoom.Data.List
 * @since v1.0.0
 * @function head
 * @example
 * import { List } from '@dustinws/zoom/packages/data';
 *
 * List.head([1]); // Just(1)
 * List.head([]); // Nothing
 *
 * @param  {Array<T>} array The array to use
 * @return {Maybe<T>}
 */
List.head = function (array) {
  return _Maybe2.default.fromNullable(array[0]);
};

/**
 * @description Get the last element of a potentially empty array.
 * @memberof module:Zoom.Data.List
 * @since v1.0.0
 * @function last
 * @example
 * import { List } from '@dustinws/zoom/packages/data';
 *
 * List.last([1, 2]); // Just(2)
 * List.last([1]); // Just(1)
 * List.last([]); // Nothing
 *
 * @param  {Array<T>} array The array to use
 * @return {Maybe<T>}
 */
List.last = function (array) {
  return _Maybe2.default.fromNullable(array[array.length - 1]);
};

/**
 * @description Get all elements except the last one.
 * @memberof module:Zoom.Data.List
 * @since v1.0.0
 * @function init
 * @example
 * import { List } from '@dustinws/zoom/packages/data';
 *
 * List.init([1, 2, 3, 4]); // [2, 3, 4]
 * List.init([1]); // []
 * List.init([]); // []
 *
 * @param  {Array<T>} array The array to use
 * @return {Array<T>}
 */
List.init = function (array) {
  return array.slice(0, -1);
};

/**
 * @description Return a new array that does not include the first element.
 * @memberof module:Zoom.Data.List
 * @since v1.0.0
 * @function tail
 * @example
 * import { List } from '@dustinws/zoom/packages/data';
 *
 * List.tail([1, 2, 3, 4]); // [2, 3, 4]
 * List.tail([1]); // []
 * List.tail([]); // []
 *
 * @param  {Array<T>} array The array to use
 * @return {Array<T>}
 */
List.tail = function (array) {
  return array.slice(1);
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
 * @description Return the index of an item in an array. If the item
 * is not present, -1 will be returned.
 * @memberof module:Zoom.Data.List
 * @since v1.0.0
 * @function indexOf
 * @example
 * import { List } from '@dustinws/zoom/packages/data';
 *
 * List.indexOf(1, [1]); // 0
 * List.indexOf(2, [1]); // -1
 *
 * @param  {Any} value The value to detect
 * @param  {Array<Any>} list The list to query
 * @return {Maybe<Number>}
 */
List.indexOf = (0, _curry2.default)(function (value, list) {
  var idx = list.indexOf(value);

  return idx === -1 ? _Maybe2.default.Nothing : _Maybe2.default.Just(idx);
});

/**
 * @description Determine if an item is present in an array.
 * @memberof module:Zoom.Data.List
 * @since v1.0.0
 * @function includes
 * @example
 * import { List } from '@dustinws/zoom/packages/data';
 *
 * List.includes(1, [1]); // true
 * List.includes(2, [1]); // false
 *
 * @param  {Any} value The value to detect
 * @param  {Array<Any>} array The array to query
 * @return {Boolean}
 */
List.includes = (0, _curry2.default)(function (value, array) {
  return List.indexOf(value, array).isJust();
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