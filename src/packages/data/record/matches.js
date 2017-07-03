import curry from '../../core/curry';
import entries from './entries';

/**
 * @description Determine if an object has the same comparable values at
 * each key as a provided query object.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function matches
 * @example
 * // matches :: { String: * } -> { String: * } -> Bool
 * import { matches } from '@dustinws/zoom/packages/data/record';
 *
 * matches({ name: 'barry' }, { name: 'barry', age: 31 }) // true
 * matches({ name: 'barry' }, { name: 'jake', age: 26 }) // false
 *
 * @param  {Object} query The query object
 * @param  {Object} object The object to query
 * @return {Boolean}
 */
function matches(query, object) {
  const queries = entries(query);
  let key;
  let val;

  for (let i = 0; i < queries.length; i += 1) {
    [key, val] = queries[i];
    if (object[key] !== val) return false;
  }
  return true;
}

export default curry(matches);
