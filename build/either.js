const FL = require('fantasy-land');

const { union } = require('./adt');
const { always, curry, compose } = require('./_tools');


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

// isLeft :: Either a b -> Bool
Either.isLeft = either => either instanceof Left;

// isRight :: Either a b -> Bool
Either.isRight = either => either instanceof Right;

Either.try = callback => (...args) => {
  try {
    return Right(callback(...args));
  } catch (e) {
    return Left(e);
  }
};


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
Either[FL.of] = Either.of;
Either.prototype[FL.of] = Either.prototype.of;

// Either Chain
Either[FL.chain] = Either.chain;
Either.prototype[FL.chain] = Either.prototype.chain;

// Either Functor
Either[FL.map] = Either.map;
Either.prototype[FL.map] = Either.prototype.map;

// Either Apply
Either[FL.ap] = Either.ap;
Either.prototype[FL.ap] = Either.prototype.ap;


// Right Applicative
Right[FL.of] = Right.of;
Right.prototype[FL.of] = Right.prototype.of;


// Left Applicative
Left[FL.of] = Left.of;
Left.prototype[FL.of] = Left.prototype.of;


module.exports = Either;
