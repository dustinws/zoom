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

var Either = (0, _adt.union)('Either', {
  Right: ['value'],
  Left: ['value']
});

var Right = Either.Right;
var Left = Either.Left;

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// of :: b -> Either a b
Either.of = function of(value) {
  return Right(value);
};

// of :: b -> Either a b
Right.of = function of(value) {
  return Right(value);
};

// of :: a -> Either a b
Left.of = function of(value) {
  return Left(value);
};

// chain :: (b -> Either a c) -> Either a b -> Either a c
Either.chain = (0, _curry2.default)(function (transform, either) {
  return either.cata({
    Left: (0, _always2.default)(either),
    Right: transform
  });
});

// andThen :: (b -> Either a c) -> Either a b -> Either a c
Either.andThen = Either.chain;

// map :: (b -> c) -> Either a b -> Either a c
Either.map = (0, _curry2.default)(function (transform, either) {
  return Either.chain((0, _compose2.default)(Either.of, transform), either);
});

// ap :: Apply (b -> c) -> Either a b -> Either a c
Either.ap = (0, _curry2.default)(function (left, right) {
  return Either.chain(Either.map(_2.default, right), left);
});

// isLeft :: Either a b -> Bool
Either.isLeft = function (either) {
  return either instanceof Either.Left;
};

// isRight :: Either a b -> Bool
Either.isRight = function (either) {
  return either instanceof Either.Right;
};

/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

// cata :: Either a b ~> { Left: a -> c, Right: b -> c } -> c
Either.prototype.cata = Either.prototype.cata;

// caseOf :: Either a b ~> { Left: a -> c, Right: b -> c } -> c
Either.prototype.caseOf = Either.prototype.cata;

// of :: Either a b ~> d -> Either c d
Right.prototype.of = function of(value) {
  return Right.of(value);
};

// of :: Either a b ~> c -> Either c d
Left.prototype.of = function of(value) {
  return Left.of(value);
};

// chain :: Either a b ~> (b -> Either a c) -> Either a c
Either.prototype.chain = function chain(transform) {
  return Either.chain(transform, this);
};

// andThen :: Either a b ~> (b -> Either a c) -> Either a c
Either.prototype.andThen = function andThen(transform) {
  return Either.chain(transform, this);
};

// map :: Either a b ~> (b -> c) -> Either a c
Either.prototype.map = function map(transform) {
  return Either.map(transform, this);
};

// ap :: Either a b ~> Apply (b -> c) -> Either a c
Either.prototype.ap = function ap(apply) {
  return Either.ap(apply, this);
};

// isLeft :: Either a b ~> c -> Bool
Either.prototype.isLeft = function isLeft() {
  return Either.isLeft(this);
};

// isRight :: Either a b ~> c -> Bool
Either.prototype.isRight = function isRight() {
  return Either.isRight(this);
};

/*
 |------------------------------------------------------------------------------
 | Fantasy Land
 |------------------------------------------------------------------------------
 */

// Either Applicative
Either[_fantasyLand2.default.of] = Either.of;

// Either Chain
Either[_fantasyLand2.default.chain] = Either.chain;
Either.prototype[_fantasyLand2.default.chain] = Either.prototype.chain;

// Either Functor
Either[_fantasyLand2.default.map] = Either.map;
Either.prototype[_fantasyLand2.default.map] = Either.prototype.map;

// Either Apply
Either[_fantasyLand2.default.ap] = Either.ap;
Either.prototype[_fantasyLand2.default.ap] = Either.prototype.ap;

// Right Applicative
Either.Right[_fantasyLand2.default.of] = Either.Right.of;
Either.Right.prototype[_fantasyLand2.default.of] = Either.Right.prototype.of;

// Either.Right Chain
Either.Right[_fantasyLand2.default.chain] = Either.Right.chain;
Either.Right.prototype[_fantasyLand2.default.chain] = Either.Right.prototype.chain;

// Either.Right Functor
Either.Right[_fantasyLand2.default.map] = Either.Right.map;
Either.Right.prototype[_fantasyLand2.default.map] = Either.Right.prototype.map;

// Either.Right Apply
Either.Right[_fantasyLand2.default.ap] = Either.Right.ap;
Either.Right.prototype[_fantasyLand2.default.ap] = Either.Right.prototype.ap;

// Left Applicative
Either.Left[_fantasyLand2.default.of] = Either.Left.of;
Either.Left.prototype[_fantasyLand2.default.of] = Either.Left.prototype.of;

// Either.Left Chain
Either.Left[_fantasyLand2.default.chain] = Either.Left.chain;
Either.Left.prototype[_fantasyLand2.default.chain] = Either.Left.prototype.chain;

// Either.Left Functor
Either.Left[_fantasyLand2.default.map] = Either.Left.map;
Either.Left.prototype[_fantasyLand2.default.map] = Either.Left.prototype.map;

// Either.Left Apply
Either.Left[_fantasyLand2.default.ap] = Either.Left.ap;
Either.Left.prototype[_fantasyLand2.default.ap] = Either.Left.prototype.ap;

module.exports = Either;