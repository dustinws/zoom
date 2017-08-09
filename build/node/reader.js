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

var Reader = (0, _adt.tag)('Reader', 'run');

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// of :: a -> Reader e a
Reader.of = function (value) {
  return Reader(function () {
    return value;
  });
};

// chain :: (a -> Reader e b) -> Reader e a -> Reader e b
Reader.chain = (0, _curry2.default)(function (transform, reader) {
  return Reader(function (env) {
    return transform(reader.run(env)).run(env);
  });
});

// andThen :: (a -> Reader e b) -> Reader e a -> Reader e b
Reader.andThen = Reader.chain;

// map :: (a -> b) -> Reader e a -> Reader e b
Reader.map = (0, _curry2.default)(function (transform, reader) {
  return Reader.chain(function (x) {
    return Reader.of(transform(x));
  }, reader);
});

// ap :: Apply (a -> b) -> Reader e a -> Reader e b
Reader.ap = (0, _curry2.default)(function (apply, reader) {
  return Reader.chain(Reader.map(_2.default, reader), apply);
});

/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

// chain :: Reader e a ~> (a -> Reader e b) -> Reader e b
Reader.prototype.chain = function chain(transform) {
  return Reader.chain(transform, this);
};

// andThen :: Reader e a ~> (a -> Reader e b) -> Reader e b
Reader.prototype.andThen = Reader.prototype.andThen;

// map :: Reader e a ~> (a -> b) -> Reader e b
Reader.prototype.map = function map(transform) {
  return Reader.map(transform, this);
};

// ap :: Reader e a ~> Apply (a -> b) -> Reader e b
Reader.prototype.ap = function ap(apply) {
  return Reader.ap(apply, this);
};

/*
 |------------------------------------------------------------------------------
 | Monad Transformer
 |------------------------------------------------------------------------------
 */

Reader.T = function (M) {
  var ReaderT = (0, _adt.tag)('Reader[' + M[_adt.symbol] + ']', 'run');

  // ask :: Monad m => ReaderT e m a
  ReaderT.ask = ReaderT(M.of);

  // lift :: Monad m => m a -> ReaderT e m a
  ReaderT.lift = (0, _compose2.default)(ReaderT, _always2.default);

  // of :: Monad m => a -> ReaderT e m a
  ReaderT.of = function (value) {
    return ReaderT(function () {
      return M.of(value);
    });
  };

  // chain :: Monad m => ReaderT e m a ~> (a -> ReaderT e m b) -> ReaderT e m b
  ReaderT.prototype.chain = function chain(transform) {
    var _this = this;

    return ReaderT(function (e) {
      return _this.run(e).chain(function (a) {
        return transform(a).run(e);
      });
    });
  };

  // andThen :: Monad m => ReaderT e m a ~> (a -> ReaderT e m b) -> ReaderT e m b
  ReaderT.prototype.andThen = function andThen(transform) {
    return this.chain(transform);
  };

  // map :: Monad m => ReaderT e m a ~> (a -> b) -> ReaderT e m b
  ReaderT.prototype.map = function map(transform) {
    return this.chain(function (x) {
      return ReaderT.of(transform(x));
    });
  };

  // ap :: Monad m => ReaderT e m a ~> Apply (a -> b) -> ReaderT e m b
  ReaderT.prototype.ap = function ap(apply) {
    var _this2 = this;

    return ReaderT(function (e) {
      return _this2.run(e).ap(apply.run(e));
    });
  };

  // Reader Applicative
  ReaderT[_fantasyLand2.default.of] = ReaderT.of;

  // ReaderT Chain
  ReaderT.prototype[_fantasyLand2.default.chain] = ReaderT.prototype.chain;

  // ReaderT Functor
  ReaderT.prototype[_fantasyLand2.default.map] = ReaderT.prototype.map;

  // ReaderT Apply
  ReaderT.prototype[_fantasyLand2.default.ap] = ReaderT.prototype.ap;

  return ReaderT;
};

/*
 |------------------------------------------------------------------------------
 | Fantasy Land
 |------------------------------------------------------------------------------
 */

// Reader Applicative
Reader[_fantasyLand2.default.of] = Reader.of;

// Reader Chain
Reader[_fantasyLand2.default.chain] = Reader.chain;
Reader.prototype[_fantasyLand2.default.chain] = Reader.prototype.chain;

// Reader Functor
Reader[_fantasyLand2.default.map] = Reader.map;
Reader.prototype[_fantasyLand2.default.map] = Reader.prototype.map;

// Reader Apply
Reader[_fantasyLand2.default.ap] = Reader.ap;
Reader.prototype[_fantasyLand2.default.ap] = Reader.prototype.ap;

module.exports = Reader;