import curry from '../../lambda/curry';
import reject from './reject';
import matches from '../record/matches';

/**
 * @description Remove all objects in a list that have the same comparable
 * values as the query object.
 * @memberof module:Zoom.Data.List
 * @since v1.17.0
 * @function rejectWhere
 * @example
 * // rejectWhere :: { String: * } -> [{ String: * }] -> [{ String: * }]
 * import { rejectWhere } from '@dustinws/zoom/packages/data/list';
 *
 * const users = [{ name: 'Lucy', admin: false }, { name: 'Jo', admin: true }];
 *
 * rejectWhere({ admin: false }, users); // [{ name: 'Jo', admin: true }]
 *
 * @param  {Object} query The query object
 * @param  {Array} list The list to use
 * @return {Array}
 */
function rejectWhere(query, list) {
  return reject(matches(query), list);
}

export default curry(rejectWhere);
