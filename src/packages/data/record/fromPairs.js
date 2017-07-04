import fold from '../list/fold';

/**
 * @description Turn an array of [key, value] tuples into an object
 * @memberof Record
 * @since v1.16.0
 * @function fromPairs
 * @example
 * // fromPairs :: [[String, a]] -> { String: a }
 * import { fromPairs } from '@dustinws/zoom/data/record';
 *
 * fromPairs([['a', 1], ['b', 2]]) // { a: 1, b: 2 }
 *
 * @param  {Array<Array<mixed>>} tuples The list of [key, value] tuples
 * @return {Object}
 */
function fromPairs(tuples) {
  return fold((result, [key, value]) => {
    result[key] = value; // eslint-disable-line no-param-reassign
    return result;
  }, {}, tuples);
}

export default fromPairs;
