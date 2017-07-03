import keys from './keys';
import List from '../List';

/**
 * @description Turn an object into an array of [key, value] tuples.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function entries
 * @example
 * import { Record } from '@dustinws/zoom/packages/data';
 *
 * Record.entries({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]
 *
 * @param  {Object} object The object to query
 * @return {Array<String>}
 */
const entries = object =>
  List.map(x => [x, object[x]], keys(object));

export default entries;
