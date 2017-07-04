import curry from '../../lambda/curry';
import fold from './fold';

/**
 * @description Apply a function to each element in a list and return
 * the results in a new array.
 * @memberof List
 * @since v1.15.0
 * @function map
 * @example
 * // map :: (a -> b) -> [a] -> [b]
 * import { map } from '@dustinws/zoom/data/list';
 *
 * const inc = n => n + 1;
 * const numbers = [1, 2, 3, 4, 5];
 *
 * map(inc, numbers); // [2, 3, 4, 5, 6]
 *
 * @param  {Function} fn
 * @param  {Array<Any>} list
 * @return {Array<Any>}
 */
function map(transform, list) {
  return fold((results, item) => {
    results.push(transform(item));
    return results;
  }, [], list);
}

export default curry(map);
