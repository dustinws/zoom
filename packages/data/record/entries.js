'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

var _List = require('../List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Turn an object into an array of [key, value] tuples.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function entries
 * @example
 * import { Record } from '@dustinws/zoom/packages/data';
 *
 * Record.entries({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]
 *
 * @param  {Object} object The object to query
 * @return {Array<String>}
 */
var entries = function entries(object) {
  return _List2.default.map(function (x) {
    return [x, object[x]];
  }, (0, _keys2.default)(object));
};

exports.default = entries;
module.exports = exports['default'];