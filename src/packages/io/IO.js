import __ from 'ramda/src/__';
import curry from 'ramda/src/curry';
import { tag } from '../adt';

/**
 * @class IO
 * @description
 * #### Fantasy Land Implementations
 * `Applicative`, `Functor`, `Apply`, `Chain`, `Monad`
 *
 * ---
 * `IO` is a way to run computations that cause external effects, such
 * as a database write.
 */
const IO = tag('IO', 'run');


/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

/**
 * @description
 * Create a new io that will return the given value.
 *
 * @since v1.0.2-beta
 * @memberof IO
 * @function of
 * @static
 * @implements Applicative
 * @example
 * // of :: a -> IO e a
 * import { IO } from 'zoomjs';
 *
 * IO.of('foo'); // IO(null, foo)
 *
 * @param  {A} value The value to put in the IO
 * @return {IO<E, A>}
 */
IO.of = value =>
  IO(() => value);

/**
 * @description
 * Run multiple ios in sequence. The function given to `.chain` must return
 * a `IO`.
 *
 * @since v1.0.2-beta
 * @memberof IO
 * @function chain
 * @static
 * @implements Chain
 * @example
 * // chain :: (a -> IO e b) -> IO e a -> IO e b
 * import { IO } from 'zoomjs';
 *
 * // query :: String -> IO Env [DbRow]
 * const query = sql =>
 *   IO(env => env.db.query(sql));
 *
 * IO.chain(query, IO.of('Select * from "users";'));
 * // IO(Env, [DbRow])
 *
 * @param  {function} transform The function to chain
 * @param  {IO<E, A>} io The io instance
 * @return {IO<E, B>}
 */
IO.chain = curry((transform, io) =>
  IO(env => transform(io.run(env)).run(env)));

/**
 * @description
 * Apply a function to the value held by a `IO`. Returns a new `IO`.
 *
 * @since v1.0.2-beta
 * @memberof IO
 * @function map
 * @static
 * @implements Functor
 * @example
 * // map :: (a -> b) -> IO e a -> IO e b
 * import { IO } from 'zoomjs';
 *
 * const io = IO.of('foo');
 *
 * IO.map(x => x.toUpperCase(), io);
 * // => IO(null, FOO)
 *
 * @param  {function} transform The function to apply
 * @param  {IO<E, A>} io The io instance
 * @return {IO<E, B>}
 */
IO.map = curry((transform, io) =>
  IO.chain(x => IO.of(transform(x)), io));

/**
 * @description
 * Apply a function to the value held by a `IO`. Returns a new `IO`.
 *
 * @since v1.0.2-beta
 * @memberof IO
 * @function ap
 * @static
 * @implements Functor
 * @example
 * // ap :: Apply (a -> b) -> IO e a -> IO e b
 * import { IO } from 'zoomjs';
 *
 * const io = IO.of('foo');
 * const toUpper = IO.of(x => x.toUpperCase());
 *
 * IO.ap(toUpper, io);
 * // => IO(null, FOO)
 *
 * @param  {Apply<function>} apply The apply instance.
 * @param  {IO<E, A>} io The io instance
 * @return {IO<E, B>}
 */
IO.ap = curry((apply, io) =>
  IO.chain(IO.map(__, io), apply));


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

/**
 * @description
 * Run multiple ios in sequence. The function given to `.chain` must return
 * a `IO`.
 *
 * @since v1.0.2-beta
 * @memberof IO
 * @method
 * @instance
 * @implements Chain
 * @example
 * // chain IO e a :: (a -> IO e b) -> IO e b
 * import { IO } from 'zoomjs';
 *
 * // query :: String -> IO Env [DbRow]
 * const query = sql =>
 *   IO(env => env.db.query(sql));
 *
 * IO.of('Select * from "users"').chain(query);
 * // IO(Env, [DbRow])
 *
 * @param  {function} transform The function to chain
 * @return {IO<E, B>}
 */
IO.prototype.chain = function chain(transform) {
  return IO.chain(transform, this);
};

/**
 * @description
 * Apply a function to the value held by a `IO`. Returns a new `IO`.
 *
 * @since v1.0.2-beta
 * @memberof IO
 * @method
 * @instance
 * @implements Functor
 * @example
 * // map IO e a :: (a -> b) -> IO e b
 * import { IO } from 'zoomjs';
 *
 * const io = IO.of('foo');
 *
 * io.map(x => x.toUpperCase());
 * // => IO(null, FOO)
 *
 * @param  {function} transform The function to apply
 * @return {IO<E, B>}
 */
IO.prototype.map = function map(transform) {
  return IO.map(transform, this);
};

/**
 * @description
 * Apply a function to the value held by a `IO`. Returns a new `IO`.
 *
 * @since v1.0.2-beta
 * @memberof IO
 * @method
 * @instance
 * @implements Functor
 * @example
 * // ap IO e a :: Apply (a -> b) -> IO e b
 * import { IO } from 'zoomjs';
 *
 * const io = IO.of('foo');
 * const toUpper = IO.of(x => x.toUpperCase());
 *
 * io.ap(toUpper);
 * // => IO(null, FOO)
 *
 * @param  {Apply<function>} apply The apply instance.
 * @return {IO<E, B>}
 */
IO.prototype.ap = function ap(apply) {
  return IO.ap(apply, this);
};

export default IO;
