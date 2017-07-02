import { union } from '../adt';
import constant from '../core/constant';

/**
 * The Maybe super class.
 *
 * @type {Function}
 */
const Maybe = union('Maybe', {
  Just: ['value'],
  Nothing: [],
});

/**
 * Implement Static Applicative for Just
 *
 * @param  {T} value
 * @return {Maybe<T>}
 */
Maybe.of = Maybe.Just.of = Maybe.Just;

/**
 * Implement Static Applicative for Nothing
 *
 * @param  {T} value
 * @return {Maybe<T>}
 */
Maybe.Nothing.of = constant(Maybe.Nothing);

/**
 * Implement Applicative
 *
 * @param  {T} value
 * @return {Maybe<T>}
 */
Maybe.prototype.of = Maybe.Just.prototype.of = function of(value) {
  return Maybe.Just(value);
};

/**
 * Implement Chain
 *
 * @param  {Function} transform
 * @return {Maybe}
 */
Maybe.prototype.chain = function chain(transform) {
  return this.cata({
    Nothing: constant(this),
    Just: transform,
  });
};

/**
 * Implement Functor
 *
 * @param  {Function} transform
 * @return {Maybe}
 */
Maybe.prototype.map = function map(transform) {
  return this.chain(x => this.of(transform(x)));
};

/**
 * Implement Functor
 *
 * @param  {Function} transform
 * @return {Maybe}
 */
Maybe.prototype.getOrElse = function getOrElse(value) {
  return this.cata({
    Nothing: constant(value),
    Just: constant(this.value),
  });
};

/**
 * Determine if an instance is an instance of Just
 *
 * @return {Boolean}
 */
Maybe.prototype.isJust = function isJust() {
  return this instanceof Maybe.Just;
};

/**
 * Determine if an instance is an instance of Nothing
 *
 * @return {Boolean}
 */
Maybe.prototype.isNothing = function isNothing() {
  return this === Maybe.Nothing;
};

/**
 * Create a Maybe from a potentially null value.
 *
 * @param  {T} value
 * @return {Maybe<T>}
 */
Maybe.fromNullable = (value) => {
  if (value === null || value === undefined) {
    return Maybe.Nothing;
  }
  return Maybe.Just.of(value);
};

export default Maybe;
