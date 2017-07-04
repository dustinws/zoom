import keys from './keys';
import map from '../list/map';

/**
 * @description Get an object's values in an array.
 * @memberof Record
 * @since v1.16.0
 * @function values
 * @example
 * // values :: { String: a } -> [a]
 * import { Record } from '@dustinws/zoom/data';
 *
 * Record.values({ a: 1, b: 2 }) // [1, 2]
 *
 * @param  {Object} object The object to query
 * @return {Array<String>}
 */
function values(object) {
  return map(x => object[x], keys(object));
}

export default values;
