import curry from '../../lambda/curry';
import indexOf from './indexOf';

/**
 * @description Determine if an item is present in an array.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function includes
 * @example
 * // includes :: * -> [*] -> Bool
 * import { includes } from '@dustinws/zoom/packages/data/list';
 *
 * includes(1, [1]); // true
 * includes(2, [1]); // false
 *
 * @param  {Any} value The value to detect
 * @param  {Array<Any>} list The array to query
 * @return {Boolean}
 */
function includes(value, list) {
  return indexOf(value, list).isJust();
}

export default curry(includes);
