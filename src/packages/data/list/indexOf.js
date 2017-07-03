import curry from '../../lambda/curry';
import Maybe from '../Maybe';

/**
 * @description Determine which index a value resides at inside of an
 * array. Returns a Maybe for the index, where Nothing indicates the
 * value is not present in the array.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function indexOf
 * @example
 * // indexOf :: * -> [*] -> Maybe Int
 * import { indexOf } from '@dustinws/zoom/packages/data/list';
 *
 * indexOf(1, [1]); // Just(0)
 * indexOf(2, [1]); // Nothing
 *
 * @param  {Any} value The value to detect
 * @param  {Array<Any>} list The list to query
 * @return {Maybe<Number>}
 */
function indexOf(value, list) {
  const idx = list.indexOf(value);
  return idx === -1 ? Maybe.Nothing : Maybe.Just(idx);
}

export default curry(indexOf);
