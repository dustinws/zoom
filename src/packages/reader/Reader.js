import __ from 'ramda/src/__';
import curry from 'ramda/src/curry';
import always from 'ramda/src/always';
import compose from 'ramda/src/compose';
import { tag, symbol } from '../adt';

/**
 * @class Reader
 * @description
 * #### Fantasy Land Implementations
 * `Applicative`, `Functor`, `Apply`, `Chain`, `Monad`
 *
 * ---
 * A `Reader` is way to do dependency injection. This makes it a great tool
 * for testing, since it is easy to mock stateful operations.
 */
const Reader = tag('Reader', 'run');


/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

/**
 * @description
 * Create a new reader that will return the given value.
 *
 * @since v1.0.2-beta
 * @memberof Reader
 * @function of
 * @static
 * @implements Applicative
 * @example
 * // of :: a -> Reader e a
 * import { Reader } from 'zoomjs';
 *
 * Reader.of('foo'); // Reader(null, foo)
 *
 * @param  {A} value The value to put in the Reader
 * @return {Reader<E, A>}
 */
Reader.of = value =>
  Reader(() => value);

/**
 * @description
 * Run multiple readers in sequence. The function given to `.chain` must return
 * a `Reader`.
 *
 * @since v1.0.2-beta
 * @memberof Reader
 * @function chain
 * @static
 * @implements Chain
 * @example
 * // chain :: (a -> Reader e b) -> Reader e a -> Reader e b
 * import { Reader } from 'zoomjs';
 *
 * // query :: String -> Reader Env [DbRow]
 * const query = sql =>
 *   Reader(env => env.db.query(sql));
 *
 * Reader.chain(query, Reader.of('Select * from "users";'));
 * // Reader(Env, [DbRow])
 *
 * @param  {function} transform The function to chain
 * @param  {Reader<E, A>} reader The reader instance
 * @return {Reader<E, B>}
 */
Reader.chain = curry((transform, reader) =>
  Reader(env => transform(reader.run(env)).run(env)));

/**
 * @description
 * Apply a function to the value held by a `Reader`. Returns a new `Reader`.
 *
 * @since v1.0.2-beta
 * @memberof Reader
 * @function map
 * @static
 * @implements Functor
 * @example
 * // map :: (a -> b) -> Reader e a -> Reader e b
 * import { Reader } from 'zoomjs';
 *
 * const reader = Reader.of('foo');
 *
 * Reader.map(x => x.toUpperCase(), reader);
 * // => Reader(null, FOO)
 *
 * @param  {function} transform The function to apply
 * @param  {Reader<E, A>} reader The reader instance
 * @return {Reader<E, B>}
 */
Reader.map = curry((transform, reader) =>
  Reader.chain(x => Reader.of(transform(x)), reader));

/**
 * @description
 * Apply a function to the value held by a `Reader`. Returns a new `Reader`.
 *
 * @since v1.0.2-beta
 * @memberof Reader
 * @function ap
 * @static
 * @implements Functor
 * @example
 * // ap :: Apply (a -> b) -> Reader e a -> Reader e b
 * import { Reader } from 'zoomjs';
 *
 * const reader = Reader.of('foo');
 * const toUpper = Reader.of(x => x.toUpperCase());
 *
 * Reader.ap(toUpper, reader);
 * // => Reader(null, FOO)
 *
 * @param  {Apply<function>} apply The apply instance.
 * @param  {Reader<E, A>} reader The reader instance
 * @return {Reader<E, B>}
 */
Reader.ap = curry((apply, reader) =>
  Reader.chain(Reader.map(__, reader), apply));


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

/**
 * @description
 * Run multiple readers in sequence. The function given to `.chain` must return
 * a `Reader`.
 *
 * @since v1.0.2-beta
 * @memberof Reader
 * @method
 * @instance
 * @implements Chain
 * @example
 * // chain Reader e a :: (a -> Reader e b) -> Reader e b
 * import { Reader } from 'zoomjs';
 *
 * // query :: String -> Reader Env [DbRow]
 * const query = sql =>
 *   Reader(env => env.db.query(sql));
 *
 * Reader.of('Select * from "users"').chain(query);
 * // Reader(Env, [DbRow])
 *
 * @param  {function} transform The function to chain
 * @return {Reader<E, B>}
 */
Reader.prototype.chain = function chain(transform) {
  return Reader.chain(transform, this);
};

/**
 * @description
 * Apply a function to the value held by a `Reader`. Returns a new `Reader`.
 *
 * @since v1.0.2-beta
 * @memberof Reader
 * @method
 * @instance
 * @implements Functor
 * @example
 * // map Reader e a :: (a -> b) -> Reader e b
 * import { Reader } from 'zoomjs';
 *
 * const reader = Reader.of('foo');
 *
 * reader.map(x => x.toUpperCase());
 * // => Reader(null, FOO)
 *
 * @param  {function} transform The function to apply
 * @return {Reader<E, B>}
 */
Reader.prototype.map = function map(transform) {
  return Reader.map(transform, this);
};

/**
 * @description
 * Apply a function to the value held by a `Reader`. Returns a new `Reader`.
 *
 * @since v1.0.2-beta
 * @memberof Reader
 * @method
 * @instance
 * @implements Functor
 * @example
 * // ap Reader e a :: Apply (a -> b) -> Reader e b
 * import { Reader } from 'zoomjs';
 *
 * const reader = Reader.of('foo');
 * const toUpper = Reader.of(x => x.toUpperCase());
 *
 * reaer.ap(toUpper);
 * // => Reader(null, FOO)
 *
 * @param  {Apply<function>} apply The apply instance.
 * @return {Reader<E, B>}
 */
Reader.prototype.ap = function ap(apply) {
  return Reader.ap(apply, this);
};


/*
 |------------------------------------------------------------------------------
 | Monad Transformer
 |------------------------------------------------------------------------------
 */

Reader.T = (M) => {
  /**
   * @class ReaderT
   * @description
   * The monad transformer for the `Reader` type. This is useful for 'stacking'
   * monads together to get more functionality.
   */
  const ReaderT = tag(`Reader[${M[symbol]}]`, 'run');

  /**
   * @description
   * `ReaderT.ask` returns a static `ReaderT` instance that you can pass
   * operations to.
   *
   * @since v1.0.2-beta
   * @memberof ReaderT
   * @constant ask
   * @static
   * @type {ReaderT<E, Monad<A>>}
   * @example
   * // ask :: Monad m => ReaderT e m a
   * import R from 'ramda';
   * import { Reader, Task } from 'zoomjs';
   *
   * const RTask = Reader.T(Task);
   *
   * RTask.ask.map(R.toUpper).run('foo'); // Task(null, foo)
   */
  ReaderT.ask = ReaderT(M.of);

  /**
   * @description
   * Lift an instance of the inner monad into a `ReaderT` and return it.
   *
   * @since v1.0.2-beta
   * @memberof ReaderT
   * @function lift
   * @static
   * @example
   * // lift :: Monad m => m a -> ReaderT e m a
   * import { Reader, Task } from 'zoomjs';
   * import fs from 'fs';
   *
   * const RTask = Reader.T(Task);
   *
   * const readFile = Task.liftNode(fs.readFile);
   *
   * ReaderT.ask
   *   .andThen(filepath =>
   *     RTask.lift(readFile(filepath)))
   *   .run('index.js');
   *
   * // => Task(Error, Buffer)
   *
   * @param  {Monad<A>} monad The monad to lift into the ReaderT. It must be
   *     the same type of monad that was used to create the ReaderT.
   * @return {ReaderT<E, Monad<A>>}
   */
  ReaderT.lift = compose(ReaderT, always);

  /**
   * @description
   * Lift a value into a `ReaderT`
   *
   * @since v1.0.2-beta
   * @memberof ReaderT
   * @function of
   * @static
   * @implements Applicative
   * @example
   * // of :: Monad m => a -> ReaderT e m a
   * import { Reader, Task } from 'zoomjs';
   *
   * const RTask = Reader.T(Task);
   *
   * RTask.of('foo'); // ReaderT(Env, Task(null, foo))
   *
   * @param  {A} value The value to put in the ReaderT
   * @return {ReaderT<E, Monad<A>>}
   */
  ReaderT.of = value =>
    ReaderT(() => M.of(value));

  /**
   * @description
   * Run another ReaderT after the current one is finished. An alias for {@link ReaderT.andThen}
   *
   * @since v1.0.2-beta
   * @memberof ReaderT
   * @see {@link ReaderT.andThen}
   * @method
   * @instance
   * @implements Chain
   * @example
   * // chain ReaderT e m a :: Monad m => (a -> ReaderT e m b) -> ReaderT e m b
   * import { Reader, Task } from 'zoomjs';
   *
   * const RTask = Reader.T(Task);
   *
   * RTask.ask.chain(n => ReaderT.of(n + n)).run(10);
   * // => ReaderT(10, Task(null, 20))
   *
   *
   * @param  {function} transform The function to run on the inner value.
   * @return {ReaderT<E, Monad<B>>}
   */
  ReaderT.prototype.chain = function chain(transform) {
    return ReaderT(e => this.run(e).chain(a => transform(a).run(e)));
  };

  /**
   * @description
   * Run another ReaderT after the current one is finished. An alias for {@link ReaderT.chain}
   *
   * @since v1.0.2-beta
   * @memberof ReaderT
   * @see {@link ReaderT.chain}
   * @method
   * @instance
   * @example
   * // andThen ReaderT e m a :: Monad m => (a -> ReaderT e m b) -> ReaderT e m b
   * import { Reader, Task } from 'zoomjs';
   *
   * const RTask = Reader.T(Task);
   *
   * RTask.ask.andThen(n => ReaderT.of(n + n)).run(10);
   * // => ReaderT(10, Task(null, 20))
   *
   *
   * @param  {function} transform The function to run on the inner value.
   * @return {ReaderT<E, Monad<B>>}
   */
  ReaderT.prototype.andThen = function andThen(transform) {
    return this.chain(transform);
  };

  /**
   * @description
   * Run a plain function on a value store in a `ReaderT`
   *
   * @since v1.0.2-beta
   * @memberof ReaderT
   * @method
   * @instance
   * @example
   * // map ReaderT e m a :: Monad m => (a -> b) -> ReaderT e m b
   * import { Reader, Task } from 'zoomjs';
   *
   * const RTask = Reader.T(Task);
   *
   * RTask.ask.map(n => n + n).run(10);
   * // => ReaderT(10, Task(null, 20))
   *
   *
   * @param  {function} transform The function to run on the inner value.
   * @return {ReaderT<E, Monad<B>>}
   */
  ReaderT.prototype.map = function map(transform) {
    return this.chain(x => ReaderT.of(transform(x)));
  };

  /**
   * @description
   * Run a function contained in an `Apply` on a value contained in a `ReaderT`
   *
   * @since v1.0.2-beta
   * @memberof ReaderT
   * @method
   * @instance
   * @example
   * // ap ReaderT e m a :: Monad m => Apply (a -> b) -> ReaderT e m b
   * import { Reader, Task } from 'zoomjs';
   *
   * const RTask = Reader.T(Task);
   *
   * RTask.ask.ap(ReaderT.of(n => n + n)).run(10);
   * // => ReaderT(10, Task(null, 20))
   *
   *
   * @param  {Apply<function>} apply An apply containing a function
   * @return {ReaderT<E, Monad<B>>}
   */
  ReaderT.prototype.ap = function ap(apply) {
    return ReaderT(e => this.run(e).ap(apply.run(e)));
  };

  return ReaderT;
};

export default Reader;
