import _isType from './_isType';

/**
 * @memberof module:check
 * @description Ensure a value is undefined. Returns a Validation.
 * @since v1.14.0
 * @function undef
 * @example
 * import { undef } from '@dustinws/zoom/packages/check';
 *
 * undef(32).isSuccess() // true
 * undef('').isSuccess() // false
 *
 * @param {Any} value The value to be checked
 * @return {Validation}
 */
const undef = _isType('Undefined');

export default undef;
