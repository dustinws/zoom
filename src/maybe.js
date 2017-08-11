import FL from 'fantasy-land';
import __ from 'ramda/src/__';
import curry from 'ramda/src/curry';
import always from 'ramda/src/always';
import compose from 'ramda/src/compose';
import { union } from './adt';


const Maybe = union('Maybe', {
  Just: ['value'],
  Nothing: [],
});

const Just = Maybe.Just;
const Nothing = Maybe.Nothing;


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
Maybe.chain = curry((transform, maybe) =>
  maybe.cata({
    Nothing: always(maybe),
    Just: transform,
  }));

// andThen :: (a -> Maybe b) -> Maybe a -> Maybe b
Maybe.andThen = Maybe.chain;

// map :: (a -> b) -> Maybe a -> Maybe b
Maybe.map = curry((transform, maybe) =>
  Maybe.chain(compose(Maybe.of, transform), maybe));

// ap :: Apply (a -> b) -> Maybe a -> Maybe b
Maybe.ap = curry((left, right) =>
  Maybe.chain(Maybe.map(__, right), left));

// isNothing :: Maybe a -> Bool
Maybe.isNothing = maybe => maybe === Maybe.Nothing;

// isJust :: Maybe a -> Bool
Maybe.isJust = maybe => maybe instanceof Maybe.Just;

// fromNullable :: a -> Maybe a
Maybe.fromNullable = (value) => {
  if (value === null || value === undefined) {
    return Maybe.Nothing;
  }

  return Maybe.Just.of(value);
};

// withDefault :: a -> Maybe a -> a
Maybe.withDefault = curry((defaultValue, maybe) =>
  maybe.cata({
    Just: value => value,
    Nothing: () => defaultValue,
  }));


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
Maybe[FL.of] = Maybe.of;

// Maybe Chain
Maybe[FL.chain] = Maybe.chain;
Maybe.prototype[FL.chain] = Maybe.prototype.chain;

// Maybe Functor
Maybe[FL.map] = Maybe.map;
Maybe.prototype[FL.map] = Maybe.prototype.map;

// Maybe Apply
Maybe[FL.ap] = Maybe.ap;
Maybe.prototype[FL.ap] = Maybe.prototype.ap;


// Just Applicative
Maybe.Just[FL.of] = Maybe.Just.of;
Maybe.Just.prototype[FL.of] = Maybe.Just.prototype.of;

// Nothing Applicative
Maybe.Nothing[FL.of] = Maybe.Nothing.of;


module.exports = Maybe;
