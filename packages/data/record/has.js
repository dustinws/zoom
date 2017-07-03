'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../../core/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Determine if there is a value at the given key on
 * the given object.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function has
 * @example
 * import { Record } from '@dustinws/zoom/packages/data';
 *
 * Record.has('a', { a: 1 }) // true
 * Record.has('b', { a: 1 }) // false
 *
 * @param  {String} key The key to lookup
 * @param  {Object} object The object to query
 * @return {Boolean}
 */
var has = (0, _curry2.default)(function (key, object) {
  return object[key] !== null && object[key] !== undefined;
});

exports.default = has;
module.exports = exports['default'];