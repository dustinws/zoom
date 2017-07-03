import constant from './constant';

/**
 * @description A constant for the value "false"
 * @memberof module:Zoom.Core
 * @since v1.15.0
 * @function False
 * @example
 * import { False } from '@dustinws/zoom/packages/core';
 *
 * False(); // false
 * False(1, [], function(){}); // false
 *
 * @return {Boolean}
 */
const False = constant(false);

export default False;
