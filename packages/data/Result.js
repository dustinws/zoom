'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adt = require('../adt');

var _constant = require('../lambda/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The Result super class.
 *
 * @type {Function}
 */
var Result = (0, _adt.union)('Result', {
  Success: ['value'],
  Failure: ['value']
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
    Failure: (0, _constant2.default)(this),
    Success: transform
  });
};

/**
 * Implement Functor
 *
 * @param  {Function} transform
 * @return {Result}
 */
Result.prototype.map = function map(transform) {
  var _this = this;

  return this.chain(function (x) {
    return _this.of(transform(x));
  });
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
  var _this2 = this;

  return this.cata({
    Failure: function Failure(value) {
      return other.cata({
        Success: (0, _constant2.default)(_this2),
        Failure: function Failure(x) {
          return Result.Failure(value.concat(x));
        }
      });
    },

    Success: function Success(value) {
      return other.cata({
        Success: function Success(x) {
          return Result.Success(value.concat(x));
        },
        Failure: (0, _constant2.default)(other)
      });
    }
  });
};

/**
 * Implement Monoid
 *
 * @return {Result}
 */
Result.empty = function () {
  return Result.Success([]);
};

/**
 * Create a Result from a potentially null value.
 *
 * @param  {Function} func
 * @return {Function}
 */
Result.try = function (func) {
  return function () {
    try {
      return Result.Success(func.apply(undefined, arguments));
    } catch (error) {
      return Result.Failure(error);
    }
  };
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
Result.combine = function (cases) {
  return function (value) {
    return Object.keys(cases).reduce(function (result, nextCase) {
      return result.concat(cases[nextCase](value[nextCase]));
    }, Result.empty()).map(function () {
      return value;
    });
  };
};

exports.default = Result;
module.exports = exports['default'];
