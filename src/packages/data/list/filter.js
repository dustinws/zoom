import curry from '../../lambda/curry';
import fold from './fold';

/**
 * @description Apply a predicate to each element in an array and
 * return a new array containing all of the values the predicate
 * returned a truthy response for.
 * @memberof List
 * @since v1.15.0
 * @function filter
 * @example
 * // filter :: (a -> Bool) -> [a] -> [a]
 * import { filter } from '@dustinws/zoom/data/list';
 *
 * const isOdd = n => n % 2;
 * const numbers = [1, 2, 3, 4, 5];
 *
 * filter(isOdd, numbers); // [1, 3, 5]
 *
 * @param  {Function} predicate A function that returns true or false
 * @param  {Array<Any>} list The list to filter
 * @return {Array<Any>}
 */
function filter(predicate, list) {
  return fold((results, item) => {
    if (predicate(item)) {
      results.push(item);
    }
    return results;
  }, [], list);
}

export default curry(filter);
