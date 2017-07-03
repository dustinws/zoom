import curry from '../../lambda/curry';
import find from './find';
import matches from '../record/matches';

/**
 * @description Find the first element in a list that matches a query object.
 * @memberof module:Zoom.Data.List
 * @since v1.17.0
 * @function findWhere
 * @example
 * // findWhere :: { String: * } -> [a] -> Maybe a
 * import { findWhere } from '@dustinws/zoom/packages/data/list';
 *
 * findWhere({ a: 2 }, [{ a: 1 }, { a: 2 }]) // Just({ a: 2 })
 * findWhere({ a: 3 }, [{ a: 1 }, { a: 2 }]) // Nothing
 *
 * @param  {Function} query The query object
 * @param  {Array<T>} list The list to use
 * @return {Maybe<T>}
 */
function findWhere(query, list) {
  return find(matches(query), list);
}

export default curry(findWhere);
