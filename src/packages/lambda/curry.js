import curryN from './curryN';

/**
 * @memberof module:Zoom.Lambda
 * @description Convert a non-curried function to a curried function. This
 * includes compatibility with "core.__".
 * @since v2.0.0
 * @function curry
 * @example
 * import { curry } from '@dustinws/zoom/lambda';
 *
 * const add = curry((a, b) => a + b);
 *
 * add(1, 4); // 5
 * add(1)(4); // 5
 * add(1); // [Function]
 * add(1)(); // [Function]
 *
 * @param  {Function} func The function to curry.
 * @return {Function}
 */
export default function curry(func) {
  return curryN(func.length, func);
}
