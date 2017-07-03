import curry from '../../core/curry';
import keys from './keys';

/**
 * @description Create a new object where each value is the result of calling
 * the function with the original value at that key. Only the value is passed
 * to the "transform" function.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function map
 * @example
 * import { Record } from '@dustinws/zoom/packages/data';
 *
 * Record.map(n => n + 1, { a: 1 }) // { a: 2 }
 *
 * @param  {Function} transform The function to apply
 * @param  {Object} object The object transform
 * @return {Object}
 */
const map = curry((transform, object) =>
  keys(object).reduce((result, key) => {
    result[key] = transform(object[key]); // eslint-disable-line no-param-reassign
    return result;
  }, {}));

export default map;
