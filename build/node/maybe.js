'use strict';

var _fantasyLand = require('fantasy-land');

var _fantasyLand2 = _interopRequireDefault(_fantasyLand);

var _ = require('ramda/src/__');

var _2 = _interopRequireDefault(_);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _always = require('ramda/src/always');

var _always2 = _interopRequireDefault(_always);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _adt = require('./adt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Maybe = (0, _adt.union)('Maybe', {
  Just: ['value'],
  Nothing: []
});

var Just = Maybe.Just;
var Nothing = Maybe.Nothing;

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// of :: a -> Maybe a
Maybe.of = function of(value) {
  return Just(value);
};

// of :: a -> Maybe a
Just.of = function of(value) {
  return Just(value);
};

// of :: a -> Maybe a
Nothing.of = function of() {
  return Maybe.Nothing;
};

// chain :: (a -> Maybe b) -> Maybe a -> Maybe b
Maybe.chain = (0, _curry2.default)(function (transform, maybe) {
  return maybe.cata({
    Nothing: (0, _always2.default)(maybe),
    Just: transform
  });
});

// andThen :: (a -> Maybe b) -> Maybe a -> Maybe b
Maybe.andThen = Maybe.chain;

// map :: (a -> b) -> Maybe a -> Maybe b
Maybe.map = (0, _curry2.default)(function (transform, maybe) {
  return Maybe.chain((0, _compose2.default)(Maybe.of, transform), maybe);
});

// ap :: Apply (a -> b) -> Maybe a -> Maybe b
Maybe.ap = (0, _curry2.default)(function (left, right) {
  return Maybe.chain(Maybe.map(_2.default, right), left);
});

// isNothing :: Maybe a -> Bool
Maybe.isNothing = function (maybe) {
  return maybe === Maybe.Nothing;
};

// isJust :: Maybe a -> Bool
Maybe.isJust = function (maybe) {
  return maybe instanceof Maybe.Just;
};

// fromNullable :: a -> Maybe a
Maybe.fromNullable = function (value) {
  if (value === null || value === undefined) {
    return Maybe.Nothing;
  }

  return Maybe.Just.of(value);
};

// withDefault :: a -> Maybe a -> a
Maybe.withDefault = (0, _curry2.default)(function (defaultValue, maybe) {
  return maybe.cata({
    Just: function Just(value) {
      return value;
    },
    Nothing: function Nothing() {
      return defaultValue;
    }
  });
});

/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

// caseOf :: Maybe a ~> { Nothing: b -> c, Just: a -> c } -> c
Maybe.prototype.caseOf = function caseOf(cases) {
  return this.cata(cases);
};

// of :: a -> Maybe a
Just.prototype.of = function of(value) {
  return Just(value);
};

// chain :: Maybe a ~> (a -> Maybe b) -> Maybe b
Maybe.prototype.chain = function chain(transform) {
  return Maybe.chain(transform, this);
};

// andThen :: Maybe a ~> (a -> Maybe b) -> Maybe b
Maybe.prototype.andThen = function andThen(transform) {
  return Maybe.chain(transform, this);
};

// map :: Maybe a ~> (a -> b) -> Maybe b
Maybe.prototype.map = function map(transform) {
  return Maybe.map(transform, this);
};

// ap :: Maybe a ~> Apply (a -> b) -> Maybe b
Maybe.prototype.ap = function ap(transform) {
  return Maybe.ap(transform, this);
};

// isNothing :: Maybe a ~> b -> Bool
Maybe.prototype.isNothing = function isNothing() {
  return Maybe.isNothing(this);
};

// isJust :: Maybe a ~> b -> Bool
Maybe.prototype.isJust = function isJust() {
  return Maybe.isJust(this);
};

// withDefault :: Maybe a ~> a -> a
Maybe.prototype.withDefault = function withDefault(value) {
  return Maybe.withDefault(value, this);
};

/*
 |------------------------------------------------------------------------------
 | Fantasy Land
 |------------------------------------------------------------------------------
 */

// Maybe Applicative
Maybe[_fantasyLand2.default.of] = Maybe.of;

// Maybe Chain
Maybe[_fantasyLand2.default.chain] = Maybe.chain;
Maybe.prototype[_fantasyLand2.default.chain] = Maybe.prototype.chain;

// Maybe Functor
Maybe[_fantasyLand2.default.map] = Maybe.map;
Maybe.prototype[_fantasyLand2.default.map] = Maybe.prototype.map;

// Maybe Apply
Maybe[_fantasyLand2.default.ap] = Maybe.ap;
Maybe.prototype[_fantasyLand2.default.ap] = Maybe.prototype.ap;

// Just Applicative
Maybe.Just[_fantasyLand2.default.of] = Maybe.Just.of;
Maybe.Just.prototype[_fantasyLand2.default.of] = Maybe.Just.prototype.of;

// Nothing Applicative
Maybe.Nothing[_fantasyLand2.default.of] = Maybe.Nothing.of;

module.exports = Maybe;