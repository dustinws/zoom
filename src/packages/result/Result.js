import __ from 'ramda/src/__';
import curry from 'ramda/src/curry';
import always from 'ramda/src/always';
import compose from 'ramda/src/compose';
import { union } from '../adt';

/**
 * @class Result
 * @abstract
 * @description
 * `Result` is an abstraction around error handling that allows the user
 * to return their errors instead of throw them. `Result` is a super class
 * with two constructors, `Err` and `Ok`. The `Ok` constructor
 * represents a successful operation, and the `Err` constructor represents
 * an unsuccessful operation with an embedded error message. You can chain
 * functions that return `Result` instances by using `.chain` or `.andThen`.
 *
 * ---
 *  #### Fantasy Land Implementations
 *  `Applicative`, `Functor`, `Apply`, `Chain`, `Monad`
 * @example
 * import { Result } from 'zoomjs';
 *
 * // Expose the constructors
 * const { Err, Ok } = Result;
 *
 * const toInteger = (number) => {
 *   const integer = parseInt(number, 10);
 *
 *   if (isNaN(integer)) {
 *     return Err('Not a number!');
 *   }
 *
 *   return Ok(number);
 * };
 *
 * toInteger('32') // Ok(32)
 * toInteger(null) // Err(Not a number!)
 */
const Result = union('Result', {
  /**
   * @class Result.Ok
   * @extends Result
   */
  Ok: ['value'],

  /**
   * @class Result.Err
   * @extends Result
   */
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
 * @memberof Result
 * @since 1.0.0-beta
 * @implements Applicative
 * @example
 * import { Result } from 'zoomjs';
 *
 * Result.of(1).toString();
 * // => 'Ok(1)'
 *
 * @param  {B} value The value to put in the Result
 * @return {Result<A, B>}
 */
Result.of = function of(value) {
  return Ok(value);
};

/**
 * @description Lift a value into a successful 'Ok' context.
 * @memberof Result
 * @since 1.0.0-beta
 * @implements Applicative
 * @example
 * import { Ok } from 'zoomjs/result';
 *
 * Ok.of(1).toString();
 * // => 'Ok(1)'
 *
 * @param  {B} value The value to put in the Result
 * @return {Result<A, B>}
 */
Ok.of = function of(value) {
  return Ok(value);
};

/**
 * @description Lift a value into an unsuccessful 'Err' context.
 * @memberof Result
 * @since 1.0.0-beta
 * @implements Applicative
 * @example
 * import { Err } from 'zoomjs/result';
 *
 * Err.of(1).toString();
 * // => 'Err(1)'
 *
 * @param  {A} value The value to put in the Result
 * @return {Result<A, B>}
 */
Err.of = function of(value) {
  return Err(value);
};

/**
 * @description Apply a transformation to the Result if it is an instance
 * of "Ok". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Ok' to 'Err' instance and stop
 * subsequent transformations from being applied. An alias for {@link Result.andThen}
 * @memberof Result
 * @static
 * @function
 * @since 1.0.0-beta
 * @implements Chain
 * @see {@link Result.andThen}
 * @example
 * // chain Result a b :: (b -> Result a c) -> Result a c
 * import { chain, Err, Ok } from 'zoomjs/result';
 *
 * // toUpper :: String -> Result String String
 * const toUpper = x =>
 *   typeof x !== 'string'
 *     ? Err.of('toUpper() recieved a non string.')
 *     : Ok.of(x.toUpperCase());
 *
 * // A "Ok" will apply the next operation
 * chain(toUpper, Ok.of('boom'));
 * // => Ok(BOOM)
 *
 * // A "Err" will ignore the next operation
 * chain(toUpper, Err.of('yea right'));
 * // => Err(yea right)
 *
 * @param  {function} transform The transformation to apply to the inner value
 * @param  {Result<A, B>} result The result instance.
 * @return {Result<A, C>}
 */
Result.chain = curry((transform, result) =>
  result.cata({
    Err: always(result),
    Ok: transform,
  }));

/**
 * @description Apply a transformation to the Result if it is an instance
 * of "Ok". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Ok' to 'Err' instance and stop
 * subsequent transformations from being applied. An alias for {@link Result.chain}
 * @memberof Result
 * @since 1.0.0-beta
 * @function andThen
 * @static
 * @see {@link Result.chain}
 * @example
 * // andThen Result a b :: (b -> Result a c) -> Result a c
 * import { andThen, Err, Ok } from 'zoomjs/result';
 *
 * // toUpper :: String -> Result String String
 * const toUpper = x =>
 *   typeof x !== 'string'
 *     ? Err.of('toUpper() recieved a non string.')
 *     : Ok.of(x.toUpperCase());
 *
 * // A "Ok" will apply the next operation
 * andThen(toUpper, Ok.of('boom'));
 * // => Ok(BOOM)
 *
 * // A "Err" will ignore the next operation
 * andThen(toUpper, Err.of('yea right'));
 * // => Err(yea right)
 *
 * @param  {function} transform The transformation to apply to the inner value
 * @param  {Result<A, B>} result The result instance.
 * @return {Result<A, C>}
 */
Result.andThen = Result.chain;

/**
 * @description `map` is very similar to {@link Result.andThen} and
 * {@link Result.chain} in that it only runs the function if the
 * result is an instance of `Just`. The main difference is that {@link Result.andThen}
 * and {@link Result.chain} expect the functions you give them to return
 * new `Result` instances, and map let's you use plain old functions.
 * @memberof Result
 * @since 1.0.0-beta
 * @implements Functor
 * @function map
 * @static
 * @example
 * // map Result a b :: (b -> c) -> Result a c
 * import { map, Err, Ok } from 'zoomjs/result';
 *
 * // toUpper :: String -> String
 * const toUpper = x => x.toUpperCase();
 *
 * // A "Ok" will run the next operation
 * map(toUpper, Ok.of('yay'));
 * // => Ok('YAY!');
 *
 * // A "Err" will ignore the next operation
 * map(toUpper, Err.of('nay!'));
 * // => Err('nay!');
 *
 * @param  {function} transform The transformation to apply to the inner value
 * @param  {Result<A, B>} result The result instance.
 * @return {Result<A, C>}
 */
Result.map = curry((transform, result) =>
  Result.chain(compose(Result.of, transform), result));

/**
 * @description
 * `ap` is just like `map`, allowing a user to use plain old functions to
 * transform values hidden away in `Result`s. The only difference is that
 * instead of giving it the function, you give it an `Result` of the function.
 * This is known as the `Apply` type in fantasy land JS.
 *
 * @memberof Result
 * @since 1.0.0-beta
 * @implements Apply
 * @function ap
 * @static
 * @example
 * // ap :: Apply (b -> c) -> Result a b -> Result a c
 * import { ap, Err, Ok } from 'zoomjs/result';
 *
 * // toUpperE :: Result a (String -> String)
 * const toUpperE = Ok(x => x.toUpperCase());
 *
 * // A "Ok" will apply the next operation
 * ap(toUpperE, Ok.of('boom'));
 * // => Ok(BOOM)
 *
 * // A "Err" will ignore the next operation
 * ap(toUpperE, Err.of('yea right'));
 * // => Err(yea right)
 *
 * @param  {Result<A, function>} left The result containing a function to run on the value
 * @param  {Result<A, B>} right The result containing a value
 * @return {Result<A, C>}
 */
Result.ap = curry((left, right) =>
  Result.chain(Result.map(__, right), left));

/**
 * @description Determine if an Result is an instance of Err
 * @memberof Result
 * @since 1.0.0-beta
 * @function isErr
 * @static
 * @example
 * // isErr :: Result a b -> Bool
 * import { isErr, Err, Ok } from 'zoomjs/result';
 *
 * isErr(Err.of());
 * // => true
 *
 * isErr(Ok.of());
 * // => false
 *
 * @param  {Result<A, B>} result The result to query
 * @return {Boolean}
 */
Result.isErr = result => result instanceof Result.Err;

/**
 * @description Determine if an Result is an instance of Ok
 * @memberof Result
 * @since 1.0.0-beta
 * @function isOk
 * @static
 * @example
 * // isOk :: Result a b -> Bool
 * import { isOk, Err, Ok } from 'zoomjs/result';
 *
 * isOk(Ok.of());
 * // => true
 *
 * isOk(Err.of());
 * // => false
 *
 * @param  {Result<A, B>} result The result to query
 * @return {Boolean}
 */
Result.isOk = result => result instanceof Result.Ok;


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

 /**
  * @description A function that accepts an object with two functions, one
  * to run if the result is an instance of `Ok`, and one to run if the
  * result is an instance of `Err`. The return value will be returned
  * directly, with no wrapper instance. This name is short for `catamorphism`.
  * An alias for {@link Result#caseOf}
  * @memberof Result
  * @since 1.0.0-beta
  * @method
  * @instance
  * @see {@link Result#caseOf}
  * @example
  * // cata Result a b :: { Err: a -> c, Ok: b -> c } -> c
  * import { Result } from 'zoomjs';
  *
  * Result.of(1).cata({
  *   Ok(one) {
  *     // Do something with one
  *   },
  *
  *   Err(error) {
  *     // Handle the error
  *   },
  * });
  *
  * @this Result
  * @param  {object} cases `{ Err: a -> c, Ok: b -> c }`
  * @param  {function} cases.Err The `Err` case
  * @param  {function} cases.Ok The `Ok` case
  * @return {Result<A, C>}
  */
Result.prototype.cata = Result.prototype.cata;

 /**
  * @description A function that accepts an object with two functions, one
  * to run if the result is an instance of `Ok`, and one to run if the
  * result is an instance of `Err`. The return value will be returned
  * directly, with no wrapper instance. An alias for An alias for {@link Result#cata}
  * @memberof Result
  * @since 1.0.0-beta
  * @see {@link Result#cata}
  * @method
  * @instance
  * @example
  * // caseOf Result a b :: { Err: a -> c, Ok: b -> c } -> c
  * import { Result } from 'zoomjs';
  *
  * Result.of(1).caseOf({
  *   Ok(one) {
  *     // Do something with one
  *   },
  *
  *   Err(error) {
  *     // Handle the error
  *   },
  * });
  *
  * @this Result
  * @param  {object} cases `{ Err: a -> c, Ok: b -> c }`
  * @param  {function} cases.Err The `Err` case
  * @param  {function} cases.Ok The `Ok` case
  * @return {Result<A, C>}
  */
Result.prototype.caseOf = Result.prototype.cata;

/**
 * @description Lift a value into a successful 'Ok' context.
 * @memberof Result.Ok
 * @since 1.0.0-beta
 * @implements Applicative
 * @method of
 * @instance
 * @example
 * // of Result a b :: c -> Result d c
 * import { Ok } from 'zoomjs/result';
 *
 * Ok.of(1);
 * // => Ok(1)
 *
 * @this Result
 * @param  {B} value The value to put in the Result
 * @return {Result<A, B>}
 */
Ok.prototype.of = function of(value) {
  return Ok.of(value);
};

/**
 * @description Lift a value into an unsuccessful 'Err' context.
 * @memberof Result.Err
 * @since 1.0.0-beta
 * @implements Applicative
 * @method of
 * @instance
 * @example
 * // of Result a b :: c -> Result c d
 * import { Err } from 'zoomjs/result';
 *
 * Err.of(1);
 * // => Err(1)
 *
 * @this Result
 * @param  {A} value The value to put in the Result
 * @return {Result<A, B>}
 */
Err.prototype.of = function of(value) {
  return Err.of(value);
};

/**
 * @description Apply a transformation to the Result if it is an instance
 * of "Ok". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Ok' to 'Err' instance and stop
 * subsequent transformations from being applied. An alias for {@link Result#andThen}
 *
 * @memberof Result
 * @since 1.0.0-beta
 * @implements Chain
 * @method
 * @instance
 * @see {@link Result#andThen}
 * @example
 * // chain Result a b :: (b -> Result a c) -> Result a c
 * import { Err, Ok } from 'zoomjs/result';
 *
 * // toUpper :: String -> Result String String
 * const toUpper = x =>
 *   typeof x !== 'string'
 *     ? Err.of('toUpper() recieved a non string.')
 *     : Ok.of(x.toUpperCase());
 *
 * // A "Ok" will apply the next operation
 * Ok.of('boom').chain(toUpper);
 * // => Ok(BOOM)
 *
 * // A "Err" will ignore the next operation
 * Err.of('yea right').chain(toUpper);
 * // => Err(yea right)
 *
 * @this Result
 * @param  {function} transform The transformation to apply to the inner value
 * @return {Result<A, C>}
 */
Result.prototype.chain = function chain(transform) {
  return Result.chain(transform, this);
};

/**
 * @description Apply a transformation to the Result if it is an instance
 * of "Ok". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Ok' to 'Err' instance and stop
 * subsequent transformations from being applied. An alias for {@link Result#chain}
 *
 * @memberof Result
 * @since 1.0.0-beta
 * @method
 * @instance
 * @see {@link Result#chain}
 * @example
 * // andThen Result a b :: (b -> Result a c) -> Result a c
 * import { Err, Ok } from 'zoomjs/result';
 *
 * // toUpper :: String -> Result String String
 * const toUpper = x =>
 *   typeof x !== 'string'
 *     ? Err.of('toUpper() recieved a non string.')
 *     : Ok.of(x.toUpperCase());
 *
 * // A "Ok" will apply the next operation
 * Ok.of('boom').andThen(toUpper);
 * // => Ok(BOOM)
 *
 * // A "Err" will ignore the next operation
 * Err.of('yea right').andThen(toUpper);
 * // => Err(yea right)
 *
 * @this Result
 * @param  {function} transform The transformation to apply to the inner value
 * @return {Result<A, C>}
 */
Result.prototype.andThen = function andThen(transform) {
  return Result.chain(transform, this);
};

/**
 * @description `map` is very similar to {@link Result.andThen} and
 * {@link Result.chain} in that it only runs the function if the
 * result is an instance of `Just`. The main difference is that {@link Result.andThen}
 * and {@link Result.chain} expect the functions you give them to return
 * new `Result` instances, and map let's you use plain old functions.
 *
 * @memberof Result
 * @since 1.0.0-beta
 * @implements Functor
 * @method
 * @instance
 * @example
 * // map Result a b :: (b -> c) -> Result a c
 * import { Err, Ok } from 'zoomjs/result';
 *
 * // toUpper :: String -> String
 * const toUpper = x => x.toUpperCase();
 *
 * // A "Ok" will run the next operation
 * Ok.of('yay').map(toUpper);
 * // => Ok('YAY!');
 *
 * // A "Err" will ignore the next operation
 * Err.of('nay!').map(toUpper);
 * // => Err('nay!');
 *
 * @this Result
 * @param  {function} transform The transformation to apply to the inner value
 * @return {Result<A, C>}
 */
Result.prototype.map = function map(transform) {
  return Result.map(transform, this);
};

/**
 * @description
 * `ap` is just like `map`, allowing a user to use plain old functions to
 * transform values hidden away in `Result`s. The only difference is that
 * instead of giving it the function, you give it an `Result` of the function.
 * This is known as the `Apply` type in fantasy land JS.
 *
 * @memberof Result
 * @method
 * @instance
 * @since 1.0.0-beta
 * @implements Apply
 * @example
 * // ap Result a b :: Apply (b -> c) -> Result a c
 * import { ap, Err, Ok } from 'zoomjs';
 *
 * // toUpperE :: Result a (String -> String)
 * const toUpperE = Ok(x => x.toUpperCase());
 *
 * // A "Ok" will apply the next operation
 * Ok.of('boom').ap(toUpperE);
 * // => Ok(BOOM)
 *
 * // A "Err" will ignore the next operation
 * Err.of('yea right').ap(toUpperE);
 * // => Err(yea right)
 *
 * @this Result
 * @param  {Result<A, function>} apply An result containing a function to run on the value
 * @return {Result<A, C>}
 */
Result.prototype.ap = function ap(apply) {
  return Result.ap(apply, this);
};

/**
 * @description Determine if an Result is an instance of Err
 * @memberof Result
 * @since 1.0.0-beta
 * @method
 * @instance
 * @example
 * // isErr Result a b :: c -> Bool
 * import { Err, Ok } from 'zoomjs/result';
 *
 * Err.of(1).isErr(); // true
 * Ok.of(1).isErr(); // false
 *
 * @this Result
 * @return {Boolean}
 */
Result.prototype.isErr = function isErr() {
  return Result.isErr(this);
};

/**
 * @description Determine if an Result is an instance of Ok
 * @memberof Result
 * @since 1.0.0-beta
 * @method
 * @instance
 * @example
 * // isOk Result a b :: c -> Bool
 * import { Err, Ok } from 'zoomjs/result';
 *
 * Ok.of(1).isOk(); // true
 * Err.of(1).isOk(); // false
 *
 * @this Result
 * @return {Boolean}
 */
Result.prototype.isOk = function isOk() {
  return Result.isOk(this);
};

export default Result;
