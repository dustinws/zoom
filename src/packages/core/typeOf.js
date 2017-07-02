/**
 * @memberof module:Zoom.Core
 * @description Get the [[class]] of any native object.
 * @since v1.0.0
 * @function typeOf
 * @example
 * import { typeOf } from '@dustinws/zoom/packages/core';
 *
 * typeOf('') // String
 * typeOf([]) // Array
 * typeOf({}) // Object
 * typeOf(new Date) // Date
 * typeOf(/\.js$/) // RegExp
 *
 * @param  {Any} value The value who's type you want to know
 * @return {String}
 */
export default function typeOf(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
