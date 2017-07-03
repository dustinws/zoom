import _isType from './_isType';

/**
 * @memberof module:Zoom.Check
 * @description Ensure a value is a null. Returns a Validation.
 * @since v1.14.0
 * @function nil
 * @example
 * import { nil } from '@dustinws/zoom/check';
 *
 * nil(null).isSuccess() // true
 * nil('').isSuccess() // false
 *
 * @param {Any} value The value to be checked
 * @return {Validation}
 */
const nil = _isType('Null');

export default nil;
