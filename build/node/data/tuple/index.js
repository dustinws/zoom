'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fantasyLand = require('fantasy-land');

var _fantasyLand2 = _interopRequireDefault(_fantasyLand);

var _Tuple = require('./Tuple');

var _Tuple2 = _interopRequireDefault(_Tuple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Tuple Applicative
_Tuple2.default[_fantasyLand2.default.of] = _Tuple2.default.of;
_Tuple2.default.prototype[_fantasyLand2.default.of] = _Tuple2.default.prototype.of;

// Tuple Functor
_Tuple2.default[_fantasyLand2.default.map] = _Tuple2.default.map;
_Tuple2.default.prototype[_fantasyLand2.default.map] = _Tuple2.default.prototype.map;

exports.default = _Tuple2.default;
module.exports = exports['default'];