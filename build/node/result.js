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

var Result = (0, _adt.union)('Result', {
  Ok: ['value'],
  Err: ['value']
});

var Ok = Result.Ok;
var Err = Result.Err;

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
Result.chain = (0, _curry2.default)(function (transform, result) {
  return result.cata({
    Err: (0, _always2.default)(result),
    Ok: transform
  });
});

// andThen :: (b -> Result a c) -> Result a b -> Result a c
Result.andThen = Result.chain;

// map :: (b -> c) -> Result a b -> Result a c
Result.map = (0, _curry2.default)(function (transform, result) {
  return Result.chain((0, _compose2.default)(Result.of, transform), result);
});

// map :: Apply (b -> c) -> Result a b -> Result a c
Result.ap = (0, _curry2.default)(function (left, right) {
  return Result.chain(Result.map(_2.default, right), left);
});

// isErr :: Result a b -> Bool
Result.isErr = function (result) {
  return result instanceof Result.Err;
};

// isOk :: Result a b -> Bool
Result.isOk = function (result) {
  return result instanceof Result.Ok;
};

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

/*
 |------------------------------------------------------------------------------
 | Fantasy Land
 |------------------------------------------------------------------------------
 */

// Result Applicative
Result[_fantasyLand2.default.of] = Result.of;

// Result Chain
Result[_fantasyLand2.default.chain] = Result.chain;
Result.prototype[_fantasyLand2.default.chain] = Result.prototype.chain;

// Result Functor
Result[_fantasyLand2.default.map] = Result.map;
Result.prototype[_fantasyLand2.default.map] = Result.prototype.map;

// Result Apply
Result[_fantasyLand2.default.ap] = Result.ap;
Result.prototype[_fantasyLand2.default.ap] = Result.prototype.ap;

// Ok Applicative
Result.Ok[_fantasyLand2.default.of] = Result.Ok.of;
Result.Ok.prototype[_fantasyLand2.default.of] = Result.Ok.prototype.of;

// Result.Ok Chain
Result.Ok[_fantasyLand2.default.chain] = Result.Ok.chain;
Result.Ok.prototype[_fantasyLand2.default.chain] = Result.Ok.prototype.chain;

// Result.Ok Functor
Result.Ok[_fantasyLand2.default.map] = Result.Ok.map;
Result.Ok.prototype[_fantasyLand2.default.map] = Result.Ok.prototype.map;

// Result.Ok Apply
Result.Ok[_fantasyLand2.default.ap] = Result.Ok.ap;
Result.Ok.prototype[_fantasyLand2.default.ap] = Result.Ok.prototype.ap;

// Err Applicative
Result.Err[_fantasyLand2.default.of] = Result.Err.of;
Result.Err.prototype[_fantasyLand2.default.of] = Result.Err.prototype.of;

// Result.Err Chain
Result.Err[_fantasyLand2.default.chain] = Result.Err.chain;
Result.Err.prototype[_fantasyLand2.default.chain] = Result.Err.prototype.chain;

// Result.Err Functor
Result.Err[_fantasyLand2.default.map] = Result.Err.map;
Result.Err.prototype[_fantasyLand2.default.map] = Result.Err.prototype.map;

// Result.Err Apply
Result.Err[_fantasyLand2.default.ap] = Result.Err.ap;
Result.Err.prototype[_fantasyLand2.default.ap] = Result.Err.prototype.ap;

module.exports = Result;