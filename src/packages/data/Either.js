const { union } = require('../adt');
const constant = require('../lambda/constant');

/**
 * The Either super class.
 *
 * @type {Function}
 */
const Either = module.exports = union('Either', {
  Right: ['value'],
  Left: ['value'],
});

/**
 * Implement Static Applicative for Right
 *
 * @param  {T} value
 * @return {Either<T>}
 */
Either.of = Either.Right.of = Either.Right;

/**
 * Implement Static Applicative for Left
 *
 * @param  {T} value
 * @return {Either<T>}
 */
Either.Left.of = Either.Left.prototype.of = function of(value) {
  return Either.Left(value);
};

/**
 * Implement Applicative
 *
 * @param  {T} value
 * @return {Either<T>}
 */
Either.prototype.of = Either.Right.prototype.of = function of(value) {
  return Either.Right(value);
};

/**
 * Implement Chain
 *
 * @param  {Function} transform
 * @return {Either}
 */
Either.prototype.chain = function chain(transform) {
  return this.cata({
    Left: constant(this),
    Right: transform,
  });
};

/**
 * Implement Functor
 *
 * @param  {Function} transform
 * @return {Either}
 */
Either.prototype.map = function map(transform) {
  return this.chain(x => this.of(transform(x)));
};

/**
 * Create a Either from a potentially null value.
 *
 * @param  {Function} func
 * @return {Function}
 */
Either.try = func => (...args) => {
  try {
    return Either.Right(func(...args));
  } catch (error) {
    return Either.Left(error);
  }
};
