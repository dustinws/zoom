import constant from '../lambda/constant';

/**
 * @description A constant for the value "false"
 * @memberof module:Zoom.Lang
 * @since v2.0.0
 * @function False
 * @example
 * // False :: * -> Bool
 * import { False } from '@dustinws/zoom/packages/core';
 *
 * False(); // false
 * False(1, [], function(){}); // false
 *
 * @return {Boolean}
 */
const False = constant(false);

export default False;
