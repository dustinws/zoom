'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adt = require('../adt');

var _constant = require('../core/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The Validation super class.
 *
 * @type {Function}
 */
var Validation = (0, _adt.union)('Validation', {
  Success: ['value'],
  Failure: ['value']
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
    Failure: (0, _constant2.default)(this),
    Success: transform
  });
};

/**
 * Implement Functor
 *
 * @param  {Function} transform
 * @return {Validation}
 */
Validation.prototype.map = function map(transform) {
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
  var _this2 = this;

  return this.cata({
    Failure: function Failure(value) {
      return other.cata({
        Success: (0, _constant2.default)(_this2),
        Failure: function Failure(x) {
          return Validation.Failure(value.concat(x));
        }
      });
    },

    Success: function Success(value) {
      return other.cata({
        Success: function Success(x) {
          return Validation.Success(value.concat(x));
        },
        Failure: (0, _constant2.default)(other)
      });
    }
  });
};

/**
 * Implement Monoid
 *
 * @return {Validation}
 */
Validation.empty = function () {
  return Validation.Success([]);
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
Validation.combine = function (cases) {
  return function (value) {
    return Object.keys(cases).reduce(function (result, nextCase) {
      return result.concat(cases[nextCase](value[nextCase]));
    }, Validation.empty()).map(function () {
      return value;
    });
  };
};

exports.default = Validation;
module.exports = exports['default'];