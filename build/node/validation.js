'use strict';

var _fantasyLand = require('fantasy-land');

var _fantasyLand2 = _interopRequireDefault(_fantasyLand);

var _ = require('ramda/src/__');

var _2 = _interopRequireDefault(_);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _always = require('ramda/src/always');

var _always2 = _interopRequireDefault(_always);

var _adt = require('./adt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Validation = (0, _adt.union)('Validation', {
  Success: ['value'],
  Failure: ['value']
});

var Success = Validation.Success;
var Failure = Validation.Failure;

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// of :: b -> Validation a b
Validation.of = function of(value) {
  return Success(value);
};

// of :: b -> Validation a b
Success.of = function of(value) {
  return Success(value);
};

// of :: a -> Validation a b
Failure.of = function of(value) {
  return Failure(value);
};

// chain :: Validation v =>  (b -> v a c) -> v a b -> v a c
Validation.chain = (0, _curry2.default)(function (transform, validation) {
  return validation.cata({
    Failure: (0, _always2.default)(validation),
    Success: transform
  });
});

// andThen :: Validation v =>  (b -> v a c) -> v a b -> v a c
Validation.andThen = Validation.chain;

// map :: Validation v =>  (b -> c) -> v a b -> v a c
Validation.map = (0, _curry2.default)(function (transform, validation) {
  return Validation.chain((0, _compose2.default)(Validation.of, transform), validation);
});

// ap :: Validation v =>  Apply (b -> c) -> v a b -> v a c
Validation.ap = (0, _curry2.default)(function (left, right) {
  return Validation.chain(Validation.map(_2.default, right), left);
});

// isFailure :: Validation a b -> Bool
Validation.isFailure = function (validation) {
  return validation instanceof Validation.Failure;
};

// isSuccess :: Validation a b -> Bool
Validation.isSuccess = function (validation) {
  return validation instanceof Validation.Success;
};

// concat :: Validation v => v a b -> v a b -> v a b
Validation.concat = (0, _curry2.default)(function (left, right) {
  return left.cata({
    Failure: function Failure(value) {
      return right.cata({
        Success: (0, _always2.default)(left),
        Failure: function Failure(x) {
          return Validation.Failure(value.concat(x));
        }
      });
    },

    Success: function Success(value) {
      return right.cata({
        Success: function Success(x) {
          return Validation.Success(value.concat(x));
        },
        Failure: (0, _always2.default)(right)
      });
    }
  });
});

// empty :: a -> Validation b [c]
Validation.empty = function () {
  return Validation.Success([]);
};

/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

// caseOf :: Validation a b ~> { Failure: a -> c, Success: b -> c } -> c
Validation.prototype.caseOf = function caseOf(cases) {
  return this.cata(cases);
};

// of :: Validation a b ~> d -> Validation c d
Success.prototype.of = function of(value) {
  return Success.of(value);
};

// of :: Validation a b ~> c -> Validation c d
Failure.prototype.of = function of(value) {
  return Failure.of(value);
};

// chain :: Validation a b ~> (b -> Validation a c) -> Validation a c
Validation.prototype.chain = function chain(transform) {
  return Validation.chain(transform, this);
};

// andThen :: Validation a b ~> (b -> Validation a c) -> Validation a c
Validation.prototype.andThen = Validation.prototype.chain;

// map :: Validation a b ~> (b -> c) -> Validation a c
Validation.prototype.map = function map(transform) {
  return Validation.map(transform, this);
};

// ap :: Validation a b ~> Apply (b -> c) -> Validation a c
Validation.prototype.ap = function ap(apply) {
  return Validation.ap(apply, this);
};

// isFailure :: Validation a b ~> c -> Bool
Validation.prototype.isFailure = function isFailure() {
  return Validation.isFailure(this);
};

// isSuccess :: Validation a b ~> c -> Bool
Validation.prototype.isSuccess = function isSuccess() {
  return Validation.isSuccess(this);
};

// concat :: Validation a b ~> Validation a b -> Validation a b
Validation.prototype.concat = function concat(other) {
  return Validation.concat(other, this);
};

/*
 |------------------------------------------------------------------------------
 | Fantasy Land
 |------------------------------------------------------------------------------
 */

// Validation Applicative
Validation[_fantasyLand2.default.of] = Validation.of;

// Validation Chain
Validation[_fantasyLand2.default.chain] = Validation.chain;
Validation.prototype[_fantasyLand2.default.chain] = Validation.prototype.chain;

// Validation Functor
Validation[_fantasyLand2.default.map] = Validation.map;
Validation.prototype[_fantasyLand2.default.map] = Validation.prototype.map;

// Validation Apply
Validation[_fantasyLand2.default.ap] = Validation.ap;
Validation.prototype[_fantasyLand2.default.ap] = Validation.prototype.ap;

// Validation Semigroup
Validation[_fantasyLand2.default.concat] = Validation.concat;
Validation.prototype[_fantasyLand2.default.concat] = Validation.prototype.concat;

// Validation Monoid
Validation[_fantasyLand2.default.empty] = Validation.empty;

// Success Applicative
Validation.Success[_fantasyLand2.default.of] = Validation.Success.of;
Validation.Success.prototype[_fantasyLand2.default.of] = Validation.Success.prototype.of;

// Success Chain
Validation.Success[_fantasyLand2.default.chain] = Validation.Success.chain;
Validation.Success.prototype[_fantasyLand2.default.chain] = Validation.Success.prototype.chain;

// Success Functor
Validation.Success[_fantasyLand2.default.map] = Validation.Success.map;
Validation.Success.prototype[_fantasyLand2.default.map] = Validation.Success.prototype.map;

// Success Apply
Validation.Success[_fantasyLand2.default.ap] = Validation.Success.ap;
Validation.Success.prototype[_fantasyLand2.default.ap] = Validation.Success.prototype.ap;

// Success Semigroup
Validation.Success[_fantasyLand2.default.concat] = Validation.Success.concat;
Validation.Success.prototype[_fantasyLand2.default.concat] = Validation.Success.prototype.concat;

// Failure Applicative
Validation.Failure[_fantasyLand2.default.of] = Validation.Failure.of;
Validation.Failure.prototype[_fantasyLand2.default.of] = Validation.Failure.prototype.of;

// Failure Chain
Validation.Failure[_fantasyLand2.default.chain] = Validation.Failure.chain;
Validation.Failure.prototype[_fantasyLand2.default.chain] = Validation.Failure.prototype.chain;

// Failure Functor
Validation.Failure[_fantasyLand2.default.map] = Validation.Failure.map;
Validation.Failure.prototype[_fantasyLand2.default.map] = Validation.Failure.prototype.map;

// Failure Apply
Validation.Failure[_fantasyLand2.default.ap] = Validation.Failure.ap;
Validation.Failure.prototype[_fantasyLand2.default.ap] = Validation.Failure.prototype.ap;

// Failure Semigroup
Validation.Failure[_fantasyLand2.default.concat] = Validation.Failure.concat;
Validation.Failure.prototype[_fantasyLand2.default.concat] = Validation.Failure.prototype.concat;

module.exports = Validation;