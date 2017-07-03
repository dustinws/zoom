'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('../lambda/__');

var _2 = _interopRequireDefault(_);

var _adt = require('../adt');

var _curry = require('../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

var _compose = require('../lambda/compose');

var _compose2 = _interopRequireDefault(_compose);

var _constant = require('../lambda/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class Result
 * @memberof module:Zoom.Data
 */
var Result = (0, _adt.union)('Result', {
  Ok: ['value'],
  Err: ['value']
});

var Ok = Result.Ok;
var Err = Result.Err;

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Lift a value into a successful 'Ok' context.
 * @memberof module:Zoom.Data.Result
 * @function of
 * @since v1.15.0
 * @example
 * import { Result } from '@dustinws/zoom/packages/data';
 *
 * const valid = Result.of(1);
 *
 * valid.toString() // 'Ok(1)'
 *
 * @param  {Any} value The value to put in the Result
 * @return {Result}
 */
Result.of = function of(value) {
  return Ok(value);
};

/**
 * @description Lift a value into a successful 'Ok' context.
 * @memberof module:Zoom.Data.Result
 * @function
 * @since v1.15.0
 * @example
 * import { Result } from '@dustinws/zoom/packages/data';
 *
 * const valid = Result.Ok.of(1);
 *
 * valid.toString() // 'Ok(1)'
 *
 * @param  {Any} value The value to put in the Result
 * @return {Result}
 */
Ok.of = function of(value) {
  return Ok(value);
};

/**
 * @description Lift a value into an unsuccessful 'Err' context.
 * @memberof module:Zoom.Data.Result
 * @function
 * @since v1.15.0
 * @example
 * import { Result } from '@dustinws/zoom/packages/data';
 *
 * const valid = Result.Err.of(1);
 *
 * valid.toString() // 'Err(1)'
 *
 * @param  {Any} value The value to put in the Result
 * @return {Result}
 */
Err.of = function of(value) {
  return Err(value);
};

/**
 * @description Apply a transformation to the Result if it is an instance
 * of "Ok". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Ok' to 'Err' instance and stop
 * subsequent transformations from being applied.
 * @memberof module:Zoom.Data.Result
 * @since v1.15.0
 * @function chain
 * @example
 * import { Result } from '@dustinws/zoom/packages/data';
 *
 * const valid = Result.Ok.of('yay!');
 * const invalid = Result.Err.of('nay!');
 *
 * const toUpper = x => Result.Ok.of(x.toUpperCase());
 *
 * Result.chain(toUpper, valid); // Ok('YAY!');
 * Result.chain(toUpper, invalid); // Err('nay!');
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @param  {Result} result The result
 * @return {Result}
 */
Result.chain = (0, _curry2.default)(function (transform, result) {
  return result.cata({
    Err: (0, _constant2.default)(result),
    Ok: transform
  });
});

/**
 * @description Apply a transformation to the Result if it is an instance
 * of "Ok". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Result
 * @since v1.15.0
 * @function map
 * @example
 * import { Result } from '@dustinws/zoom/packages/data';
 *
 * const valid = Result.Ok.of('yay!');
 * const failure = Result.Err.of('nay!');
 *
 * const toUpper = x => x.toUpperCase();
 *
 * Result.map(toUpper, valid); // Ok('YAY!');
 * Result.map(toUpper, invalid); // Err('nay!');
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @param  {Result} result The result
 * @return {Result}
 */
Result.map = (0, _curry2.default)(function (transform, result) {
  return Result.chain((0, _compose2.default)(Result.of, transform), result);
});

/**
 * @description Apply a transformation to the Result if it is an instance
 * of "Ok". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Result
 * @since v1.15.0
 * @function ap
 * @example
 * import { Result } from '@dustinws/zoom/packages/data';
 *
 * const valid = Result.Ok.of('yay!');
 * const failure = Result.Err.of('nay!');
 *
 * const toUpper = Result.of(x => x.toUpperCase());
 *
 * Result.ap(toUpper, valid); // Ok('YAY!');
 * Result.ap(toUpper, invalid); // Err('nay!');
 *
 * @param  {Result} left The result containing a function to run on the value
 * @param  {Result} right The result containing a value
 * @return {Result}
 */
Result.ap = (0, _curry2.default)(function (left, right) {
  return Result.chain(Result.map(_2.default, right), left);
});

/**
 * @description Determine if an Result is an instance of Err
 * @memberof module:Zoom.Data.Result
 * @since v1.15.0
 * @function isErr
 * @example
 * import { Result } from '@dustinws/zoom/packages/data';
 *
 * Result.isErr(Result.Err.of(1)); // true
 * Result.isErr(Result.Ok.of(1)); // false
 *
 * @param  {Result} result The result to query
 * @return {Boolean}
 */
Result.isErr = function (result) {
  return result instanceof Result.Err;
};

/**
 * @description Determine if an Result is an instance of Ok
 * @memberof module:Zoom.Data.Result
 * @since v1.15.0
 * @function isOk
 * @example
 * import { Result } from '@dustinws/zoom/packages/data';
 *
 * Result.isOk(Result.Ok.of(1)); // true
 * Result.isOk(Result.Err.of(1)); // false
 *
 * @param  {Result} result The result to query
 * @return {Boolean}
 */
Result.isOk = function (result) {
  return result instanceof Result.Ok;
};

/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Lift a value into a successful 'Ok' context.
 * @memberof module:Zoom.Data.Result
 * @since v1.15.0
 * @example
 * import { Result } from '@dustinws/zoom/packages/data';
 *
 * const valid = Result.Ok.of(1);
 *
 * valid.toString() // 'Ok(1)'
 *
 * @param  {Any} value The value to put in the Result
 * @return {Result}
 */
Ok.prototype.of = function of(value) {
  return Ok(value);
};

/**
* @description Lift a value into an unsuccessful 'Err' context.
* @memberof module:Zoom.Data.Result
* @since v1.15.0
* @example
* import { Result } from '@dustinws/zoom/packages/data';
*
* const valid = Result.Err.of(1);
*
* valid.toString() // 'Err(1)'
*
* @param  {Any} value The value to put in the Result
* @return {Result}
*/
Err.prototype.of = function of(value) {
  return Err(value);
};

/**
* @description Apply a transformation to the Result if it is an instance
* of "Ok". Otherwise, ignore the transformation and return the instance.
* This is how you can switch from a 'Ok' to 'Err' instance and stop
* subsequent transformations from being applied.
* @memberof module:Zoom.Data.Result
* @since v1.15.0
* @example
* import { Result } from '@dustinws/zoom/packages/data';
*
* const valid = Result.Ok.of('yay!');
* const invalid = Result.Err.of('nay!');
*
* const toUpper = x => Result.Ok.of(x.toUpperCase());
*
* valid.chain(toUpper); // Ok('YAY!');
* invalid.chain(toUpper); // Err('nay!');
*
* @param  {Function} transform The transformation to apply to the inner value
* @return {Result}
*/
Result.prototype.chain = function chain(transform) {
  return Result.chain(transform, this);
};

/**
* @description Apply a transformation to the Result if it is an instance
* of "Ok". Otherwise, ignore the transformation and return the instance.
* @memberof module:Zoom.Data.Result
* @since v1.15.0
* @example
* import { Result } from '@dustinws/zoom/packages/data';
*
* const valid = Result.Ok.of('yay!');
* const failure = Result.Err.of('nay!');
*
* const toUpper = x => x.toUpperCase();
*
* valid.map(toUpper); // Ok('YAY!');
* invalid.map(toUpper); // Err('nay!');
*
* @param  {Function} transform The transformation to apply to the inner value
* @return {Result}
*/
Result.prototype.map = function map(transform) {
  return Result.map(transform, this);
};

/**
* @description Apply a transformation to the Result if it is an instance
* of "Ok". Otherwise, ignore the transformation and return the instance.
* @memberof module:Zoom.Data.Result
* @since v1.15.0
* @example
* import { Result } from '@dustinws/zoom/packages/data';
*
* const valid = Result.Ok.of('yay!');
* const failure = Result.Err.of('nay!');
*
* const toUpper = Result.of(x => x.toUpperCase());
*
* valid.ap(toUpper); // Ok('YAY!');
* invalid.ap(toUpper); // Err('nay!');
*
* @param  {Result} apply A Result holding a function to run.
* @return {Result}
*/
Result.prototype.ap = function ap(apply) {
  return Result.ap(apply, this);
};

/**
* @description Determine if an Result is an instance of Err
* @memberof module:Zoom.Data.Result
* @since v1.15.0
* @example
* import { Result } from '@dustinws/zoom/packages/data';
*
* Result.Err.of(1).isErr(); // true
* Result.Ok.of(1).isErr(); // false
*
* @return {Boolean}
*/
Result.prototype.isErr = function isErr() {
  return Result.isErr(this);
};

/**
* @description Determine if an Result is an instance of Ok
* @memberof module:Zoom.Data.Result
* @since v1.15.0
* @example
* import { Result } from '@dustinws/zoom/packages/data';
*
* Result.Ok.of(1)isOk(); // true
* Result.Err.of(1)isOk(); // false
*
* @return {Boolean}
*/
Result.prototype.isOk = function isOk() {
  return Result.isOk(this);
};

exports.default = Result;
module.exports = exports['default'];