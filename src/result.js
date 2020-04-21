const FL = require('fantasy-land');

const Task = require('./task');
const Either = require('./either');
const Maybe = require('./maybe');
const Validation = require('./validation');

const { union } = require('./adt');
const { __, curry, always, compose } = require('./_tools');


const Result = union('Result', {
  Ok: ['value'],
  Err: ['value'],
});

const Ok = Result.Ok;
const Err = Result.Err;

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// of :: b -> Result a b
Result.of = function of(value) {
  return Ok(value);
};

// of :: b -> Result a b
Ok.of = function of(value) {
  return Ok(value);
};

// of :: a -> Result a b
Err.of = function of(value) {
  return Err(value);
};

// chain :: (b -> Result a c) -> Result a b -> Result a c
Result.chain = curry((transform, result) =>
  result.cata({
    Err: always(result),
    Ok: transform,
  }));

// andThen :: (b -> Result a c) -> Result a b -> Result a c
Result.andThen = Result.chain;

// map :: (b -> c) -> Result a b -> Result a c
Result.map = curry((transform, result) =>
  Result.chain(compose(Result.of, transform), result));

// map :: Apply (b -> c) -> Result a b -> Result a c
Result.ap = curry((left, right) =>
  Result.chain(Result.map(__, right), left));

// isErr :: Result a b -> Bool
Result.isErr = result => result instanceof Result.Err;

// isOk :: Result a b -> Bool
Result.isOk = result => result instanceof Result.Ok;

// toMaybe :: Result a b -> Maybe b
Result.toMaybe = result =>
  result.cata({
    Err: Maybe.Nothing.of,
    Ok: Maybe.Just.of,
  });

// toEither :: Result a b -> Either a b
Result.toEither = result =>
  result.cata({
    Err: Either.Left.of,
    Ok: Either.Right.of,
  });

// toTask :: Result a b -> Task a b
Result.toTask = result =>
  result.cata({
    Err: Task.reject,
    Ok: Task.of,
  });

// toValidation :: Result a b -> Validation a b
Result.toValidation = result =>
  result.cata({
    Err: Validation.Failure.of,
    Ok: Validation.Success.of,
  });


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

// caseOf :: Result a b ~> { Err: a -> c, Ok: b -> c } -> c
Result.prototype.caseOf = function caseOf(cases) {
  return this.cata(cases);
};

// of :: Result a b ~> d -> Result c d
Ok.prototype.of = function of(value) {
  return Ok.of(value);
};

// of :: Result a b ~> c -> Result c d
Err.prototype.of = function of(value) {
  return Err.of(value);
};

// chain :: Result a b ~> (b -> Result a c) -> Result a c
Result.prototype.chain = function chain(transform) {
  return Result.chain(transform, this);
};

// andThen :: Result a b ~> (b -> Result a c) -> Result a c
Result.prototype.andThen = function andThen(transform) {
  return Result.chain(transform, this);
};

// map :: Result a b ~> (b -> c) -> Result a c
Result.prototype.map = function map(transform) {
  return Result.map(transform, this);
};

// ap :: Result a b ~> Apply (b -> c) -> Result a c
Result.prototype.ap = function ap(apply) {
  return Result.ap(apply, this);
};

// isErr :: Result a b ~> c -> Bool
Result.prototype.isErr = function isErr() {
  return Result.isErr(this);
};

// isOk :: Result a b ~> c -> Bool
Result.prototype.isOk = function isOk() {
  return Result.isOk(this);
};

// toMaybe :: Result a b ~> Maybe b
Result.prototype.toMaybe = function toMaybe() {
  return Result.toMaybe(this);
};

// toEither :: Result a b ~> Either a b
Result.prototype.toEither = function toEither() {
  return Result.toEither(this);
};

// toTask :: Result a b ~> Task a b
Result.prototype.toTask = function toTask() {
  return Result.toTask(this);
};

// toValidation :: Result a b ~> Validation a b
Result.prototype.toValidation = function toValidation() {
  return Result.toValidation(this);
};

/*
 |------------------------------------------------------------------------------
 | Fantasy Land
 |------------------------------------------------------------------------------
 */

// Result Applicative
Result[FL.of] = Result.of;

// Result Chain
Result[FL.chain] = Result.chain;
Result.prototype[FL.chain] = Result.prototype.chain;

// Result Functor
Result[FL.map] = Result.map;
Result.prototype[FL.map] = Result.prototype.map;

// Result Apply
Result[FL.ap] = Result.ap;
Result.prototype[FL.ap] = Result.prototype.ap;


// Ok Applicative
Result.Ok[FL.of] = Result.Ok.of;
Result.Ok.prototype[FL.of] = Result.Ok.prototype.of;

// Err Applicative
Result.Err[FL.of] = Result.Err.of;
Result.Err.prototype[FL.of] = Result.Err.prototype.of;


module.exports = Result;
