import keys from './keys';
import map from '../list/map';

/**
 * @description Turn an object into an array of [key, value] tuples.
 * @memberof Record
 * @since v1.16.0
 * @function entries
 * @example
 * // entries :: { String: a } -> [[String, a]]
 * import { entries } from '@dustinws/zoom/data/record';
 *
 * entries({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]
 *
 * @param  {Object} object The object to query
 * @return {Array<String>}
 */
function entries(object) {
  return map(x => [x, object[x]], keys(object));
}

export default entries;
