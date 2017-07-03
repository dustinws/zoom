import curry from '../../core/curry';

/**
 * @description Determine if there is a value at the given key on
 * the given object.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function has
 * @example
 * import { Record } from '@dustinws/zoom/packages/data';
 *
 * Record.has('a', { a: 1 }) // true
 * Record.has('b', { a: 1 }) // false
 *
 * @param  {String} key The key to lookup
 * @param  {Object} object The object to query
 * @return {Boolean}
 */
const has = curry((key, object) =>
  object[key] !== null && object[key] !== undefined);

export default has;
