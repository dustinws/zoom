import __ from 'ramda/src/__';
import curry from 'ramda/src/curry';
import Tuple from '../tuple';
import { tag } from '../adt';

/**
 * @class Writer
 * @description
 * #### Fantasy Land Implementations
 * `Applicative`, `Functor`, `Apply`, `Chain`, `Monad`
 *
 * ---
 * A `Writer` is way to attach metadata to function calls, such as
 * logging.
 */
const Writer = tag('Writer', 'value');


/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

/**
 * @description
 * Create a new writer that will return the given value.
 *
 * @since 2.6.0
 * @memberof Writer
 * @function of
 * @static
 * @implements Applicative
 * @example
 * // of :: a -> Writer w a
 * import { Writer } from 'zoomjs';
 *
 * Writer.of('foo'); // Writer(null, foo)
 *
 * @param  {A} value The value to put in the Writer
 * @return {Writer<E, A>}
 */
Writer.of = value =>
  Writer(Tuple(value, []));

/**
 * @description
 * Attach a new piece of metadata to a writer.
 *
 * @since 2.6.0
 * @memberof Writer
 * @function tell
 * @static
 * @example
 * // tell :: w -> Writer w a -> Writer w a
 * import { Writer } from 'zoomjs';
 *
 * Writer.tell('A log!', Writer.of('foo'));
 * // Writer(Tuple('foo', ['A log!']))
 *
 * @param  {A} value The value to put in the Writer
 * @return {Writer<E, A>}
 */
Writer.tell = curry((value, writer) =>
  Writer(Tuple(Tuple.fst(writer.value), Tuple.snd(writer.value).concat(value))));

/**
 * @description
 * Run multiple writers in sequence. The function given to `.chain` must return
 * a `Writer`.
 *
 * @since 2.6.0
 * @memberof Writer
 * @function chain
 * @static
 * @implements Chain
 * @example
 * // chain :: (a -> Writer w b) -> Writer w a -> Writer w b
 * import { Tuple, Writer } from 'zoomjs';
 *
 * // half :: Number -> Writer [String] Number
 * const half = n =>
 *   Writer(Tuple(n / 2, `I just halved ${n}.`));
 *
 * Writer.chain(half, Writer.of(10));
 * // Writer(Tuple(5, ['I just halved 10.']))
 *
 * @param  {function} transform The function to chain
 * @param  {Writer<W, A>} writer The writer instance
 * @return {Writer<W, B>}
 */
Writer.chain = curry((transform, writer) => {
  const [value, currentLogs] = writer.value;
  const [newVal, newLogs] = transform(value).value;

  return Writer(Tuple(newVal, currentLogs.concat(newLogs)));
});

/**
 * @description
 * Apply a function to the value held by a `Writer`. Returns a new `Writer`.
 *
 * @since 2.6.0
 * @memberof Writer
 * @function map
 * @static
 * @implements Functor
 * @example
 * // map :: (a -> b) -> Writer w a -> Writer w b
 * import { Writer } from 'zoomjs';
 *
 * const writer = Writer.of('foo');
 *
 * Writer.map(x => x.toUpperCase(), writer);
 * // => Writer(Tuple('FOO', []))
 *
 * @param  {function} transform The function to apply
 * @param  {Writer<W, A>} writer The writer instance
 * @return {Writer<W, B>}
 */
Writer.map = curry((transform, writer) =>
  Writer.chain(x => Writer.of(transform(x)), writer));

/**
 * @description
 * Apply a function to the value held by a `Writer`. Returns a new `Writer`.
 *
 * @since 2.6.0
 * @memberof Writer
 * @function ap
 * @static
 * @implements Functor
 * @example
 * // ap :: Apply (a -> b) -> Writer w a -> Writer w b
 * import { Writer } from 'zoomjs';
 *
 * const writer = Writer.of('foo');
 * const toUpper = x =>
 *  Writer(Tuple(x => x.toUpperCase(), `I just uppercased ${x}.`));
 *
 * Writer.ap(toUpper, writer);
 * // => Writer(Tuple('FOO', ['I just uppercased foo.']))
 *
 * @param  {Apply<function>} apply The apply instance.
 * @param  {Writer<W, A>} writer The writer instance
 * @return {Writer<W, B>}
 */
Writer.ap = curry((apply, writer) =>
  Writer.chain(Writer.map(__, writer), apply));


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */


/**
 * @description
 * Run multiple writers in sequence. The function given to `.chain` must return
 * a `Writer`.
 *
 * @since 2.6.0
 * @memberof Writer
 * @method
 * @instance
 * @implements Chain
 * @example
 * // chain Writer w a :: (a -> Writer w b) -> Writer w b
 * import { Writer } from 'zoomjs';
 *
 * // half :: Number -> Writer [String] Number
 * const half = n =>
 *   Writer(Tuple(n / 2, `I just halved ${n}.`));
 *
 * Writer.of(10).chain(half);
 * // Writer(Tuple(5, ['I just halved 10.']))
 *
 * @param  {function} transform The function to chain
 * @return {Writer<W, B>}
 */
Writer.prototype.chain = function chain(transform) {
  return Writer.chain(transform, this);
};

/**
 * @description
 * Attach a new piece of metadata to a writer.
 *
 * @since v2.6.0
 * @memberof Writer
 * @method
 * @instance
 * @example
 * // tell Writer w a :: w -> Writer w a
 * import { Writer } from 'zoomjs';
 *
 * Writer.of('foo').tell('A log!');
 * // Writer(Tuple('foo', ['A log!']))
 *
 * @param  {function} transform The function to chain
 * @return {Writer<W, B>}
 */
Writer.prototype.tell = function tell(log) {
  return Writer.tell(log, this);
};

/**
 * @description
 * Apply a function to the value held by a `Writer`. Returns a new `Writer`.
 *
 * @since 2.6.0
 * @memberof Writer
 * @method
 * @instance
 * @implements Functor
 * @example
 * // map Writer w a :: (a -> b) -> Writer w b
 * import { Writer } from 'zoomjs';
 *
 * const writer = Writer.of('foo');
 *
 * writer.map(x => x.toUpperCase());
 * // => Writer(Tuple('FOO', []))
 *
 * @param  {function} transform The function to apply
 * @return {Writer<W, B>}
 */
Writer.prototype.map = function map(transform) {
  return Writer.map(transform, this);
};

/**
 * @description
 * Apply a function to the value held by a `Writer`. Returns a new `Writer`.
 *
 * @since 2.6.0
 * @memberof Writer
 * @method
 * @instance
 * @implements Functor
 * @example
 * // ap Writer w a :: Apply (a -> b) -> Writer w b
 * import { Writer } from 'zoomjs';
 *
 * const writer = Writer.of('foo');
 * const toUpper = Writer.of(x => x.toUpperCase());
 *
 * reaer.ap(toUpper);
 * // => Writer(Tuple('FOO', []))
 *
 * @param  {Apply<function>} apply The apply instance.
 * @return {Writer<E, B>}
 */
Writer.prototype.ap = function ap(apply) {
  return Writer.ap(apply, this);
};

export default Writer;
