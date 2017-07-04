/**
 * @description Determine if an array is empty.
 * @memberof List
 * @since v1.15.0
 * @function isEmpty
 * @example
 * // isEmpty :: [*] -> Bool
 * import { isEmpty } from '@dustinws/zoom/data/list';
 *
 * isEmpty([]); // true
 * isEmpty([1]); // false
 *
 * @param  {Array<Any>} array The array to use
 * @return {Boolean}
 */
function isEmpty(array) {
  return array.length === 0;
}

export default isEmpty;
