import keys from './keys';

/**
 * @description Determine the number of enumberable keys that an object has.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function size
 * @example
 * // size :: { String: * } -> Int
 * import { size } from '@dustinws/zoom/data/record';
 *
 * size({ a: 1 }) // 1
 *
 * @param  {Object} object The object to query
 * @return {Number}
 */
function size(object) {
  return keys(object).length;
}

export default size;
