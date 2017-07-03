import _isType from './_isType';

/**
 * @memberof module:Zoom.Check
 * @description Ensure a value is an Boolean. Returns a Validation.
 * @since v1.14.0
 * @function bool
 * @example
 * import { bool } from '@dustinws/zoom/check';
 *
 * bool(true).isSuccess() // true
 * bool('').isSuccess() // false
 *
 * @param {Any} value The value to be checked
 * @return {Validation}
 */
const bool = _isType('Boolean');

export default bool;
