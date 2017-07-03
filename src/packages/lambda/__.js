/**
 * @memberof module:Zoom.Lambda
 * @description The functional placeholder used to add arguments
 * in a different order than the function originally declared.
 * @since v2.0.0
 * @type {Symbol}
 * @constant
 * @example
 * // __ :: Symbol
 * import { __, curry } from '@dustinws/zoom/core';
 *
 * const add = curry((a, b) => a + b);
 *
 * add('Hello, ')('world!') // 'Hello, world!'
 * add(__, 'world!')('Hello, ') // 'Hello, world!'
 */
export default Symbol('@@functional/placeholder');
