import __ from '../../lambda/__';
import { union } from '../../adt';
import curry from '../../lambda/curry';
import compose from '../../lambda/compose';
import constant from '../../lambda/constant';

const Maybe = union('Maybe', {
  Just: ['value'],
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
 * @memberof module:Zoom.Data.Maybe
 * @function of
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Maybe
 * @function Just.of
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Maybe
 * @function Nothing.of
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
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
 * subsequent transformations from being applied. An alias for
 * [Task.andThen](https://dustinws.github.io/zoom/module-Zoom.Data.Task.html#.andThen)
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @function chain
 * @see [Task.andThen](https://dustinws.github.io/zoom/module-Zoom.Data.Task.html#.andThen)
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
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
    Nothing: constant(maybe),
    Just: transform,
  }));

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Just' to 'Nothing' instance and stop
 * subsequent transformations from being applied. An alias for
 * [Task.chain](https://dustinws.github.io/zoom/module-Zoom.Data.Task.html#.chain)
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @function andThen
 * @see [Task.chain](https://dustinws.github.io/zoom/module-Zoom.Data.Task.html#.chain)
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @function map
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @function ap
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @function isNothing
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @function isJust
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Maybe
 * @function fromNullable
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
 *
 * Maybe.fromNullable(''); // Just('')
 * Maybe.fromNullable(null); // Nothing
 * Maybe.fromNullable(); // Nothing
 *
 * @param  {Any} value
 * @return {Maybe}
 */
Maybe.fromNullable = (value) => {
  if (value === null || value === undefined) {
    return Maybe.Nothing;
  }

  return Maybe.Just.of(value);
};


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
 * An alias for [Maybe#caseOf](https://dustinws.github.io/zoom/module-Zoom.Data.Maybe.html#.Maybe#caseOf)
 * @memberof module:Zoom.Data.Maybe
 * @since v1.0.0
 * @function
 * @see [Maybe#caseOf](https://dustinws.github.io/zoom/module-Zoom.Data.Maybe.html#.Maybe#caseOf)
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
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
 * @param  {Object} cases The cases to match against.
 * @return {Maybe}
 */
Maybe.prototype.cata = Maybe.prototype.cata;

/**
 * @description A function that accepts an object with two functions, one
 * to run if the either is an instance of `Just`, and one to run if the
 * either is an instance of `Nothing`. The return value will be returned
 * directly, with no wrapper instance. An alias for
 * [Maybe#cata](https://dustinws.github.io/zoom/module-Zoom.Data.Maybe.html#.Maybe#cata)
 * @memberof module:Zoom.Data.Maybe
 * @since v1.0.0
 * @function
 * @see [Maybe#cata](https://dustinws.github.io/zoom/module-Zoom.Data.Maybe.html#.Maybe#cata)
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
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
 * @param  {Object} cases The cases to match against.
 * @return {Maybe}
 */
Maybe.prototype.caseOf = Maybe.prototype.cata;

/**
 * @description Lift a value into a successful 'Just' context.
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
 *
 * const val = Maybe.Just.of(1);
 *
 * val.toString() // 'Just(1)'
 *
 * @param  {Any} value The value to put in the Maybe
 * @return {Maybe}
 */
Just.prototype.of = function of(value) {
  return Just(value);
};

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Just' to 'Nothing' instance and stop
 * subsequent transformations from being applied. An alias for
 * [Task#andThen](https://dustinws.github.io/zoom/module-Zoom.Data.Task.html#.Task#andThen)
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @see [Task#andThen](https://dustinws.github.io/zoom/module-Zoom.Data.Task.html#.Task#andThen)
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
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
 * subsequent transformations from being applied. An alias for
 * [Task#chain](https://dustinws.github.io/zoom/module-Zoom.Data.Task.html#.Task#chain)
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @see [Task#chain](https://dustinws.github.io/zoom/module-Zoom.Data.Task.html#.Task#chain)
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
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
 * @return {Maybe}
*/
Maybe.prototype.andThen = function andThen(transform) {
  return Maybe.chain(transform, this);
};

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/data';
 *
 * Maybe.Just.of().isJust(); // true
 * Maybe.Nothing.isJust(); // false
 *
 * @return {Boolean}
 */
Maybe.prototype.isJust = function isJust() {
  return Maybe.isJust(this);
};

export default Maybe;
