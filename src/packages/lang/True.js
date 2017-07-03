import constant from '../lambda/constant';

/**
 * @description A constant for the value "true"
 * @memberof module:Zoom.Lang
 * @since v2.0.0
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
