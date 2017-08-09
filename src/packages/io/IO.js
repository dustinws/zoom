import __ from 'ramda/src/__';
import curry from 'ramda/src/curry';
import { tag } from '../adt';


const IO = tag('IO', 'run');


/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// of :: a -> IO a
IO.of = value =>
  IO(() => value);

// chain :: (a -> IO b) -> IO a -> IO b
IO.chain = curry((transform, io) =>
  IO(env => transform(io.run(env)).run(env)));

// andThen :: (a -> IO b) -> IO a -> IO b
IO.andThen = IO.chain;

// map :: (a -> b) -> IO a -> IO b
IO.map = curry((transform, io) =>
  IO.chain(x => IO.of(transform(x)), io));

// ap :: Apply (a -> b) -> IO a -> IO b
IO.ap = curry((apply, io) =>
  IO.chain(IO.map(__, io), apply));


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

export default IO;
