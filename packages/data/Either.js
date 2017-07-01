'use strict';

var _require = require('../adt'),
    union = _require.union;

var constant = require('../lambda/constant');

/**
 * The Either super class.
 *
 * @type {Function}
 */
var Either = module.exports = union('Either', {
  Right: ['value'],
  Left: ['value']
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
    Right: transform
  });
};

/**
 * Implement Functor
 *
 * @param  {Function} transform
 * @return {Either}
 */
Either.prototype.map = function map(transform) {
  var _this = this;

  return this.chain(function (x) {
    return _this.of(transform(x));
  });
};

/**
 * Create a Either from a potentially null value.
 *
 * @param  {Function} func
 * @return {Function}
 */
Either.try = function (func) {
  return function () {
    try {
      return Either.Right(func.apply(undefined, arguments));
    } catch (error) {
      return Either.Left(error);
    }
  };
};