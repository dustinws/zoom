import _isType from './_isType';

/**
 * @memberof module:Zoom.Check
 * @description Ensure a value is an array. Returns a Validation.
 * @since v1.14.0
 * @function array
 * @example
 * import { array } from '@dustinws/zoom/check';
 *
 * array([]).isSuccess() // true
 * array('').isSuccess() // false
 *
 * @param {Any} value The value to be checked
 * @return {Validation}
 */
const array = _isType('Array');

export default array;
