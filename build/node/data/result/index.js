'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fantasyLand = require('fantasy-land');

var _fantasyLand2 = _interopRequireDefault(_fantasyLand);

var _Result = require('./Result');

var _Result2 = _interopRequireDefault(_Result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Result Applicative
_Result2.default[_fantasyLand2.default.of] = _Result2.default.of;

// Result Chain
_Result2.default[_fantasyLand2.default.chain] = _Result2.default.chain;
_Result2.default.prototype[_fantasyLand2.default.chain] = _Result2.default.prototype.chain;

// Result Functor
_Result2.default[_fantasyLand2.default.map] = _Result2.default.map;
_Result2.default.prototype[_fantasyLand2.default.map] = _Result2.default.prototype.map;

// Result Apply
_Result2.default[_fantasyLand2.default.ap] = _Result2.default.ap;
_Result2.default.prototype[_fantasyLand2.default.ap] = _Result2.default.prototype.ap;

// Ok Applicative
_Result2.default.Ok[_fantasyLand2.default.of] = _Result2.default.Ok.of;
_Result2.default.Ok.prototype[_fantasyLand2.default.of] = _Result2.default.Ok.prototype.of;

// Result.Ok Chain
_Result2.default.Ok[_fantasyLand2.default.chain] = _Result2.default.Ok.chain;
_Result2.default.Ok.prototype[_fantasyLand2.default.chain] = _Result2.default.Ok.prototype.chain;

// Result.Ok Functor
_Result2.default.Ok[_fantasyLand2.default.map] = _Result2.default.Ok.map;
_Result2.default.Ok.prototype[_fantasyLand2.default.map] = _Result2.default.Ok.prototype.map;

// Result.Ok Apply
_Result2.default.Ok[_fantasyLand2.default.ap] = _Result2.default.Ok.ap;
_Result2.default.Ok.prototype[_fantasyLand2.default.ap] = _Result2.default.Ok.prototype.ap;

// Err Applicative
_Result2.default.Err[_fantasyLand2.default.of] = _Result2.default.Err.of;
_Result2.default.Err.prototype[_fantasyLand2.default.of] = _Result2.default.Err.prototype.of;

// Result.Err Chain
_Result2.default.Err[_fantasyLand2.default.chain] = _Result2.default.Err.chain;
_Result2.default.Err.prototype[_fantasyLand2.default.chain] = _Result2.default.Err.prototype.chain;

// Result.Err Functor
_Result2.default.Err[_fantasyLand2.default.map] = _Result2.default.Err.map;
_Result2.default.Err.prototype[_fantasyLand2.default.map] = _Result2.default.Err.prototype.map;

// Result.Err Apply
_Result2.default.Err[_fantasyLand2.default.ap] = _Result2.default.Err.ap;
_Result2.default.Err.prototype[_fantasyLand2.default.ap] = _Result2.default.Err.prototype.ap;

exports.default = _Result2.default;
module.exports = exports['default'];