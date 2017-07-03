import curry from '../../core/curry';

/**
 * @description Determine if there is a value at the given key on
 * the given object.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function has
 * @example
 * // has :: String -> { String: * } -> Bool
 * import { has } from '@dustinws/zoom/packages/data/record';
 *
 * has('a', { a: 1 }) // true
 * has('b', { a: 1 }) // false
 *
 * @param  {String} key The key to lookup
 * @param  {Object} object The object to query
 * @return {Boolean}
 */
function has(key, object) {
  return object[key] !== null && object[key] !== undefined;
}

export default curry(has);
