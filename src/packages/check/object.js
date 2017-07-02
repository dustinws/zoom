import _isType from './_isType';

/**
 * @memberof module:check
 * @description Ensure a value is an object. Returns a Validation.
 * @since v1.14.0
 * @function object
 * @example
 * import { object } from '@dustinws/zoom/packages/check';
 *
 * object({}).isSuccess() // true
 * object('').isSuccess() // false
 *
 * @param {Any} value The value to be checked
 * @return {Validation}
 */
const object = _isType('Object');

export default object;
