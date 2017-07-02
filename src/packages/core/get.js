import curry from './curry';
import Maybe from '../data/Maybe';

/**
 * @description Get the value at the given index on the provided object.
 * @memberof module:Zoom.Core
 * @since v1.15.0
 * @function get
 * @example
 * import { get } from '@dustinws/zoom/packages/core';
 *
 * get('name', { name: 'Jake' }) // Just('Jake')
 * get('name', {}) // Nothing
 *
 * @param  {String} key The key to lookup
 * @param  {Any} object The object to use
 * @return {Maybe}
 */
const get = curry((key, object) =>
  Maybe.fromNullable(object[key]));

export default get;
