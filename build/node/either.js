'use strict';

var _fantasyLand = require('fantasy-land');

var _fantasyLand2 = _interopRequireDefault(_fantasyLand);

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

var Left = Either.Left,
    Right = Either.Right;

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// of :: b -> Either a b

Either.of = function (value) {
  return Right(value);
};

// of :: b -> Either a b
Right.of = function (value) {
  return Right(value);
};

// of :: a -> Either a b
Left.of = function (value) {
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
  return Either.chain((0, _compose2.default)(Right, transform), either);
});

// ap :: Apply (b -> c) -> Either a b -> Either a c
Either.ap = (0, _curry2.default)(function (left, right) {
  if (left.isLeft() && right.isLeft()) return right;
  if (left.isLeft()) return left;
  if (right.isLeft()) return right;

  return Right(left.value(right.value));
});

// isLeft :: Either a b -> Bool
Either.isLeft = function (either) {
  return either instanceof Left;
};

// isRight :: Either a b -> Bool
Either.isRight = function (either) {
  return either instanceof Right;
};

Either.try = function (callback) {
  return function () {
    try {
      return Right(callback.apply(undefined, arguments));
    } catch (e) {
      return Left(e);
    }
  };
};

/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

// of :: Either a b ~> d -> Either c d
Either.prototype.of = function (value) {
  return Right(value);
};

// of :: Either a b ~> d -> Either c d
Right.prototype.of = function (value) {
  return Right(value);
};

// of :: Either a b ~> c -> Either c d
Left.prototype.of = function (value) {
  return Left(value);
};

// caseOf :: Either a b ~> { Left: a -> c, Right: b -> c } -> c
Either.prototype.caseOf = function caseOf(cases) {
  return this.cata(cases);
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
Either.prototype[_fantasyLand2.default.of] = Either.prototype.of;

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
Right[_fantasyLand2.default.of] = Right.of;
Right.prototype[_fantasyLand2.default.of] = Right.prototype.of;

// Left Applicative
Left[_fantasyLand2.default.of] = Left.of;
Left.prototype[_fantasyLand2.default.of] = Left.prototype.of;

module.exports = Either;