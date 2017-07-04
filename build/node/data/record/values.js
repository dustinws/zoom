'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

var _map = require('../list/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Get an object's values in an array.
 * @memberof Record
 * @since v1.16.0
 * @function values
 * @example
 * // values :: { String: a } -> [a]
 * import { Record } from '@dustinws/zoom/data';
 *
 * Record.values({ a: 1, b: 2 }) // [1, 2]
 *
 * @param  {Object} object The object to query
 * @return {Array<String>}
 */
function values(object) {
  return (0, _map2.default)(function (x) {
    return object[x];
  }, (0, _keys2.default)(object));
}

exports.default = values;
module.exports = exports['default'];