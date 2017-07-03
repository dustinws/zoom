import curry from '../../lambda/curry';
import negate from '../../lambda/negate';
import filter from './filter';

/**
 * @description Apply a predicate to each element in an array and
 * return a new array containing all of the values the predicate
 * returned a falsy response for.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function reject
 * @example
 * // reject :: (a -> Bool) -> [a] -> [a]
 * import { reject } from '@dustinws/zoom/data/list';
 *
 * const isOdd = n => n % 2;
 * const numbers = [1, 2, 3, 4, 5];
 *
 * reject(isOdd, numbers); // [2, 4]
 *
 * @param  {Function} predicate The function that determines which items to remove
 * @param  {Array<Any>} list The list to filter
 * @return {Array<Any>}
 */
function reject(predicate, list) {
  return filter(negate(predicate), list);
}

export default curry(reject);
