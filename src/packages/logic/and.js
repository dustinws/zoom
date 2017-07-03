import curry from '../lambda/curry';

/**
 * @description A curried wrapper around the logical && operator.
 * @memberof module:Zoom.Logic
 * @function and
 * @since v1.0.0
 * @example
 * import { and } from '@dustinws/zoom/packages/logic';
 *
 * and(false, true); // false
 * and(true, false); // false
 * and(true, true); // true
 *
 * @param  {Any} left The first value
 * @param  {Any} right The second value
 * @return {Any}
 */
const and = curry((left, right) => left && right);

export default and;
