'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Determine the number of enumberable keys that an object has.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function size
 * @example
 * // size :: { String: * } -> Int
 * import { size } from '@dustinws/zoom/data/record';
 *
 * size({ a: 1 }) // 1
 *
 * @param  {Object} object The object to query
 * @return {Number}
 */
function size(object) {
  return (0, _keys2.default)(object).length;
}

exports.default = size;
module.exports = exports['default'];