'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _entries = require('./entries');

var _entries2 = _interopRequireDefault(_entries);

var _fromPairs = require('./fromPairs');

var _fromPairs2 = _interopRequireDefault(_fromPairs);

var _has = require('./has');

var _has2 = _interopRequireDefault(_has);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

var _merge = require('./merge');

var _merge2 = _interopRequireDefault(_merge);

var _size = require('./size');

var _size2 = _interopRequireDefault(_size);

var _values = require('./values');

var _values2 = _interopRequireDefault(_values);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  entries: _entries2.default,
  fromPairs: _fromPairs2.default,
  has: _has2.default,
  keys: _keys2.default,
  map: _map2.default,
  matches: _matches2.default,
  merge: _merge2.default,
  size: _size2.default,
  values: _values2.default
}; /**
    * @class Record
    * @description
    * This module contains functions for object interactions. It is a static object
    * and is not an actual class. The class tag was used in the documentation
    * for namespacing and formatting.
    */

module.exports = exports['default'];