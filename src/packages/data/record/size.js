import keys from './keys';

/**
 * @description Determine the number of enumberable keys that an object has.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function size
 * @example
 * import { Record } from '@dustinws/zoom/packages/data';
 *
 * Record.size({ a: 1 }) // 1
 *
 * @param  {Object} object The object to query
 * @return {Number}
 */
const size = object => keys(object).length;

export default size;
