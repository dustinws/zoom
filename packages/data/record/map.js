'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../../core/curry');

var _curry2 = _interopRequireDefault(_curry);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Create a new object where each value is the result of calling
 * the function with the original value at that key. Only the value is passed
 * to the "transform" function.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function map
 * @example
 * import { Record } from '@dustinws/zoom/packages/data';
 *
 * Record.map(n => n + 1, { a: 1 }) // { a: 2 }
 *
 * @param  {Function} transform The function to apply
 * @param  {Object} object The object transform
 * @return {Object}
 */
var map = (0, _curry2.default)(function (transform, object) {
  return (0, _keys2.default)(object).reduce(function (result, key) {
    result[key] = transform(object[key]); // eslint-disable-line no-param-reassign
    return result;
  }, {});
});

exports.default = map;
module.exports = exports['default'];