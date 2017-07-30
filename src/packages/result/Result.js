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
 * with two constructors, `Failure` and `Success`. The `Success` constructor
 * represents a successful operation, and the `Failure` constructor represents
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
 * const { Failure, Success } = Result;
 *
 * const toInteger = (number) => {
 *   const integer = parseInt(number, 10);
 *
 *   if (isNaN(integer)) {
 *     return Failure('Not a number!');
 *   }
 *
 *   return Success(number);
 * };
 *
 * toInteger('32') // Success(32)
 * toInteger(null) // Failure(Not a number!)
 */
const Result = union('Result', {
  /**
   * @class Result.Success
   * @extends Result
   */
  Success: ['value'],

  /**
   * @class Result.Failure
   * @extends Result
   */
  Failure: ['value'],
});

const Success = Result.Success;
const Failure = Result.Failure;

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Lift a value into a successful 'Success' context.
 * @memberof Result
 * @since 1.0.0-beta
 * @implements Applicative
 * @example
 * import { Result } from 'zoomjs';
 *
 * Result.of(1).toString();
 * // => 'Success(1)'
 *
 * @param  {B} value The value to put in the Result
 * @return {Result<A, B>}
 */
Result.of = function of(value) {
  return Success(value);
};

/**
 * @description Lift a value into a successful 'Success' context.
 * @memberof Result
 * @since 1.0.0-beta
 * @implements Applicative
 * @example
 * import { Success } from 'zoomjs/result';
 *
 * Success.of(1).toString();
 * // => 'Success(1)'
 *
 * @param  {B} value The value to put in the Result
 * @return {Result<A, B>}
 */
Success.of = function of(value) {
  return Success(value);
};

/**
 * @description Lift a value into an unsuccessful 'Failure' context.
 * @memberof Result
 * @since 1.0.0-beta
 * @implements Applicative
 * @example
 * import { Failure } from 'zoomjs/result';
 *
 * Failure.of(1).toString();
 * // => 'Failure(1)'
 *
 * @param  {A} value The value to put in the Result
 * @return {Result<A, B>}
 */
Failure.of = function of(value) {
  return Failure(value);
};

/**
 * @description Apply a transformation to the Result if it is an instance
 * of "Success". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Success' to 'Failure' instance and stop
 * subsequent transformations from being applied. An alias for {@link Result.andThen}
 * @memberof Result
 * @static
 * @function
 * @since 1.0.0-beta
 * @implements Chain
 * @see {@link Result.andThen}
 * @example
 * // chain Result a b :: (b -> Result a c) -> Result a c
 * import { chain, Failure, Success } from 'zoomjs/result';
 *
 * // toUpper :: String -> Result String String
 * const toUpper = x =>
 *   typeof x !== 'string'
 *     ? Failure.of('toUpper() recieved a non string.')
 *     : Success.of(x.toUpperCase());
 *
 * // A "Success" will apply the next operation
 * chain(toUpper, Success.of('boom'));
 * // => Success(BOOM)
 *
 * // A "Failure" will ignore the next operation
 * chain(toUpper, Failure.of('yea right'));
 * // => Failure(yea right)
 *
 * @param  {function} transform The transformation to apply to the inner value
 * @param  {Result<A, B>} result The result instance.
 * @return {Result<A, C>}
 */
Result.chain = curry((transform, result) =>
  result.cata({
    Failure: always(result),
    Success: transform,
  }));

/**
 * @description Apply a transformation to the Result if it is an instance
 * of "Success". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Success' to 'Failure' instance and stop
 * subsequent transformations from being applied. An alias for {@link Result.chain}
 * @memberof Result
 * @since 1.0.0-beta
 * @function andThen
 * @static
 * @see {@link Result.chain}
 * @example
 * // andThen Result a b :: (b -> Result a c) -> Result a c
 * import { andThen, Failure, Success } from 'zoomjs/result';
 *
 * // toUpper :: String -> Result String String
 * const toUpper = x =>
 *   typeof x !== 'string'
 *     ? Failure.of('toUpper() recieved a non string.')
 *     : Success.of(x.toUpperCase());
 *
 * // A "Success" will apply the next operation
 * andThen(toUpper, Success.of('boom'));
 * // => Success(BOOM)
 *
 * // A "Failure" will ignore the next operation
 * andThen(toUpper, Failure.of('yea right'));
 * // => Failure(yea right)
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
 * import { map, Failure, Success } from 'zoomjs/result';
 *
 * // toUpper :: String -> String
 * const toUpper = x => x.toUpperCase();
 *
 * // A "Success" will run the next operation
 * map(toUpper, Success.of('yay'));
 * // => Success('YAY!');
 *
 * // A "Failure" will ignore the next operation
 * map(toUpper, Failure.of('nay!'));
 * // => Failure('nay!');
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
 * import { ap, Failure, Success } from 'zoomjs/result';
 *
 * // toUpperE :: Result a (String -> String)
 * const toUpperE = Success(x => x.toUpperCase());
 *
 * // A "Success" will apply the next operation
 * ap(toUpperE, Success.of('boom'));
 * // => Success(BOOM)
 *
 * // A "Failure" will ignore the next operation
 * ap(toUpperE, Failure.of('yea right'));
 * // => Failure(yea right)
 *
 * @param  {Result<A, function>} left The result containing a function to run on the value
 * @param  {Result<A, B>} right The result containing a value
 * @return {Result<A, C>}
 */
Result.ap = curry((left, right) =>
  Result.chain(Result.map(__, right), left));

/**
 * @description Determine if an Result is an instance of Failure
 * @memberof Result
 * @since 1.0.0-beta
 * @function isFailure
 * @static
 * @example
 * // isFailure :: Result a b -> Bool
 * import { isFailure, Failure, Success } from 'zoomjs/result';
 *
 * isFailure(Failure.of());
 * // => true
 *
 * isFailure(Success.of());
 * // => false
 *
 * @param  {Result<A, B>} result The result to query
 * @return {Boolean}
 */
Result.isFailure = result => result instanceof Result.Failure;

/**
 * @description Determine if an Result is an instance of Success
 * @memberof Result
 * @since 1.0.0-beta
 * @function isSuccess
 * @static
 * @example
 * // isSuccess :: Result a b -> Bool
 * import { isSuccess, Failure, Success } from 'zoomjs/result';
 *
 * isSuccess(Success.of());
 * // => true
 *
 * isSuccess(Failure.of());
 * // => false
 *
 * @param  {Result<A, B>} result The result to query
 * @return {Boolean}
 */
Result.isSuccess = result => result instanceof Result.Success;


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

 /**
  * @description A function that accepts an object with two functions, one
  * to run if the result is an instance of `Success`, and one to run if the
  * result is an instance of `Failure`. The return value will be returned
  * directly, with no wrapper instance. This name is short for `catamorphism`.
  * An alias for {@link Result#caseOf}
  * @memberof Result
  * @since 1.0.0-beta
  * @method
  * @instance
  * @see {@link Result#caseOf}
  * @example
  * // cata Result a b :: { Failure: a -> c, Success: b -> c } -> c
  * import { Result } from 'zoomjs';
  *
  * Result.of(1).cata({
  *   Success(one) {
  *     // Do something with one
  *   },
  *
  *   Failure(error) {
  *     // Handle the error
  *   },
  * });
  *
  * @this Result
  * @param  {object} cases `{ Failure: a -> c, Success: b -> c }`
  * @param  {function} cases.Failure The `Failure` case
  * @param  {function} cases.Success The `Success` case
  * @return {Result<A, C>}
  */
Result.prototype.cata = Result.prototype.cata;

 /**
  * @description A function that accepts an object with two functions, one
  * to run if the result is an instance of `Success`, and one to run if the
  * result is an instance of `Failure`. The return value will be returned
  * directly, with no wrapper instance. An alias for An alias for {@link Result#cata}
  * @memberof Result
  * @since 1.0.0-beta
  * @see {@link Result#cata}
  * @method
  * @instance
  * @example
  * // caseOf Result a b :: { Failure: a -> c, Success: b -> c } -> c
  * import { Result } from 'zoomjs';
  *
  * Result.of(1).caseOf({
  *   Success(one) {
  *     // Do something with one
  *   },
  *
  *   Failure(error) {
  *     // Handle the error
  *   },
  * });
  *
  * @this Result
  * @param  {object} cases `{ Failure: a -> c, Success: b -> c }`
  * @param  {function} cases.Failure The `Failure` case
  * @param  {function} cases.Success The `Success` case
  * @return {Result<A, C>}
  */
Result.prototype.caseOf = Result.prototype.cata;

/**
 * @description Lift a value into a successful 'Success' context.
 * @memberof Result.Success
 * @since 1.0.0-beta
 * @implements Applicative
 * @method of
 * @instance
 * @example
 * // of Result a b :: c -> Result d c
 * import { Success } from 'zoomjs/result';
 *
 * Success.of(1);
 * // => Success(1)
 *
 * @this Result
 * @param  {B} value The value to put in the Result
 * @return {Result<A, B>}
 */
Success.prototype.of = function of(value) {
  return Success.of(value);
};

/**
 * @description Lift a value into an unsuccessful 'Failure' context.
 * @memberof Result.Failure
 * @since 1.0.0-beta
 * @implements Applicative
 * @method of
 * @instance
 * @example
 * // of Result a b :: c -> Result c d
 * import { Failure } from 'zoomjs/result';
 *
 * Failure.of(1);
 * // => Failure(1)
 *
 * @this Result
 * @param  {A} value The value to put in the Result
 * @return {Result<A, B>}
 */
Failure.prototype.of = function of(value) {
  return Failure.of(value);
};

/**
 * @description Apply a transformation to the Result if it is an instance
 * of "Success". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Success' to 'Failure' instance and stop
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
 * import { Failure, Success } from 'zoomjs/result';
 *
 * // toUpper :: String -> Result String String
 * const toUpper = x =>
 *   typeof x !== 'string'
 *     ? Failure.of('toUpper() recieved a non string.')
 *     : Success.of(x.toUpperCase());
 *
 * // A "Success" will apply the next operation
 * Success.of('boom').chain(toUpper);
 * // => Success(BOOM)
 *
 * // A "Failure" will ignore the next operation
 * Failure.of('yea right').chain(toUpper);
 * // => Failure(yea right)
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
 * of "Success". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Success' to 'Failure' instance and stop
 * subsequent transformations from being applied. An alias for {@link Result#chain}
 *
 * @memberof Result
 * @since 1.0.0-beta
 * @method
 * @instance
 * @see {@link Result#chain}
 * @example
 * // andThen Result a b :: (b -> Result a c) -> Result a c
 * import { Failure, Success } from 'zoomjs/result';
 *
 * // toUpper :: String -> Result String String
 * const toUpper = x =>
 *   typeof x !== 'string'
 *     ? Failure.of('toUpper() recieved a non string.')
 *     : Success.of(x.toUpperCase());
 *
 * // A "Success" will apply the next operation
 * Success.of('boom').andThen(toUpper);
 * // => Success(BOOM)
 *
 * // A "Failure" will ignore the next operation
 * Failure.of('yea right').andThen(toUpper);
 * // => Failure(yea right)
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
 * import { Failure, Success } from 'zoomjs/result';
 *
 * // toUpper :: String -> String
 * const toUpper = x => x.toUpperCase();
 *
 * // A "Success" will run the next operation
 * Success.of('yay').map(toUpper);
 * // => Success('YAY!');
 *
 * // A "Failure" will ignore the next operation
 * Failure.of('nay!').map(toUpper);
 * // => Failure('nay!');
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
 * import { ap, Failure, Success } from 'zoomjs';
 *
 * // toUpperE :: Result a (String -> String)
 * const toUpperE = Success(x => x.toUpperCase());
 *
 * // A "Success" will apply the next operation
 * Success.of('boom').ap(toUpperE);
 * // => Success(BOOM)
 *
 * // A "Failure" will ignore the next operation
 * Failure.of('yea right').ap(toUpperE);
 * // => Failure(yea right)
 *
 * @this Result
 * @param  {Result<A, function>} apply An result containing a function to run on the value
 * @return {Result<A, C>}
 */
Result.prototype.ap = function ap(apply) {
  return Result.ap(apply, this);
};

/**
 * @description Determine if an Result is an instance of Failure
 * @memberof Result
 * @since 1.0.0-beta
 * @method
 * @instance
 * @example
 * // isFailure Result a b :: c -> Bool
 * import { Failure, Success } from 'zoomjs/result';
 *
 * Failure.of(1).isFailure(); // true
 * Success.of(1).isFailure(); // false
 *
 * @this Result
 * @return {Boolean}
 */
Result.prototype.isFailure = function isFailure() {
  return Result.isFailure(this);
};

/**
 * @description Determine if an Result is an instance of Success
 * @memberof Result
 * @since 1.0.0-beta
 * @method
 * @instance
 * @example
 * // isSuccess Result a b :: c -> Bool
 * import { Failure, Success } from 'zoomjs/result';
 *
 * Success.of(1).isSuccess(); // true
 * Failure.of(1).isSuccess(); // false
 *
 * @this Result
 * @return {Boolean}
 */
Result.prototype.isSuccess = function isSuccess() {
  return Result.isSuccess(this);
};

export default Result;
