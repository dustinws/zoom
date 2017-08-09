'use strict';

var _fantasyLand = require('fantasy-land');

var _fantasyLand2 = _interopRequireDefault(_fantasyLand);

var _ = require('ramda/src/__');

var _2 = _interopRequireDefault(_);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _adt = require('./adt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IO = (0, _adt.tag)('IO', 'run');

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// of :: a -> IO a
IO.of = function (value) {
  return IO(function () {
    return value;
  });
};

// chain :: (a -> IO b) -> IO a -> IO b
IO.chain = (0, _curry2.default)(function (transform, io) {
  return IO(function (env) {
    return transform(io.run(env)).run(env);
  });
});

// andThen :: (a -> IO b) -> IO a -> IO b
IO.andThen = IO.chain;

// map :: (a -> b) -> IO a -> IO b
IO.map = (0, _curry2.default)(function (transform, io) {
  return IO.chain(function (x) {
    return IO.of(transform(x));
  }, io);
});

// ap :: Apply (a -> b) -> IO a -> IO b
IO.ap = (0, _curry2.default)(function (apply, io) {
  return IO.chain(IO.map(_2.default, io), apply);
});

/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

// of :: IO a ~> b -> IO b
IO.prototype.of = function of(value) {
  return IO.of(value);
};

// chain :: IO a ~> (a -> IO b) -> IO b
IO.prototype.chain = function chain(transform) {
  return IO.chain(transform, this);
};

// andThen :: IO a ~> (a -> IO b) -> IO b
IO.prototype.andThen = IO.prototype.chain;

// map :: IO a ~> (a -> b) -> IO b
IO.prototype.map = function map(transform) {
  return IO.map(transform, this);
};

// ap :: IO a ~> Apply (a -> b) -> IO b
IO.prototype.ap = function ap(apply) {
  return IO.ap(apply, this);
};

/*
 |------------------------------------------------------------------------------
 | Fantasy Land
 |------------------------------------------------------------------------------
 */

// IO Applicative
IO[_fantasyLand2.default.of] = IO.of;
IO.prototype[_fantasyLand2.default.of] = IO.prototype.of;

// IO Chain
IO[_fantasyLand2.default.chain] = IO.chain;
IO.prototype[_fantasyLand2.default.chain] = IO.prototype.chain;

// IO Functor
IO[_fantasyLand2.default.map] = IO.map;
IO.prototype[_fantasyLand2.default.map] = IO.prototype.map;

// IO Apply
IO[_fantasyLand2.default.ap] = IO.ap;
IO.prototype[_fantasyLand2.default.ap] = IO.prototype.ap;

module.exports = IO;