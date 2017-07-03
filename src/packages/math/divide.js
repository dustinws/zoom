import curry from '../lambda/curry';

/**
 * @description Divide two numbers.
 * @memberof module:Zoom.Math
 * @function divide
 * @since v2.1.0
 * @example
 * import { divide } from '@dustinws/zoom/math';
 *
 * divide(10, 5); // 2
 *
 * @param  {Number} dividend The number to divide
 * @param  {Number} divisor The number to divide by
 * @return {Number}
 */
const divide = curry((dividend, divisor) => dividend / divisor);

export default divide;
