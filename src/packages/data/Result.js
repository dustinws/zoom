import { union } from '../adt';
import constant from '../lambda/constant';

/**
 * The Result super class.
 *
 * @type {Function}
 */
const Result = union('Result', {
  Success: ['value'],
  Failure: ['value'],
});

/**
 * Implement Static Applicative for Success
 *
 * @param  {T} value
 * @return {Result<T>}
 */
Result.of = Result.Success.of = Result.Success;

/**
 * Implement Static Applicative for Failure
 *
 * @param  {T} value
 * @return {Result<T>}
 */
Result.Failure.of = Result.Failure.prototype.of = function of(value) {
  return Result.Failure(value);
};

/**
 * Implement Applicative
 *
 * @param  {T} value
 * @return {Result<T>}
 */
Result.prototype.of = Result.Success.prototype.of = function of(value) {
  return Result.Success(value);
};

/**
 * Implement Chain
 *
 * @param  {Function} transform
 * @return {Result}
 */
Result.prototype.chain = function chain(transform) {
  return this.cata({
    Failure: constant(this),
    Success: transform,
  });
};

/**
 * Implement Functor
 *
 * @param  {Function} transform
 * @return {Result}
 */
Result.prototype.map = function map(transform) {
  return this.chain(x => this.of(transform(x)));
};

/**
 * Determine if an instance is an instance of Failure
 *
 * @return {Boolean}
 */
Result.prototype.isFailure = function isFailure() {
  return this instanceof Result.Failure;
};

/**
 * Determine if an instance is an instance of Success
 *
 * @return {Boolean}
 */
Result.prototype.isSuccess = function isSuccess() {
  return this instanceof Result.Success;
};

/**
 * Implement Semigroup
 *
 * @param  {Result} other
 * @return {Result}
 */
Result.prototype.concat = function concat(other) {
  return this.cata({
    Failure: value =>
      other.cata({
        Success: constant(this),
        Failure: x => Result.Failure(value.concat(x)),
      }),

    Success: value =>
      other.cata({
        Success: x => Result.Success(value.concat(x)),
        Failure: constant(other),
      }),
  });
};

/**
 * Implement Monoid
 *
 * @return {Result}
 */
Result.empty = () =>
  Result.Success([]);

/**
 * Create a Result from a potentially null value.
 *
 * @param  {Function} func
 * @return {Function}
 */
Result.try = func => (...args) => {
  try {
    return Result.Success(func(...args));
  } catch (error) {
    return Result.Failure(error);
  }
};

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
Result.combine = cases => value =>
  Object
    .keys(cases)
    .reduce((result, nextCase) =>
      result.concat(cases[nextCase](value[nextCase])), Result.empty())
    .map(() => value);

export default Result;
