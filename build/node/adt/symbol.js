'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @memberof module:Zoom.ADT
 * @description The tag used to get an object's type.
 * @since 1.0.0-beta
 * @type {Symbol}
 * @const symbol
 * @example
 * import { symbol } from 'zoomjs/adt';
 *
 * const obj = {
 *   [symbol]: 'MyType',
 * };
 */
var symbol = Symbol('ADT.tag');

exports.default = symbol;
module.exports = exports['default'];