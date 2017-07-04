import curry from '../../lambda/curry';

/**
 * @description Concatenate two arrays together.
 * @memberof List
 * @since v1.15.0
 * @function concat
 * @example
 * // concat :: [a] -> [a] -> [a]
 * import { concat } from '@dustinws/zoom/data/list';
 *
 * concat([1], [2]); // [1, 2]
 *
 * @param  {Array<T>} left The first array
 * @param  {Array<T>} right The second array
 * @return {Array<T>}
 */
function concat(left, right) {
  return left.concat(right);
}

export default curry(concat);
