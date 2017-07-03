'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fantasyLand = require('fantasy-land');

var _fantasyLand2 = _interopRequireDefault(_fantasyLand);

var _Validation = require('./Validation');

var _Validation2 = _interopRequireDefault(_Validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Validation Applicative
_Validation2.default[_fantasyLand2.default.of] = _Validation2.default.of;

// Validation Chain
_Validation2.default[_fantasyLand2.default.chain] = _Validation2.default.chain;
_Validation2.default.prototype[_fantasyLand2.default.chain] = _Validation2.default.prototype.chain;

// Validation Functor
_Validation2.default[_fantasyLand2.default.map] = _Validation2.default.map;
_Validation2.default.prototype[_fantasyLand2.default.map] = _Validation2.default.prototype.map;

// Validation Apply
_Validation2.default[_fantasyLand2.default.ap] = _Validation2.default.ap;
_Validation2.default.prototype[_fantasyLand2.default.ap] = _Validation2.default.prototype.ap;

// Validation Semigroup
_Validation2.default[_fantasyLand2.default.concat] = _Validation2.default.concat;
_Validation2.default.prototype[_fantasyLand2.default.concat] = _Validation2.default.prototype.concat;

// Validation Monoid
_Validation2.default[_fantasyLand2.default.empty] = _Validation2.default.empty;

// Success Applicative
_Validation2.default.Success[_fantasyLand2.default.of] = _Validation2.default.Success.of;
_Validation2.default.Success.prototype[_fantasyLand2.default.of] = _Validation2.default.Success.prototype.of;

// Success Chain
_Validation2.default.Success[_fantasyLand2.default.chain] = _Validation2.default.Success.chain;
_Validation2.default.Success.prototype[_fantasyLand2.default.chain] = _Validation2.default.Success.prototype.chain;

// Success Functor
_Validation2.default.Success[_fantasyLand2.default.map] = _Validation2.default.Success.map;
_Validation2.default.Success.prototype[_fantasyLand2.default.map] = _Validation2.default.Success.prototype.map;

// Success Apply
_Validation2.default.Success[_fantasyLand2.default.ap] = _Validation2.default.Success.ap;
_Validation2.default.Success.prototype[_fantasyLand2.default.ap] = _Validation2.default.Success.prototype.ap;

// Success Semigroup
_Validation2.default.Success[_fantasyLand2.default.concat] = _Validation2.default.Success.concat;
_Validation2.default.Success.prototype[_fantasyLand2.default.concat] = _Validation2.default.Success.prototype.concat;

// Failure Applicative
_Validation2.default.Failure[_fantasyLand2.default.of] = _Validation2.default.Failure.of;
_Validation2.default.Failure.prototype[_fantasyLand2.default.of] = _Validation2.default.Failure.prototype.of;

// Failure Chain
_Validation2.default.Failure[_fantasyLand2.default.chain] = _Validation2.default.Failure.chain;
_Validation2.default.Failure.prototype[_fantasyLand2.default.chain] = _Validation2.default.Failure.prototype.chain;

// Failure Functor
_Validation2.default.Failure[_fantasyLand2.default.map] = _Validation2.default.Failure.map;
_Validation2.default.Failure.prototype[_fantasyLand2.default.map] = _Validation2.default.Failure.prototype.map;

// Failure Apply
_Validation2.default.Failure[_fantasyLand2.default.ap] = _Validation2.default.Failure.ap;
_Validation2.default.Failure.prototype[_fantasyLand2.default.ap] = _Validation2.default.Failure.prototype.ap;

// Failure Semigroup
_Validation2.default.Failure[_fantasyLand2.default.concat] = _Validation2.default.Failure.concat;
_Validation2.default.Failure.prototype[_fantasyLand2.default.concat] = _Validation2.default.Failure.prototype.concat;

exports.default = _Validation2.default;
module.exports = exports['default'];