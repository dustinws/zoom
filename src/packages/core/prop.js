import curry from '../lambda/curry';
import Maybe from '../data/Maybe';

/**
 * @description Get the value at the given key on the given object. Returns
 * a Maybe.
 * @memberof module:Zoom.Core
 * @since v1.16.0
 * @function prop
 * @example
 * // prop :: String -> { String: a } -> Maybe a
 * import { prop } from '@dustinws/zoom/core';
 *
 * prop('a', { a: 1 }) // Just(1)
 * prop('a', {}) // Nothing
 *
 * @param  {String} key The key to lookup
 * @param  {Object} object The object to query
 * @return {Maybe<Any>}
 */
function prop(key, object) {
  return Maybe.fromNullable(object[key]);
}

export default curry(prop);
