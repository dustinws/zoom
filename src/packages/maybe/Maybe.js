import __ from 'ramda/src/__';
import curry from 'ramda/src/curry';
import always from 'ramda/src/always';
import compose from 'ramda/src/compose';
import { union } from '../adt';

/**
 * @class Maybe
 * @abstract
 * @description
 * #### Fantasy Land Implementations
 * `Applicative`, `Functor`, `Apply`, `Chain`, `Monad`
 *
 * ---
 * In Javascript, we ususally represent the absence of a value by using the
 * `null` primitive. `null` is troubled though, and can do much more harm than
 * good if used incorrectly. For some interesting history on what the creators
 * of `null` think about their invention, check out
 * [this stackoverflow thread](https://softwareengineering.stackexchange.com/questions/237697/if-null-is-bad-why-do-modern-languages-implement-it).
 *
 * Languages like `haskell`, `elm`, and `scala` trade in the concept of null
 * for an abstract data type called `Maybe` <small>(Or `Option` for scala)</small>.
 *
 * The `Maybe` type is very similar to the [null object pattern](https://en.wikipedia.org/wiki/Null_Object_pattern),
 * but in a much more generic way that isn't bound to any single type.
 *
 * Using `Maybe` allows users to give up null checks entirely, and instead
 * be explicit about existence _on the type level_. `Maybe` is a union type
 * for the `Just` and `Nothing` constructors. `Just` is used to represent a
 * value that exists, while `Nothing` represents a value that does not. `Just`
 * and `Nothing` have the exact same api, the magic is in how each one is
 * implemented. When you send operations to `Just`, it'll run them on whatever
 * value it's holding. Since `Nothing` doesn't store a value, it'll ignore
 * the operations you send it.
 *
 * If you're familiar with the `Promise` type, then you probably love how you
 * can call `.then` all day long and then handle your errors at the end in a
 * single `.catch` statement. `Maybe` works in the exact same way, except it
 * deals with null values instead of async operations.
 *
 * @example
 * // Some deeply nested api response where any key could be null.
 * const data = {
 *   location: {
 *     address: {
 *       streetNumber: '43',
 *     },
 *   },
 * };
 *
 * // With regular null checking
 * function getStreetNumber(data, defaultValue) {
 *   if (data.location != null) {
 *     if (data.location.address != null) {
 *       if (data.location.address.streetNumber != null) {
 *         return data.location.address.streetNumber;
 *       }
 *       return defaultValue;;
 *     }
 *     return defaultValue;;
 *   }
 *   return defaultValue;;
 * }
 *
 * getStreetNumber(data, 'No Address'); // '43'
 * getStreetNumber({}, 'No Address') // 'No Address'
 *
 *
 *
 * // With Maybe
 * import { Maybe } from 'zoomjs';
 *
 * // A curried helper for null safe property lookups
 * const get = key => obj =>
 *   Maybe.fromNullable(obj[key]);
 *
 * function getStreetNumber(data, defaultValue) {
 *   return Maybe.of(data)
 *     .andThen(get('location'))
 *     .andThen(get('address'))
 *     .andThen(get('streetNumber'))
 *     .withDefault(defaultValue);
 * }
 *
 * getStreetNumber(data, 'No Address'); // '43'
 * getStreetNumber({}, 'No Addres'); // 'No Address'
 */
const Maybe = union('Maybe', {
  /**
   * @class Maybe.Just
   * @extends Maybe
   */
  Just: ['value'],

  /**
   * @class Maybe.Nothing
   * @extends Maybe
   */
  Nothing: [],
});

const Just = Maybe.Just;
const Nothing = Maybe.Nothing;


/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Lift a value into a successful 'Just' context.
 * @memberof Maybe
 * @function of
 * @static
 * @implements Applicative
 * @since v1.15.0
 * @example
 * // of :: a -> Maybe a
 * import { Maybe } from 'zoomjs';
 *
 * const val = Maybe.of(1);
 *
 * val.toString() // 'Just(1)'
 *
 * @param  {Any} value The value to put in the Maybe
 * @return {Maybe}
 */
Maybe.of = function of(value) {
  return Just(value);
};

/**
 * @description Lift a value into a successful 'Just' context.
 * @memberof Just
 * @function of
 * @static
 * @since v1.15.0
 * @implements Applicative
 * @example
 * // of :: a -> Maybe a
 * import { Maybe } from 'zoomjs';
 *
 * const val = Maybe.Just.of(1);
 *
 * val.toString() // 'Just(1)'
 *
 * @param  {Any} value The value to put in the Maybe
 * @return {Maybe}
 */
Just.of = function of(value) {
  return Just(value);
};

/**
 * @description Lift a value into a 'Nothing' context. Any value
 * passed will be ignored.
 * @memberof Nothing
 * @function of
 * @static
 * @implements Applicative
 * @since v1.15.0
 * @example
 * // of :: a -> Maybe a
 * import { Maybe } from 'zoomjs';
 *
 * const val = Maybe.Nothing.of(1);
 *
 * val.toString() // 'Nothing'
 *
 * @param  {Any} value The value to put in the Maybe
 * @return {Maybe}
 */
Nothing.of = function of() {
  return Maybe.Nothing;
};

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Just' to 'Nothing' instance and stop
 * subsequent transformations from being applied. An alias for {@link Maybe.andThen}
 * @memberof Maybe
 * @since v1.15.0
 * @function chain
 * @static
 * @implements Chain
 * @see {@link Maybe.andThen}
 * @example
 * // chain :: (a -> Maybe b) -> Maybe a -> Maybe b
 * import { Maybe } from 'zoomjs';
 *
 * const valid = Maybe.Just.of('yay!');
 * const invalid = Maybe.Nothing;
 *
 * const toUpper = x => Maybe.Just.of(x.toUpperCase());
 *
 * Maybe.chain(toUpper, valid); // Just('YAY!')
 * Maybe.chain(toUpper, invalid); // Nothing
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @param  {Maybe} maybe The maybe
 * @return {Maybe}
 */
Maybe.chain = curry((transform, maybe) =>
  maybe.cata({
    Nothing: always(maybe),
    Just: transform,
  }));

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Just' to 'Nothing' instance and stop
 * subsequent transformations from being applied. An alias for {@link Maybe.chain}
 * @memberof Maybe
 * @since v1.15.0
 * @function andThen
 * @static
 * @see {@link Maybe.chain}
 * @example
 * // andThen :: (a -> Maybe b) -> Maybe a -> Maybe b
 * import { Maybe } from 'zoomjs';
 *
 * const valid = Maybe.Just.of('yay!');
 * const invalid = Maybe.Nothing;
 *
 * const toUpper = x => Maybe.Just.of(x.toUpperCase());
 *
 * Maybe.andThen(toUpper, valid); // Just('YAY!')
 * Maybe.andThen(toUpper, invalid); // Nothing
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @param  {Maybe} maybe The maybe
 * @return {Maybe}
 */
Maybe.andThen = Maybe.chain;

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * @memberof Maybe
 * @since v1.15.0
 * @function map
 * @static
 * @implements Functor
 * @example
 * // map :: (a -> b) -> Maybe a -> Maybe b
 * import { Maybe } from 'zoomjs';
 *
 * const valid = Maybe.Just.of('yay!');
 * const failure = Maybe.Nothing;
 *
 * const toUpper = x => x.toUpperCase();
 *
 * Maybe.map(toUpper, valid); // Just('YAY!')
 * Maybe.map(toUpper, invalid); // Nothing
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @param  {Maybe} maybe The maybe
 * @return {Maybe}
 */
Maybe.map = curry((transform, maybe) =>
  Maybe.chain(compose(Maybe.of, transform), maybe));

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * @memberof Maybe
 * @since v1.15.0
 * @function ap
 * @static
 * @implements Apply
 * @example
 * // ap :: Apply (a -> b) -> Maybe a -> Maybe b
 * import { Maybe } from 'zoomjs';
 *
 * const valid = Maybe.Just.of('yay!');
 * const failure = Maybe.Nothing;
 *
 * const toUpper = Maybe.of(x => x.toUpperCase());
 *
 * Maybe.ap(toUpper, valid); // Just('YAY!')
 * Maybe.ap(toUpper, invalid); // Nothing
 *
 * @param  {Maybe} left The maybe containing a function to run on the value
 * @param  {Maybe} right The maybe containing a value
 * @return {Maybe}
 */
Maybe.ap = curry((left, right) =>
  Maybe.chain(Maybe.map(__, right), left));

/**
 * @description Determine if an Maybe is an instance of Nothing
 * @memberof Maybe
 * @since v1.15.0
 * @function isNothing
 * @static
 * @example
 * // isNothing :: Maybe a -> Bool
 * import { Maybe } from 'zoomjs';
 *
 * Maybe.isNothing(Maybe.Nothing); // true
 * Maybe.isNothing(Maybe.Just.of(1)); // false
 *
 * @param  {Maybe} maybe The maybe to query
 * @return {Boolean}
 */
Maybe.isNothing = maybe => maybe === Maybe.Nothing;

/**
 * @description Determine if an Maybe is an instance of Just
 * @memberof Maybe
 * @since v1.15.0
 * @function isJust
 * @static
 * @example
 * // isJust :: Maybe a -> Bool
 * import { Maybe } from 'zoomjs';
 *
 * Maybe.isJust(Maybe.Just.of(1)); // true
 * Maybe.isJust(Maybe.Nothing); // false
 *
 * @param  {Maybe} maybe The maybe to query
 * @return {Boolean}
 */
Maybe.isJust = maybe => maybe instanceof Maybe.Just;

/**
 * @description Create a maybe from a potentially null value.
 * @since v1.15.0
 * @memberof Maybe
 * @function fromNullable
 * @static
 * @example
 * // fromNullable :: a -> Maybe a
 * import { Maybe } from 'zoomjs';
 *
 * Maybe.fromNullable(''); // Just('')
 * Maybe.fromNullable(null); // Nothing
 * Maybe.fromNullable(); // Nothing
 *
 * @param  {B} value
 * @return {Maybe<B>}
 */
Maybe.fromNullable = (value) => {
  if (value === null || value === undefined) {
    return Maybe.Nothing;
  }

  return Maybe.Just.of(value);
};

/**
 * @description Extract the value from a Maybe, with a default value in
 * case it is `Nothing`.
 * @since v2.1.0
 * @memberof Maybe
 * @function withDefault
 * @static
 * @example
 * // withDefault :: a -> Maybe a -> a
 * import { Maybe } from 'zoomjs';
 *
 * Maybe.withDefault('bar', Maybe.Nothing); // 'bar'
 * Maybe.withDefault('bar', Maybe.Just('foo')); // 'foo'
 *
 * @param  {Any} defaultValue The value to default to
 * @param  {Maybe} maybe The maybe instance
 * @return {Any}
 */
Maybe.withDefault = curry((defaultValue, maybe) =>
  maybe.cata({
    Just: value => value,
    Nothing: () => defaultValue,
  }));


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

/**
 * @description A function that accepts an object with two functions, one
 * to run if the either is an instance of `Just`, and one to run if the
 * either is an instance of `Nothing`. The return value will be returned
 * directly, with no wrapper instance. This name is short for `catamorphism`.
 * An alias for {@link Maybe#caseOf}
 * @memberof Maybe
 * @since v1.0.0
 * @method
 * @instance
 * @see {@link Maybe#caseOf}
 * @example
 * // cata Maybe a :: { Nothing: a -> b, Just: a -> b } -> b
 * import { Maybe } from 'zoomjs';
 *
 * Maybe.Just.of('foobar').cata({
 *   Just(foobar) {
 *     // Do stuff with foobar
 *   },
 *
 *   Nothing() {
 *     // Do stuff
 *   },
 * });
 *
 * @this Maybe
 * @param  {object} cases `{ Nothing: a -> b, Just: a -> b }`
 * @param  {function} cases.Nothing The `Nothing` case
 * @param  {function} cases.Just The `Just` case
 * @return {B}
 */
Maybe.prototype.cata = Maybe.prototype.cata;

/**
 * @description A function that accepts an object with two functions, one
 * to run if the either is an instance of `Just`, and one to run if the
 * either is an instance of `Nothing`. The return value will be returned
 * directly, with no wrapper instance. An alias for {@link Maybe#cata}
 * @memberof Maybe
 * @since v1.0.0
 * @method
 * @instance
 * @see {@link Maybe#cata}
 * @example
 * // caseOf Maybe a :: { Nothing: a -> b, Just: a -> b } -> b
 * import { Maybe } from 'zoomjs';
 *
 * Maybe.Just.of('foobar').caseOf({
 *   Just(foobar) {
 *     // Do stuff with foobar
 *   },
 *
 *   Nothing() {
 *     // Do stuff
 *   },
 * });
 *
 * @this Maybe
 * @param  {object} cases `{ Nothing: a -> b, Just: a -> b }`
 * @param  {function} cases.Nothing The `Nothing` case
 * @param  {function} cases.Just The `Just` case
 * @return {B}
 */
Maybe.prototype.caseOf = Maybe.prototype.cata;

/**
 * @description Lift a value into a successful 'Just' context.
 * @memberof Maybe
 * @method
 * @instance
 * @implements Applicative
 * @since v1.15.0
 * @example
 * // of Maybe a :: b -> Maybe b
 * import { Maybe } from 'zoomjs';
 *
 * const val = Maybe.Just.of(1);
 *
 * val.toString() // 'Just(1)'
 *
 * @param  {A} value The value to put in the Maybe
 * @return {Maybe<A>}
 */
Just.prototype.of = function of(value) {
  return Just(value);
};

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Just' to 'Nothing' instance and stop
 * subsequent transformations from being applied. An alias for {@link Maybe#andThen}
 * @memberof Maybe
 * @since v1.15.0
 * @method
 * @instance
 * @implements Chain
 * @see {@link Maybe#andThen}
 * @example
 * // chain Maybe a :: (a -> Maybe b) -> Maybe b
 * import { Maybe } from 'zoomjs';
 *
 * const valid = Maybe.Just.of('yay!');
 * const invalid = Maybe.Nothing;
 *
 * const toUpper = x => Maybe.Just.of(x.toUpperCase());
 *
 * valid.chain(toUpper); // Just('YAY!')
 * invalid.chain(toUpper); // Nothing
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @return {Maybe}
*/
Maybe.prototype.chain = function chain(transform) {
  return Maybe.chain(transform, this);
};

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Just' to 'Nothing' instance and stop
 * subsequent transformations from being applied. An alias for {@link Maybe#chain}
 * @memberof Maybe
 * @since v1.15.0
 * @method
 * @instance
 * @see {@link Maybe#chain}
 * @example
 * // andThen Maybe a :: (a -> Maybe b) -> Maybe b
 * import { Maybe } from 'zoomjs';
 *
 * const valid = Maybe.Just.of('yay!');
 * const invalid = Maybe.Nothing;
 *
 * const toUpper = x => Maybe.Just.of(x.toUpperCase());
 *
 * valid.andThen(toUpper); // Just('YAY!')
 * invalid.andThen(toUpper); // Nothing
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @return {Maybe<B>}
*/
Maybe.prototype.andThen = function andThen(transform) {
  return Maybe.chain(transform, this);
};

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * @memberof Maybe
 * @since v1.15.0
 * @method
 * @instance
 * @implements Functor
 * @example
 * // map Maybe a :: (a -> b) -> Maybe b
 * import { Maybe } from 'zoomjs';
 *
 * const valid = Maybe.Just.of('yay!');
 * const failure = Maybe.Nothing;
 *
 * const toUpper = x => x.toUpperCase();
 *
 * valid.map(toUpper); // Just('YAY!')
 * invalid.map(toUpper); // Nothing
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @return {Maybe}
 */
Maybe.prototype.map = function map(transform) {
  return Maybe.map(transform, this);
};

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * @memberof Maybe
 * @since v1.15.0
 * @method
 * @instance
 * @implements Apply
 * @example
 * // ap Maybe a :: Apply (a -> b) -> Maybe b
 * import { Maybe } from 'zoomjs';
 *
 * const valid = Maybe.Just.of('yay!');
 * const failure = Maybe.Nothing;
 *
 * const toUpper = Maybe.of(x => x.toUpperCase());
 *
 * valid.ap(toUpper); // Just('YAY!')
 * invalid.ap(toUpper); // Nothing
 *
 * @param  {Maybe} applyt A maybe containing a function to run on the value
 * @return {Maybe}
 */
Maybe.prototype.ap = function ap(transform) {
  return Maybe.ap(transform, this);
};

/**
 * @description Determine if an Maybe is an instance of Nothing
 * @memberof Maybe
 * @since v1.15.0
 * @method
 * @instance
 * @example
 * // isNothing Maybe a :: b -> Bool
 * import { Maybe } from 'zoomjs';
 *
 * Maybe.Nothing.isNothing(); // true
 * Maybe.Just.of().isNothing(); // false
 *
 * @return {Boolean}
 */
Maybe.prototype.isNothing = function isNothing() {
  return Maybe.isNothing(this);
};

/**
 * @description Determine if an Maybe is an instance of Just
 * @memberof Maybe
 * @since v1.15.0
 * @example
 * // isJust Maybe a :: b -> Bool
 * import { Maybe } from 'zoomjs';
 *
 * Maybe.Just.of().isJust(); // true
 * Maybe.Nothing.isJust(); // false
 *
 * @return {Boolean}
 */
Maybe.prototype.isJust = function isJust() {
  return Maybe.isJust(this);
};

/**
 * @description Extract the value from a Maybe, with a default value in
 * case it is `Nothing`.
 * @since v2.1.0
 * @memberof Maybe
 * @method
 * @instance
 * @function
 * @example
 * // withDefault Maybe a :: a -> a
 * import { Maybe } from 'zoomjs';
 *
 * Maybe.Nothing.withDefault('bar'); // 'bar'
 * Maybe.Just('foo').withDefault('bar'); // 'foo'
 *
 * @param  {Any} defaultValue The value to default to
 * @return {Any}
 */
Maybe.prototype.withDefault = function withDefault(value) {
  return Maybe.withDefault(value, this);
};

export default Maybe;