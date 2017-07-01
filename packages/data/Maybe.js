'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adt = require('../adt');

var _constant = require('../lambda/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The Maybe super class.
 *
 * @type {Function}
 */
var Maybe = (0, _adt.union)('Maybe', {
  Just: ['value'],
  Nothing: []
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
Maybe.Nothing.of = (0, _constant2.default)(Maybe.Nothing);

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
    Nothing: (0, _constant2.default)(this),
    Just: transform
  });
};

/**
 * Implement Functor
 *
 * @param  {Function} transform
 * @return {Maybe}
 */
Maybe.prototype.map = function map(transform) {
  var _this = this;

  return this.chain(function (x) {
    return _this.of(transform(x));
  });
};

/**
 * Implement Functor
 *
 * @param  {Function} transform
 * @return {Maybe}
 */
Maybe.prototype.getOrElse = function getOrElse(value) {
  return this.cata({
    Nothing: (0, _constant2.default)(value),
    Just: (0, _constant2.default)(this.value)
  });
};

/**
 * Create a Maybe from a potentially null value.
 *
 * @param  {T} value
 * @return {Maybe<T>}
 */
Maybe.fromNullable = function (value) {
  if (value === null || value === undefined) {
    return Maybe.Nothing;
  }
  return Maybe.Just.of(value);
};

exports.default = Maybe;
module.exports = exports['default'];