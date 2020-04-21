const FL = require('fantasy-land');

const Task = require('./task');
const Either = require('./either');
const Maybe = require('./maybe');
const Result = require('./result');

const { union } = require('./adt');
const { __, curry, always, compose } = require('./_tools');


const Validation = union('Validation', {
  Success: ['value'],
  Failure: ['value'],
});

const Success = Validation.Success;
const Failure = Validation.Failure;

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
Validation.chain = curry((transform, validation) =>
  validation.cata({
    Failure: always(validation),
    Success: transform,
  }));

// andThen :: Validation v =>  (b -> v a c) -> v a b -> v a c
Validation.andThen = Validation.chain;

// map :: Validation v =>  (b -> c) -> v a b -> v a c
Validation.map = curry((transform, validation) =>
  Validation.chain(compose(Validation.of, transform), validation));

// ap :: Validation v =>  Apply (b -> c) -> v a b -> v a c
Validation.ap = curry((left, right) =>
  Validation.chain(Validation.map(__, right), left));

// isFailure :: Validation a b -> Bool
Validation.isFailure = validation => validation instanceof Validation.Failure;

// isSuccess :: Validation a b -> Bool
Validation.isSuccess = validation => validation instanceof Validation.Success;

// concat :: Validation v => v a b -> v a b -> v a b
Validation.concat = curry((left, right) =>
  left.cata({
    Failure: value =>
      right.cata({
        Success: always(left),
        Failure: x => Validation.Failure(value.concat(x)),
      }),

    Success: value =>
      right.cata({
        Success: x => Validation.Success(value.concat(x)),
        Failure: always(right),
      }),
  }));

// empty :: a -> Validation b [c]
Validation.empty = () =>
  Validation.Success([]);

// toEither ::Validation a b -> Either a b
Validation.toEither = validation =>
  validation.cata({
    Failure: Either.Left.of,
    Success: Either.Right.of,
  });

// toMaybe ::Validation a b -> Maybe b
Validation.toMaybe = validation =>
  validation.cata({
    Failure: Maybe.Nothing.of,
    Success: Maybe.Just.of,
  });

// toResult ::Validation a b -> Result a b
Validation.toResult = validation =>
  validation.cata({
    Failure: Result.Err.of,
    Success: Result.Ok.of,
  });

// toTask ::Validation a b -> Task a b
Validation.toTask = validation =>
  validation.cata({
    Failure: Task.reject,
    Success: Task.of,
  });


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

// of :: Validation a b ~> d -> Validation c d
Validation.prototype.of = function of(value) {
  return Validation.of(value);
};

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

// empty :: Validation a b ~> c -> Validation d [e]
Validation.prototype.empty = function empty() {
  return Validation.empty();
};

// toEither :: Validation a b ~> Either a b
Validation.prototype.toEither = function toEither() {
  return Validation.toEither(this);
};

// toMaybe :: Validation a b ~> Maybe b
Validation.prototype.toMaybe = function toMaybe() {
  return Validation.toMaybe(this);
};

// toResult :: Validation a b ~> Result a b
Validation.prototype.toResult = function toResult() {
  return Validation.toResult(this);
};

// toTask :: Validation a b ~> Task a b
Validation.prototype.toTask = function toTask() {
  return Validation.toTask(this);
};


/*
 |------------------------------------------------------------------------------
 | Fantasy Land
 |------------------------------------------------------------------------------
 */

// Validation Applicative
Validation[FL.of] = Validation.of;
Validation.prototype[FL.of] = Validation.prototype.of;

// Validation Chain
Validation[FL.chain] = Validation.chain;
Validation.prototype[FL.chain] = Validation.prototype.chain;

// Validation Functor
Validation[FL.map] = Validation.map;
Validation.prototype[FL.map] = Validation.prototype.map;

// Validation Apply
Validation[FL.ap] = Validation.ap;
Validation.prototype[FL.ap] = Validation.prototype.ap;

// Validation Semigroup
Validation[FL.concat] = Validation.concat;
Validation.prototype[FL.concat] = Validation.prototype.concat;

// Validation Monoid
Validation[FL.empty] = Validation.empty;
Validation.prototype[FL.empty] = Validation.prototype.empty;


// Success Applicative
Validation.Success[FL.of] = Validation.Success.of;
Validation.Success.prototype[FL.of] = Validation.Success.prototype.of;

// Failure Applicative
Validation.Failure[FL.of] = Validation.Failure.of;
Validation.Failure.prototype[FL.of] = Validation.Failure.prototype.of;


module.exports = Validation;
