import { union } from '../adt';
import constant from '../core/constant';

/**
 * The Result super class.
 *
 * @type {Function}
 */
const Result = union('Result', {
  Ok: ['value'],
  Err: ['value'],
});

/**
 * Implement Static Applicative for Ok
 *
 * @param  {T} value
 * @return {Result<T>}
 */
Result.of = Result.Ok.of = Result.Ok;

/**
 * Implement Static Applicative for Err
 *
 * @param  {T} value
 * @return {Result<T>}
 */
Result.Err.of = Result.Err.prototype.of = function of(value) {
  return Result.Err(value);
};

/**
 * Implement Applicative
 *
 * @param  {T} value
 * @return {Result<T>}
 */
Result.prototype.of = Result.Ok.prototype.of = function of(value) {
  return Result.Ok(value);
};

/**
 * Implement Chain
 *
 * @param  {Function} transform
 * @return {Result}
 */
Result.prototype.chain = function chain(transform) {
  return this.cata({
    Err: constant(this),
    Ok: transform,
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
 * Determine if an instance is an instance of Err
 *
 * @return {Boolean}
 */
Result.prototype.isErr = function isErr() {
  return this instanceof Result.Err;
};

/**
 * Determine if an instance is an instance of Ok
 *
 * @return {Boolean}
 */
Result.prototype.isOk = function isOk() {
  return this instanceof Result.Ok;
};

export default Result;
