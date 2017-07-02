import _isType from './_isType';

/**
 * @memberof module:check
 * @description Ensure a value is an Function. Returns a Validation.
 * @since v1.14.0
 * @function func
 * @example
 * import { func } from '@dustinws/zoom/packages/check';
 *
 * func(function(){}).isSuccess() // true
 * func('').isSuccess() // false
 *
 * @param {Any} value The value to be checked
 * @return {Validation}
 */
const func = _isType('Function');

export default func;
