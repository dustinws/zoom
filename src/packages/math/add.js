import curry from '../core/curry';

/**
 * @description A curried wrapper around the + operator.
 * @memberof module:Zoom.Math
 * @function add
 * @since v1.0.0
 * @example
 * import { add } from '@dustinws/zoom/packages/math';
 *
 * add(3, 2); // 5
 *
 * @param  {Number} left The first value
 * @param  {Number} right The second value
 * @return {Number}
 */
const add = curry((left, right) => Number(left) + Number(right));

export default add;
