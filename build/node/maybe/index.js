'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fantasyLand = require('fantasy-land');

var _fantasyLand2 = _interopRequireDefault(_fantasyLand);

var _Maybe = require('./Maybe');

var _Maybe2 = _interopRequireDefault(_Maybe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Maybe Applicative
_Maybe2.default[_fantasyLand2.default.of] = _Maybe2.default.of;

// Maybe Chain
_Maybe2.default[_fantasyLand2.default.chain] = _Maybe2.default.chain;
_Maybe2.default.prototype[_fantasyLand2.default.chain] = _Maybe2.default.prototype.chain;

// Maybe Functor
_Maybe2.default[_fantasyLand2.default.map] = _Maybe2.default.map;
_Maybe2.default.prototype[_fantasyLand2.default.map] = _Maybe2.default.prototype.map;

// Maybe Apply
_Maybe2.default[_fantasyLand2.default.ap] = _Maybe2.default.ap;
_Maybe2.default.prototype[_fantasyLand2.default.ap] = _Maybe2.default.prototype.ap;

// Just Applicative
_Maybe2.default.Just[_fantasyLand2.default.of] = _Maybe2.default.Just.of;
_Maybe2.default.Just.prototype[_fantasyLand2.default.of] = _Maybe2.default.Just.prototype.of;

// Maybe.Just Chain
_Maybe2.default.Just[_fantasyLand2.default.chain] = _Maybe2.default.Just.chain;
_Maybe2.default.Just.prototype[_fantasyLand2.default.chain] = _Maybe2.default.Just.prototype.chain;

// Maybe.Just Functor
_Maybe2.default.Just[_fantasyLand2.default.map] = _Maybe2.default.Just.map;
_Maybe2.default.Just.prototype[_fantasyLand2.default.map] = _Maybe2.default.Just.prototype.map;

// Maybe.Just Apply
_Maybe2.default.Just[_fantasyLand2.default.ap] = _Maybe2.default.Just.ap;
_Maybe2.default.Just.prototype[_fantasyLand2.default.ap] = _Maybe2.default.Just.prototype.ap;

// Nothing Applicative
_Maybe2.default.Nothing[_fantasyLand2.default.of] = _Maybe2.default.Nothing.of;

// Maybe.Nothing Chain
_Maybe2.default.Nothing[_fantasyLand2.default.chain] = _Maybe2.default.Nothing.chain;

// Maybe.Nothing Functor
_Maybe2.default.Nothing[_fantasyLand2.default.map] = _Maybe2.default.Nothing.map;

// Maybe.Nothing Apply
_Maybe2.default.Nothing[_fantasyLand2.default.ap] = _Maybe2.default.Nothing.ap;

exports.default = _Maybe2.default;
module.exports = exports['default'];