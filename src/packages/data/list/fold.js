import each from './each';
import curry from '../../lambda/curry';

/**
 * @description Turn a list into a single value.
 * @memberof List
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
  let result = seed;
  each((item) => {
    result = concat(result, item);
  }, list);
  return result;
}

export default curry(fold);
