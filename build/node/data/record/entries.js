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
 * @description Turn an object into an array of [key, value] tuples.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function entries
 * @example
 * // entries :: { String: a } -> [[String, a]]
 * import { entries } from '@dustinws/zoom/data/record';
 *
 * entries({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]
 *
 * @param  {Object} object The object to query
 * @return {Array<String>}
 */
function entries(object) {
  return (0, _map2.default)(function (x) {
    return [x, object[x]];
  }, (0, _keys2.default)(object));
}

exports.default = entries;
module.exports = exports['default'];