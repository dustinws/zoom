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
  Ok: ['value'],
  Err: ['value']
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
    Err: (0, _constant2.default)(this),
    Ok: transform
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

exports.default = Result;
module.exports = exports['default'];