const FL = require('fantasy-land');

const { tag, symbol } = require('./adt');
const { __, curry, always, compose } = require('./_tools');


const Reader = tag('Reader', 'run');


/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// of :: a -> Reader e a
Reader.of = value =>
  Reader(() => value);

// chain :: (a -> Reader e b) -> Reader e a -> Reader e b
Reader.chain = curry((transform, reader) =>
  Reader(env => transform(reader.run(env)).run(env)));

// andThen :: (a -> Reader e b) -> Reader e a -> Reader e b
Reader.andThen = Reader.chain;

// map :: (a -> b) -> Reader e a -> Reader e b
Reader.map = curry((transform, reader) =>
  Reader.chain(x => Reader.of(transform(x)), reader));

// ap :: Apply (a -> b) -> Reader e a -> Reader e b
Reader.ap = curry((apply, reader) =>
  Reader.chain(Reader.map(__, reader), apply));


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

// of :: reader e a ~> b -> Either f b
Reader.prototype.of = function of(value) {
  return Reader.of(value);
};

// chain :: Reader e a ~> (a -> Reader e b) -> Reader e b
Reader.prototype.chain = function chain(transform) {
  return Reader.chain(transform, this);
};

// andThen :: Reader e a ~> (a -> Reader e b) -> Reader e b
Reader.prototype.andThen = Reader.prototype.chain;

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

Reader.T = (M) => {
  const ReaderT = tag(`Reader[${M[symbol]}]`, 'run');

  // Static
  // ------

  // ask :: Monad m => ReaderT e m a
  ReaderT.ask = ReaderT(M.of);

  // lift :: Monad m => m a -> ReaderT e m a
  ReaderT.lift = compose(ReaderT, always);

  // of :: Monad m => a -> ReaderT e m a
  ReaderT.of = value =>
    ReaderT(() => M.of(value));

  // chain :: Monad m => (a -> ReaderT e m b) -> ReaderT e m a -> ReaderT e m b
  ReaderT.chain = curry((callback, readerT) =>
    ReaderT(e => readerT.run(e).chain(a => callback(a).run(e))));

  // andThen :: Monad m => (a -> ReaderT e m b) -> ReaderT e m a -> ReaderT e m b
  ReaderT.andThen = ReaderT.chain;

  // map :: Monad m => (a -> b) -> ReaderT e m a -> ReaderT e m b
  ReaderT.map = curry((callback, readerT) =>
    readerT.chain(x => ReaderT.of(callback(x))));

  // ap :: Monad m => Apply (a -> b) -> ReaderT e m a -> ReaderT e m b
  ReaderT.ap = curry((apply, readerT) =>
    ReaderT(e => readerT.run(e).ap(apply.run(e))));


  // Instance
  // --------

  // of :: Monad m => ReaderT e m a ~> b -> ReaderT f m b
  ReaderT.prototype.of = function of(value) {
    return ReaderT.of(value);
  };

  // chain :: Monad m => ReaderT e m a ~> (a -> ReaderT e m b) -> ReaderT e m b
  ReaderT.prototype.chain = function chain(callback) {
    return ReaderT.chain(callback, this);
  };

  // andThen :: Monad m => ReaderT e m a ~> (a -> ReaderT e m b) -> ReaderT e m b
  ReaderT.prototype.andThen = ReaderT.prototype.chain;

  // map :: Monad m => ReaderT e m a ~> (a -> b) -> ReaderT e m b
  ReaderT.prototype.map = function map(callback) {
    return ReaderT.map(callback, this);
  };

  // ap :: Monad m => ReaderT e m a ~> Apply (a -> b) -> ReaderT e m b
  ReaderT.prototype.ap = function ap(apply) {
    return ReaderT.ap(apply, this);
  };


  // Static Monad
  ReaderT[FL.of] = ReaderT.of;
  ReaderT[FL.chain] = ReaderT.chain;
  ReaderT[FL.map] = ReaderT.map;
  ReaderT[FL.ap] = ReaderT.ap;

  // Instance Monad
  ReaderT.prototype[FL.of] = ReaderT.prototype.of;
  ReaderT.prototype[FL.chain] = ReaderT.prototype.chain;
  ReaderT.prototype[FL.map] = ReaderT.prototype.map;
  ReaderT.prototype[FL.ap] = ReaderT.prototype.ap;


  return ReaderT;
};


/*
 |------------------------------------------------------------------------------
 | Fantasy Land
 |------------------------------------------------------------------------------
 */

// Reader Applicative
Reader[FL.of] = Reader.of;
Reader.prototype[FL.of] = Reader.prototype.of;

// Reader Chain
Reader[FL.chain] = Reader.chain;
Reader.prototype[FL.chain] = Reader.prototype.chain;

// Reader Functor
Reader[FL.map] = Reader.map;
Reader.prototype[FL.map] = Reader.prototype.map;

// Reader Apply
Reader[FL.ap] = Reader.ap;
Reader.prototype[FL.ap] = Reader.prototype.ap;


module.exports = Reader;
