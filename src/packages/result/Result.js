import __ from 'ramda/src/__';
import curry from 'ramda/src/curry';
import always from 'ramda/src/always';
import compose from 'ramda/src/compose';
import { union } from '../adt';


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


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

// cata :: Result a b ~> { Err: a -> c, Ok: b -> c } -> c
Result.prototype.cata = Result.prototype.cata;

// caseOf :: Result a b ~> { Err: a -> c, Ok: b -> c } -> c
Result.prototype.caseOf = Result.prototype.cata;

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

export default Result;
