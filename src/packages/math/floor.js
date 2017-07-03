/**
 * @description A delegate to `Math.floor`.
 * @memberof module:Zoom.Math
 * @function floor
 * @since v2.1.0
 * @example
 * import { floor } from '@dustinws/zoom/math';
 *
 * floor(4.000213); // 5
 *
 * @param  {Number} num The number to round up.
 * @return {Number}
 */
const floor = num => Math.floor(num);

export default floor;
