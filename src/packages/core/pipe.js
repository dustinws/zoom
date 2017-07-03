import fold from '../data/list/fold';

/**
 * @memberof module:Zoom.Core
 * @description Create a left to right function composition.
 * @since v1.0.0
 * @function pipe
 * @example
 * import { pipe } from '@dustinws/zoom/packages/core';
 *
 * const square = n => n * n;
 * const increment = n => n + 1;
 *
 * const main = pipe(increment, square);
 *
 * main(4); // 25
 * pipe(increment, square)(4) === square(increment(4))
 *
 * @param  {...Function} functions The functions to pipe
 * @return {Function}
 */
export default function pipe(...fns) {
  return (...args) => {
    const [head, ...tail] = fns;

    return fold((a, b) => b(a), head(...args), tail);
  };
}
