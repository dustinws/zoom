import curry from '../../lambda/curry';
import fold from '../list/fold';
import includes from '../list/includes';
import keys from './keys';

/**
 * @description Create a new object without the specified keys.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function omit
 * @example
 * // omit :: [String] -> { String: a } -> { String: a }
 * import { omit } from '@dustinws/zoom/packages/data/record';
 *
 * omit(['a'], { a: 1, b:2 }) // { b: 2 }
 *
 * const sanitzeUser = omit(['password']);
 *
 * sanitzeUser({ name: 'Jo', password: 'fjls' }) // { name: 'Jo' }
 *
 * @param  {Array<String>} props The keys to remove
 * @param  {Object} source The source object
 * @return {Object}
 */
function omit(props, source) {
  return fold((res, key) => {
    if (!includes(key, props)) {
      res[key] = source[key];
    }
    return res;
  }, {}, keys(source));
}

export default curry(omit);
