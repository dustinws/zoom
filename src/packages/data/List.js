import curry from '../core/curry';
import complement from '../core/complement';

const List = {};

/**
 * Turn multiple values into an array.
 *
 * @param  {Any[]} ...args
 * @return {Any[]}
 */
List.of = (...args) => args;

/**
 * Turn a list into a single value.
 *
 * @param  {Function} fn
 * @param  {Any} seed
 * @param  {Any[]} list
 * @return {Any}
 */
List.fold = curry((fn, seed, list) =>
  list.reduce(fn, seed));

/**
 * Apply a function to each element in an array and return a new
 * array with the results.
 *
 * @param  {Function} fn
 * @param  {Any[]} list
 * @return {Any[]}
 */
List.map = curry((fn, list) =>
  list.map(x => fn(x)));

/**
 * Return a new array that only contains values that the predicate
 * returned a truthy response for.
 *
 * @param  {Function} fn
 * @param  {Any[]} list
 * @return {Any[]}
 */
List.filter = curry((fn, list) =>
  list.filter(x => fn(x)));

/**
 * Return a new array that only contains values that the predicate
 * returned a falsy response for.
 *
 * @param  {Function} fn
 * @param  {Any[]} list
 * @return {Any[]}
 */
List.reject = curry((fn, list) =>
  list.filter(complement(x => fn(x))));

export default List;
