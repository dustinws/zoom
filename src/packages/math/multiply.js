import curry from '../lambda/curry';

/**
 * @description Multiply two numbers.
 * @memberof module:Zoom.Math
 * @function multiply
 * @since v2.1.0
 * @example
 * import { multiply } from '@dustinws/zoom/math';
 *
 * multiply(5, 10); // 50
 *
 * @param  {Number} left The first number
 * @param  {Number} right The second number
 * @return {Number}
 */
const multiply = curry((a, b) => a * b);

export default multiply;
