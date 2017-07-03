import curry from '../../core/curry';
import filter from './filter';
import matches from '../record/matches';

/**
 * @description Find all objects in a list that have the same comparable
 * values as the query object.
 * @memberof module:Zoom.Data.List
 * @since v1.17.0
 * @function filterWhere
 * @example
 * // filterWhere :: { String: * } -> [{ String: * }] -> [{ String: * }]
 * import { filterWhere } from '@dustinws/zoom/packages/data/list';
 *
 * const isAdmin = {
 *   admin: true,
 * };
 *
 * const users = [{ name: 'Lucy', admin: false }, { name: 'Jo', admin: true }];
 *
 * filterWhere(isAdmin, users); // [{ name: 'Jo', admin: true }]
 *
 * @param  {Object} query The query object
 * @param  {Array} list The list to use
 * @return {Array}
 */
function filterWhere(query, list) {
  return filter(matches(query), list);
}

export default curry(filterWhere);
