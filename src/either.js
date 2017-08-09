import fl from 'fantasy-land';
import __ from 'ramda/src/__';
import curry from 'ramda/src/curry';
import always from 'ramda/src/always';
import compose from 'ramda/src/compose';
import { union } from './adt';

const Either = union('Either', {
  Right: ['value'],
  Left: ['value'],
});

const Right = Either.Right;
const Left = Either.Left;

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
Either.chain = curry((transform, either) =>
  either.cata({
    Left: always(either),
    Right: transform,
  }));

// andThen :: (b -> Either a c) -> Either a b -> Either a c
Either.andThen = Either.chain;

// map :: (b -> c) -> Either a b -> Either a c
Either.map = curry((transform, either) =>
  Either.chain(compose(Either.of, transform), either));

// ap :: Apply (b -> c) -> Either a b -> Either a c
Either.ap = curry((left, right) =>
  Either.chain(Either.map(__, right), left));

// isLeft :: Either a b -> Bool
Either.isLeft = either => either instanceof Either.Left;

// isRight :: Either a b -> Bool
Either.isRight = either => either instanceof Either.Right;


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
Either[fl.of] = Either.of;

// Either Chain
Either[fl.chain] = Either.chain;
Either.prototype[fl.chain] = Either.prototype.chain;

// Either Functor
Either[fl.map] = Either.map;
Either.prototype[fl.map] = Either.prototype.map;

// Either Apply
Either[fl.ap] = Either.ap;
Either.prototype[fl.ap] = Either.prototype.ap;


// Right Applicative
Either.Right[fl.of] = Either.Right.of;
Either.Right.prototype[fl.of] = Either.Right.prototype.of;

// Either.Right Chain
Either.Right[fl.chain] = Either.Right.chain;
Either.Right.prototype[fl.chain] = Either.Right.prototype.chain;

// Either.Right Functor
Either.Right[fl.map] = Either.Right.map;
Either.Right.prototype[fl.map] = Either.Right.prototype.map;

// Either.Right Apply
Either.Right[fl.ap] = Either.Right.ap;
Either.Right.prototype[fl.ap] = Either.Right.prototype.ap;


// Left Applicative
Either.Left[fl.of] = Either.Left.of;
Either.Left.prototype[fl.of] = Either.Left.prototype.of;

// Either.Left Chain
Either.Left[fl.chain] = Either.Left.chain;
Either.Left.prototype[fl.chain] = Either.Left.prototype.chain;

// Either.Left Functor
Either.Left[fl.map] = Either.Left.map;
Either.Left.prototype[fl.map] = Either.Left.prototype.map;

// Either.Left Apply
Either.Left[fl.ap] = Either.Left.ap;
Either.Left.prototype[fl.ap] = Either.Left.prototype.ap;

module.exports = Either;
