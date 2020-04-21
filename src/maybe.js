const FL = require('fantasy-land');

const Task = require('./task');
const Either = require('./either');
const Result = require('./result');
const Validation = require('./validation');

const { union } = require('./adt');
const { __, curry, always, compose } = require('./_tools');


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

// toEither :: Maybe b -> Either a b
Maybe.toEither = maybe =>
  maybe.cata({
    Nothing: Either.Left,
    Just: Either.Right,
  });

// toResult :: Maybe b -> Result a b
Maybe.toResult = maybe =>
  maybe.cata({
    Nothing: Result.Err,
    Just: Result.Ok,
  });

// toValidation :: Maybe b -> Validation a b
Maybe.toValidation = maybe =>
  maybe.cata({
    Nothing: Validation.Failure,
    Just: Validation.Success,
  });

// toTask :: Maybe b -> Task a b
Maybe.toTask = maybe =>
  maybe.cata({
    Nothing: Task.reject,
    Just: Task.of,
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

// toEither :: Maybe b ~> Either a b
Maybe.prototype.toEither = function toEither() {
  return Maybe.toEither(this);
};

// toResult :: Maybe b ~> Result a b
Maybe.prototype.toResult = function toResult() {
  return Maybe.toResult(this);
};

// toValidation :: Maybe b ~> Validation a b
Maybe.prototype.toValidation = function toValidation() {
  return Maybe.toValidation(this);
};

// toTask :: Maybe b ~> Maybe b
Maybe.prototype.toTask = function toTask() {
  return Maybe.toTask(this);
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
