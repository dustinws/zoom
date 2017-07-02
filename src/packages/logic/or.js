import curry from '../core/curry';

/**
 * @description A curried wrapper around the logical || operator.
 * @memberof module:Zoom.Logic
 * @function or
 * @since v1.0.0
 * @example
 * import { or } from '@dustinws/zoom/packages/logic';
 *
 * or(false, true); // true
 * or(true, false); // true
 * or(true, true); // true
 * or(false, false); // false
 *
 * @param  {Any} left The first value
 * @param  {Any} right The second value
 * @return {Any}
 */
const or = curry((left, right) => left || right);

export default or;
