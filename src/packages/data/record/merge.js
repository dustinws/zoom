import curry from '../../lambda/curry';

/**
 * @description Copy all 'own' keys from one object to another. The second
 * object will overwrite properties on the first.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function merge
 * @example
 * // merge :: { String: * } -> { String: * } -> Bool
 * import { __, merge } from '@dustinws/zoom/data/record';
 *
 * merge({ a: 1 }, { b:2 }) // { a: 1, b: 2 }
 *
 * const makeAdmin = merge(__, { admin: true });
 *
 * makeAdmin({ name: 'Jo', admin: false }); // { name: 'Jo', admin: true }
 *
 * @param  {Object} destination The destination object
 * @param  {Object} source The source object
 * @return {Object}
 */
function merge(destination, source) {
  return Object.assign({}, destination, source);
}

export default curry(merge);
