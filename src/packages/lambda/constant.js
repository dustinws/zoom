/**
 * @memberof module:Zoom.Lambda
 * @description Create a function that always returns the initial value.
 * @since v1.0.0
 * @function constant
 * @example
 * // constant :: a -> b -> a
 * import { constant } from '@dustinws/zoom/packages/core';
 *
 * const Pi = constant(3.14);
 *
 * Pi() // 3.14
 * Pi('some weird mis-use.') // 3.14
 *
 * @param  {Any} value The value the constant will return.
 * @return {Function}
 */
export default function constant(value) {
  return () => value;
}
