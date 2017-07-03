/**
 * @description Turn multiple values into an array.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function of
 * @example
 * // of :: (...a) -> [a]
 * import { of } from '@dustinws/zoom/data/list';
 *
 * of(1, 2, 3); // [1, 2, 3]
 *
 * @param  {...Any} items The items to put in the array
 * @return {Array<Any>}
 */
function of(...items) {
  return items;
}

export default of;
