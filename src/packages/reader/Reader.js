import __ from 'ramda/src/__';
import curry from 'ramda/src/curry';
import { tag } from '../adt';

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
 * @since v1.0.1-beta
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
 * @since v1.0.1-beta
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
 * @since v1.0.1-beta
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
 * @since v1.0.1-beta
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
 * @since v1.0.1-beta
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
 * @since v1.0.1-beta
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
 * @since v1.0.1-beta
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

export default Reader;
