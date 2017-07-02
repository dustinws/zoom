import _isType from './_isType';

/**
 * @memberof module:Zoom.Check
 * @description Ensure a value is a string. Returns a Validation.
 * @since v1.14.0
 * @function string
 * @example
 * import { string } from '@dustinws/zoom/packages/check';
 *
 * string('').isSuccess() // true
 * string(32).isSuccess() // false
 *
 * @param {Any} value The value to be checked
 * @return {Validation}
 */
const string = _isType('String');

export default string;
