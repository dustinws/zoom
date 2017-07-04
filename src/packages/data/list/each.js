import curry from '../../lambda/curry';

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
  for (let i = 0; i < array.length; i += 1) {
    func(array[i]);
  }
  return array;
}

export default curry(each);
