import { union } from '../adt';
import constant from '../core/constant';

/**
 * The Validation super class.
 *
 * @type {Function}
 */
const Validation = union('Validation', {
  Success: ['value'],
  Failure: ['value'],
});

/**
 * Implement Static Applicative for Success
 *
 * @param  {T} value
 * @return {Validation<T>}
 */
Validation.of = Validation.Success.of = Validation.Success;

/**
 * Implement Static Applicative for Failure
 *
 * @param  {T} value
 * @return {Validation<T>}
 */
Validation.Failure.of = Validation.Failure.prototype.of = function of(value) {
  return Validation.Failure(value);
};

/**
 * Implement Applicative
 *
 * @param  {T} value
 * @return {Validation<T>}
 */
Validation.prototype.of = Validation.Success.prototype.of = function of(value) {
  return Validation.Success(value);
};

/**
 * Implement Chain
 *
 * @param  {Function} transform
 * @return {Validation}
 */
Validation.prototype.chain = function chain(transform) {
  return this.cata({
    Failure: constant(this),
    Success: transform,
  });
};

/**
 * Implement Functor
 *
 * @param  {Function} transform
 * @return {Validation}
 */
Validation.prototype.map = function map(transform) {
  return this.chain(x => this.of(transform(x)));
};

/**
 * Determine if an instance is an instance of Failure
 *
 * @return {Boolean}
 */
Validation.prototype.isFailure = function isFailure() {
  return this instanceof Validation.Failure;
};

/**
 * Determine if an instance is an instance of Success
 *
 * @return {Boolean}
 */
Validation.prototype.isSuccess = function isSuccess() {
  return this instanceof Validation.Success;
};

/**
 * Implement Semigroup
 *
 * @param  {Validation} other
 * @return {Validation}
 */
Validation.prototype.concat = function concat(other) {
  return this.cata({
    Failure: value =>
      other.cata({
        Success: constant(this),
        Failure: x => Validation.Failure(value.concat(x)),
      }),

    Success: value =>
      other.cata({
        Success: x => Validation.Success(value.concat(x)),
        Failure: constant(other),
      }),
  });
};

/**
 * Implement Monoid
 *
 * @return {Validation}
 */
Validation.empty = () =>
  Validation.Success([]);

/**
 * Given an object where each value is a function that accecpts the same
 * object-under-validation. The functions do not need to store any values
 * in the success cases, since the object-under-validation will be returned
 * if no failures are present. Each function can return it's own error
 * that will be added to an array of errors in the final Failure.
 *
 * @param  {Object} cases
 * @return {Function}
 */
Validation.combine = cases => value =>
  Object
    .keys(cases)
    .reduce((result, nextCase) =>
      result.concat(cases[nextCase](value[nextCase])), Validation.empty())
    .map(() => value);

export default Validation;
