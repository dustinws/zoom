import List from '../List';

/**
 * @description Turn an array of [key, value] tuples into an object
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function fromPairs
 * @example
 * import { Record } from '@dustinws/zoom/packages/data';
 *
 * Record.fromPairs([['a', 1], ['b', 2]]) // { a: 1, b: 2 }
 *
 * @param  {Array<Array<mixed>>} tuples The list of [key, value] tuples
 * @return {Object}
 */
const fromPairs = tuples =>
  List.fold((result, [key, value]) => {
    result[key] = value; // eslint-disable-line no-param-reassign
    return result;
  }, {}, tuples);

export default fromPairs;
