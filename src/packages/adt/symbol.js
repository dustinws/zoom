/**
 * @memberof module:Zoom.ADT
 * @description The tag used to get an object's type.
 * @since v1.0.0
 * @type {Symbol}
 * @const symbol
 * @example
 * import { symbol } from 'zoomjs/adt';
 *
 * const obj = {
 *   [symbol]: 'MyType',
 * };
 */
const symbol = Symbol('ADT.tag');

export default symbol;
