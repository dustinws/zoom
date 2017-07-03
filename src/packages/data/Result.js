import __ from '../lambda/__';
import { union } from '../adt';
import curry from '../lambda/curry';
import compose from '../lambda/compose';
import constant from '../lambda/constant';

/**
 * @class Result
 * @memberof module:Zoom.Data
 */
const Result = union('Result', {
  Ok: ['value'],
  Err: ['value'],
});

const Ok = Result.Ok;
const Err = Result.Err;


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
 * import { Result } from '@dustinws/zoom/data';
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
 * import { Result } from '@dustinws/zoom/data';
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
 * import { Result } from '@dustinws/zoom/data';
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
 * import { Result } from '@dustinws/zoom/data';
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
Result.chain = curry((transform, result) =>
  result.cata({
    Err: constant(result),
    Ok: transform,
  }));

/**
 * @description Apply a transformation to the Result if it is an instance
 * of "Ok". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Result
 * @since v1.15.0
 * @function map
 * @example
 * import { Result } from '@dustinws/zoom/data';
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
Result.map = curry((transform, result) =>
  Result.chain(compose(Result.of, transform), result));

/**
 * @description Apply a transformation to the Result if it is an instance
 * of "Ok". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Result
 * @since v1.15.0
 * @function ap
 * @example
 * import { Result } from '@dustinws/zoom/data';
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
Result.ap = curry((left, right) =>
  Result.chain(Result.map(__, right), left));

/**
 * @description Determine if an Result is an instance of Err
 * @memberof module:Zoom.Data.Result
 * @since v1.15.0
 * @function isErr
 * @example
 * import { Result } from '@dustinws/zoom/data';
 *
 * Result.isErr(Result.Err.of(1)); // true
 * Result.isErr(Result.Ok.of(1)); // false
 *
 * @param  {Result} result The result to query
 * @return {Boolean}
 */
Result.isErr = result => result instanceof Result.Err;

/**
 * @description Determine if an Result is an instance of Ok
 * @memberof module:Zoom.Data.Result
 * @since v1.15.0
 * @function isOk
 * @example
 * import { Result } from '@dustinws/zoom/data';
 *
 * Result.isOk(Result.Ok.of(1)); // true
 * Result.isOk(Result.Err.of(1)); // false
 *
 * @param  {Result} result The result to query
 * @return {Boolean}
 */
Result.isOk = result => result instanceof Result.Ok;


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
 * import { Result } from '@dustinws/zoom/data';
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
* import { Result } from '@dustinws/zoom/data';
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
* import { Result } from '@dustinws/zoom/data';
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
* import { Result } from '@dustinws/zoom/data';
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
* import { Result } from '@dustinws/zoom/data';
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
* import { Result } from '@dustinws/zoom/data';
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
* import { Result } from '@dustinws/zoom/data';
*
* Result.Ok.of(1)isOk(); // true
* Result.Err.of(1)isOk(); // false
*
* @return {Boolean}
*/
Result.prototype.isOk = function isOk() {
  return Result.isOk(this);
};

export default Result;
