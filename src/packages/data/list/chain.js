import curry from '../../lambda/curry';
import concat from './concat';
import fold from './fold';
import map from './map';

/**
 * @description Map a function over an array and flatten
 * the results by one level.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function chain
 * @example
 * // chain :: (a -> [b]) -> [a] -> [b]
 * import { chain } from '@dustinws/zoom/packages/data/list';
 *
 * chain(x => [x, x], [1, 2, 3]); // [1, 1, 2, 2, 3, 3]
 *
 * @param  {Function} transform The function used to transform the values
 * @param  {Array} list The list to use
 * @return {Array}
 */
function chain(transform, list) {
  return fold(concat, [], map(transform, list));
}

export default curry(chain);
