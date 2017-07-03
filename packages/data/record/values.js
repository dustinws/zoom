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
 * @description Get an object's values in an array.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function values
 * @example
 * import { Record } from '@dustinws/zoom/packages/data';
 *
 * Record.values({ a: 1, b: 2 }) // [1, 2]
 *
 * @param  {Object} object The object to query
 * @return {Array<String>}
 */
var values = function values(object) {
  return _List2.default.map(function (x) {
    return object[x];
  }, (0, _keys2.default)(object));
};

exports.default = values;
module.exports = exports['default'];