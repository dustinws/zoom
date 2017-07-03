import curry from '../lambda/curry';

/**
 * @description Multiply two numbers.
 * @memberof module:Zoom.Math
 * @function subtract
 * @since v2.1.0
 * @example
 * import { subtract } from '@dustinws/zoom/math';
 *
 * subtract(15, 5); // 10
 *
 * @param  {Number} minuend The first number
 * @param  {Number} subtrahend The second number
 * @return {Number}
 */
const subtract = curry((minuend, subtrahend) => minuend - subtrahend);

export default subtract;
