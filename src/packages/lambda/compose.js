import pipe from './pipe';

/**
 * @memberof module:Zoom.Lambda
 * @description Create a right to left function composition.
 * @since v2.0.0
 * @function compose
 * @example
 * import { compose } from '@dustinws/zoom/packages/core';
 *
 * const square = n => n * n;
 * const increment = n => n + 1;
 *
 * const main = compose(square, increment);
 *
 * main(4); // 25
 * compose(square, increment)(4) === square(increment(4))
 *
 * @param  {...Function} functions The functions to compose
 * @return {Function}
 */
export default function compose(...functions) {
  return pipe(...functions.reverse());
}
