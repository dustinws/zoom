import curry from '../../lambda/curry';
import pipe from '../../lambda/pipe';
import keys from './keys';
import fold from '../list/fold';

/**
 * @description Create a new object where each value is the result of calling
 * the function with the original value at that key. Only the value is passed
 * to the "transform" function.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function map
 * @example
 * // map :: (a -> b) -> { String: a } -> { String: b }
 * import { map } from '@dustinws/zoom/data/record';
 *
 * map(n => n + 1, { a: 1 }) // { a: 2 }
 *
 * @param  {Function} transform The function to apply
 * @param  {Object} object The object transform
 * @return {Object}
 */
function map(transform, object) {
  return pipe(keys, fold((result, key) => {
    // eslint-disable-next-line no-param-reassign
    result[key] = transform(object[key]);

    return result;
  }, {}))(object);
}

export default curry(map);
