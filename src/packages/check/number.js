import _isType from './_isType';

/**
 * @memberof module:Zoom.Check
 * @description Ensure a value is a number. Returns a Validation.
 * @since v1.14.0
 * @function number
 * @example
 * import { number } from '@dustinws/zoom/packages/check';
 *
 * number(32).isSuccess() // true
 * number('').isSuccess() // false
 *
 * @param {Any} value The value to be checked
 * @return {Validation}
 */
const number = _isType('Number');

export default number;
