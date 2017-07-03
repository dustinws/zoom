import curry from '../../lambda/curry';
import fold from '../list/fold';
import merge from './merge';

/**
 * @description Create a new object containing only the specified keys.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function pick
 * @example
 * // pick :: [String] -> { String: a } -> { String: a }
 * import { pick } from '@dustinws/zoom/packages/data/record';
 *
 * pick(['a'], { a: 1, b:2 }) // { a: 1 }
 *
 * @param  {Array<String>} keys The keys to keep
 * @param  {Object} source The source object
 * @return {Object}
 */
function pick(keys, source) {
  return fold((res, key) =>
    merge(res, { [key]: source[key] }), {}, keys);
}

export default curry(pick);
