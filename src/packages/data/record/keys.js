/**
 * @description Get an object's enumberable keys as an array of strings
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function keys
 * @example
 * import { Record } from '@dustinws/zoom/packages/data';
 *
 * Record.keys({ a: 1, b: 2 }) // ['a', 'b']
 *
 * @param  {Object} object The object to query
 * @return {Array<String>}
 */
const keys = object => Object.keys(object);

export default keys;
