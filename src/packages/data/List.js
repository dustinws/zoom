import curry from '../core/curry';
import complement from '../core/complement';

/**
 * @class List
 * @memberof module:Zoom.Data
 * @type {Object}
 */
const List = {};

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
List.of = (...args) => args;

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
List.fold = curry((fn, seed, list) =>
  list.reduce(fn, seed));

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
List.map = curry((fn, list) =>
  list.map(x => fn(x)));

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
List.filter = curry((fn, list) =>
  list.filter(x => fn(x)));

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
List.reject = curry((fn, list) =>
  list.filter(complement(x => fn(x))));

export default List;
