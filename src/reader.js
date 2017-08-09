import fl from 'fantasy-land';
import __ from 'ramda/src/__';
import curry from 'ramda/src/curry';
import always from 'ramda/src/always';
import compose from 'ramda/src/compose';
import { tag, symbol } from './adt';


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

Reader.T = (M) => {
  const ReaderT = tag(`Reader[${M[symbol]}]`, 'run');

  // ask :: Monad m => ReaderT e m a
  ReaderT.ask = ReaderT(M.of);

  // lift :: Monad m => m a -> ReaderT e m a
  ReaderT.lift = compose(ReaderT, always);

  // of :: Monad m => a -> ReaderT e m a
  ReaderT.of = value =>
    ReaderT(() => M.of(value));

  // chain :: Monad m => ReaderT e m a ~> (a -> ReaderT e m b) -> ReaderT e m b
  ReaderT.prototype.chain = function chain(transform) {
    return ReaderT(e => this.run(e).chain(a => transform(a).run(e)));
  };

  // andThen :: Monad m => ReaderT e m a ~> (a -> ReaderT e m b) -> ReaderT e m b
  ReaderT.prototype.andThen = function andThen(transform) {
    return this.chain(transform);
  };

  // map :: Monad m => ReaderT e m a ~> (a -> b) -> ReaderT e m b
  ReaderT.prototype.map = function map(transform) {
    return this.chain(x => ReaderT.of(transform(x)));
  };

  // ap :: Monad m => ReaderT e m a ~> Apply (a -> b) -> ReaderT e m b
  ReaderT.prototype.ap = function ap(apply) {
    return ReaderT(e => this.run(e).ap(apply.run(e)));
  };

  // Reader Applicative
  ReaderT[fl.of] = ReaderT.of;

  // ReaderT Chain
  ReaderT.prototype[fl.chain] = ReaderT.prototype.chain;

  // ReaderT Functor
  ReaderT.prototype[fl.map] = ReaderT.prototype.map;

  // ReaderT Apply
  ReaderT.prototype[fl.ap] = ReaderT.prototype.ap;

  return ReaderT;
};


/*
 |------------------------------------------------------------------------------
 | Fantasy Land
 |------------------------------------------------------------------------------
 */

// Reader Applicative
Reader[fl.of] = Reader.of;

// Reader Chain
Reader[fl.chain] = Reader.chain;
Reader.prototype[fl.chain] = Reader.prototype.chain;

// Reader Functor
Reader[fl.map] = Reader.map;
Reader.prototype[fl.map] = Reader.prototype.map;

// Reader Apply
Reader[fl.ap] = Reader.ap;
Reader.prototype[fl.ap] = Reader.prototype.ap;


module.exports = Reader;
