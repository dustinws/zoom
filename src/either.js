import fl from 'fantasy-land';
import curry from 'ramda/src/curry';
import always from 'ramda/src/always';
import compose from 'ramda/src/compose';
import { union } from './adt';

const Either = union('Either', {
  Right: ['value'],
  Left: ['value'],
});

const { Left, Right } = Either;

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// of :: b -> Either a b
Either.of = value =>
  Right(value);

// of :: b -> Either a b
Right.of = value =>
  Right(value);

// of :: a -> Either a b
Left.of = value =>
  Left(value);

// chain :: (b -> Either a c) -> Either a b -> Either a c
Either.chain = curry((transform, either) =>
  either.cata({
    Left: always(either),
    Right: transform,
  }));

// andThen :: (b -> Either a c) -> Either a b -> Either a c
Either.andThen = Either.chain;

// map :: (b -> c) -> Either a b -> Either a c
Either.map = curry((transform, either) =>
  Either.chain(compose(Right, transform), either));

// ap :: Apply (b -> c) -> Either a b -> Either a c
Either.ap = curry((left, right) => {
  if (left.isLeft() && right.isLeft()) return right;
  if (left.isLeft()) return left;
  if (right.isLeft()) return right;

  return Right(left.value(right.value));
});

// concat :: Either a b -> Either a b -> Either a b
Either.concat = curry((left, right) => {
  if (left.isLeft() && right.isLeft())
    return Left(left.value.concat(right.value));

  if (left.isLeft()) return left;
  if (right.isLeft()) return right;

  return Right(left.value.concat(right.value));
});

// reduce :: ((c, b) -> c) -> c -> Either a b -> c
Either.reduce = curry((callback, seed, either) =>
  either.cata({
    Left: always(seed),
    Right: v => callback(seed, v),
  }));

// equals :: Either a b -> Either a b -> Bool
Either.equals = curry((left, right) => {
  if (!(left.isLeft() && right.isLeft()))
    if (!(left.isRight() && right.isRight()))
      return false;

  return left.value === right.value;
});

// isLeft :: Either a b -> Bool
Either.isLeft = either => either instanceof Left;

// isRight :: Either a b -> Bool
Either.isRight = either => either instanceof Right;


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

// of :: Either a b ~> d -> Either c d
Either.prototype.of = value =>
  Right(value);

// of :: Either a b ~> d -> Either c d
Right.prototype.of = value =>
  Right(value);

// of :: Either a b ~> c -> Either c d
Left.prototype.of = value =>
  Left(value);

// caseOf :: Either a b ~> { Left: a -> c, Right: b -> c } -> c
Either.prototype.caseOf = Either.prototype.cata;

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

// concat :: Either a b ~> Either a b -> Either a b
Either.prototype.concat = function concat(other) {
  return Either.concat(this, other);
};

// reduce :: Either a b ~> ((c, b) -> c) -> c -> c
Either.prototype.reduce = function reduce(callback, seed) {
  return Either.reduce(callback, seed, this);
};

// equals :: Either a b ~> Either a b -> Bool
Either.prototype.equals = function equals(other) {
  return Either.equals(other, this);
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
Either[fl.of] = Either.of;
Either.prototype[fl.of] = Either.prototype.of;

// Either Chain
Either[fl.chain] = Either.chain;
Either.prototype[fl.chain] = Either.prototype.chain;

// Either Functor
Either[fl.map] = Either.map;
Either.prototype[fl.map] = Either.prototype.map;

// Either Apply
Either[fl.ap] = Either.ap;
Either.prototype[fl.ap] = Either.prototype.ap;

// Either Semigroup
Either[fl.concat] = Either.concat;
Either.prototype[fl.concat] = Either.prototype.concat;

// Either Setoid
Either[fl.equals] = Either.equals;
Either.prototype[fl.equals] = Either.prototype.equals;

// Either Foldable
Either[fl.reduce] = Either.reduce;
Either.prototype[fl.reduce] = Either.prototype.reduce;


// Right Applicative
Right[fl.of] = Right.of;
Right.prototype[fl.of] = Right.prototype.of;


// Left Applicative
Left[fl.of] = Left.of;
Left.prototype[fl.of] = Left.prototype.of;


module.exports = Either;
