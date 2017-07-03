import constant from './constant';

/**
 * @description A constant for the value "true"
 * @memberof module:Zoom.Core
 * @since v1.15.0
 * @function True
 * @example
 * True :: * -> Bool
 * import { True } from '@dustinws/zoom/packages/core';
 *
 * True(); // true
 * True(1, [], function(){}); // true
 *
 * @return {Boolean}
 */
const True = constant(true);

export default True;
