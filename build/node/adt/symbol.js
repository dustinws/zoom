'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @memberof module:Zoom.ADT
 * @description The tag used to get an object's type.
 * @since v1.0.0
 * @type {Symbol}
 * @const symbol
 * @example
 * import { symbol } from '@dustinws/zoom/adt';
 *
 * const obj = {
 *   [symbol]: 'MyType',
 * };
 */
var symbol = Symbol('ADT.tag');

exports.default = symbol;
module.exports = exports['default'];