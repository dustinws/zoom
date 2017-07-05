'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('ramda/src/__');

var _2 = _interopRequireDefault(_);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _always = require('ramda/src/always');

var _always2 = _interopRequireDefault(_always);

var _adt = require('../adt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class Validation
 * @description
 * #### Fantasy Land Implementations
 * `Semigroup`, `Monoid`, `Applicative`, `Functor`, `Apply`, `Chain`, `Monad`
 *
 * ---
 *
 * `Validation` is a lot like `Either` <small>(in most cases they are interchangeable)
 * </small> but with a few small differences.
 *
 * `Either` is great when you want to fail quickly, at the first error
 * that occurs. However, what if you wanted to know _all_ possible errors that
 * could have occurred? `Either` can only store one error at a time, so you
 * can't use it to accumulate errors.
 *
 * This is where `Validation` comes in. It acts as an accumulator for errors,
 * and it also supports parallel validation. This means that you can split up
 * validations across multiple processes <small>(if your use case needs it)
 * </small>. This works because of the {@link Validation.concat} function. It
 * knows how to combine multiple validation instances, and it has a bias towards
 * the `Failure` case.
 *
 * Let's show this in action with a simple nightclub app. We need to validate
 * all guests that want to enter the club, and then charge them a cover fee.
 * There are a few reasons why someone would be denied, and if they are, we
 * want to tell them all of the reasons they were denied.
 *
 * @example
 * import { Failure, Success, concat, empty } from 'zoomjs/validation';
 *
 * const checkAge = guest =>
 *   guest.age < 21
 *     ? Failure(['Too Young!'])
 *     : Success(guest);
 *
 * const checkSobriety = guest =>
 *   guest.bac > 0.07
 *     ? Failure(['Too Drunk!'])
 *     : Success(guest);
 *
 * // Our main validation function
 * const validateGuest = (guest) => {
 *   const validations = [
 *     checkAge(guest),
 *     checkSobriety(guest),
 *   ];
 *
 *   // Here we reduce all validations down to a single validation.
 *   // It will either return a Failure with an array of errors,
 *   // or a Success with the guest.
 *   return validations.reduce(concat, empty());
 * };
 *
 * // All valid
 * validateGuest({
 *   age: 21,
 *   bac: 0.04
 * });
 * // => Success({ age: 21, bac: 0.04 })
 *
 * // Not old enough
 * validateGuest({
 *   age: 20,
 *   bac: 0.04
 * });
 * // => Failure(['Too Young!'])
 *
 * // Not old enough and a little too tipsy
 * validateGuest({
 *   age: 20,
 *   bac: 0.08
 * });
 * // => Failure(['Too Young!', 'Too Drunk!'])
 */
var Validation = (0, _adt.union)('Validation', {
  /**
   * @class Validation.Success
   * @extends Validation
   */
  Success: ['value'],

  /**
   * @class Validation.Failure
   * @extends Validation
   */
  Failure: ['value']
});

var Success = Validation.Success;
var Failure = Validation.Failure;

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Lift a value into a successful 'Success' context.
 * @memberof Validation
 * @function of
 * @static
 * @implements Applicative
 * @since v1.15.0
 * @example
 * // of :: a -> Validation b a
 * import { Validation } from 'zoomjs';
 *
 * const valid = Validation.of(1);
 *
 * valid.toString() // 'Success(1)'
 *
 * @param  {Any} value The value to put in the Validation
 * @return {Validation}
 */
Validation.of = function of(value) {
  return Success(value);
};

/**
 * @description Lift a value into a successful 'Success' context.
 * @memberof Validation.Success
 * @function of
 * @static
 * @implements Applicative
 * @since v1.15.0
 * @example
 * // of :: a -> Validation b a
 * import { Validation } from 'zoomjs';
 *
 * const valid = Validation.Success.of(1);
 *
 * valid.toString() // 'Success(1)'
 *
 * @param  {Any} value The value to put in the Validation
 * @return {Validation}
 */
Success.of = function of(value) {
  return Success(value);
};

/**
 * @description Lift a value into an unsuccessful 'Failure' context.
 * @memberof Validation.Failure
 * @function of
 * @static
 * @implements Applicative
 * @since v1.15.0
 * @example
 * // of :: a -> Validation a b
 * import { Validation } from 'zoomjs';
 *
 * const valid = Validation.Failure.of(1);
 *
 * valid.toString() // 'Failure(1)'
 *
 * @param  {Any} value The value to put in the Validation
 * @return {Validation}
 */
Failure.of = function of(value) {
  return Failure(value);
};

/**
 * @description Apply a transformation to the Validation if it is an instance
 * of "Success". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Success' to 'Failure' instance and stop
 * subsequent transformations from being applied. An alias for {@link Validation.andThen}
 * @memberof Validation
 * @since v1.15.0
 * @see {@link Validation.andThen}
 * @function chain
 * @static
 * @implements Chain
 * @example
 * // chain :: Validation v =>  (b -> v a c) -> v a b -> v a c
 * import { Validation } from 'zoomjs';
 *
 * const valid = Validation.Success.of('yay!');
 * const invalid = Validation.Failure.of('nay!');
 *
 * const toUpper = x => Validation.Success.of(x.toUpperCase());
 *
 * Validation.chain(toUpper, valid); // Success('YAY!');
 * Validation.chain(toUpper, invalid); // Failure('nay!');
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @param  {Validation} validation The transformation to apply to the inner value
 * @return {Validation}
 */
Validation.chain = (0, _curry2.default)(function (transform, validation) {
  return validation.cata({
    Failure: (0, _always2.default)(validation),
    Success: transform
  });
});

/**
 * @description Apply a transformation to the Validation if it is an instance
 * of "Success". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Success' to 'Failure' instance and stop
 * subsequent transformations from being applied. An alias for
 * {@link Validation.chain}
 * @memberof Validation
 * @since v1.15.0
 * @function andThen
 * @static
 * @see {@link Validation.chain}
 * @example
 * // andThen :: Validation v => (b -> v a c) -> v a b -> v a c
 * import { Validation } from 'zoomjs';
 *
 * const valid = Validation.Success.of('yay!');
 * const invalid = Validation.Failure.of('nay!');
 *
 * const toUpper = x => Validation.Success.of(x.toUpperCase());
 *
 * Validation.andThen(toUpper, valid); // Success('YAY!');
 * Validation.andThen(toUpper, invalid); // Failure('nay!');
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @param  {Validation} validation The transformation to apply to the inner value
 * @return {Validation}
 */
Validation.andThen = Validation.chain;

/**
 * @description Apply a transformation to the Validation if it is an instance
 * of "Success". Otherwise, ignore the transformation and return the instance.
 * @memberof Validation
 * @since v1.15.0
 * @function map
 * @static
 * @implements Functor
 * @example
 * // map :: Validation v => (b -> c) -> v a b -> v a c
 * import { Validation } from 'zoomjs';
 *
 * const valid = Validation.Success.of('yay!');
 * const failure = Validation.Failure.of('nay!');
 *
 * const toUpper = x => x.toUpperCase();
 *
 * Validation.map(toUpper, valid); // Success('YAY!');
 * Validation.map(toUpper, invalid); // Failure('nay!');
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @param  {Validation} validation The validation
 * @return {Validation}
 */
Validation.map = (0, _curry2.default)(function (transform, validation) {
  return Validation.chain((0, _compose2.default)(Validation.of, transform), validation);
});

/**
 * @description Apply a transformation to the Validation if it is an instance
 * of "Success". Otherwise, ignore the transformation and return the instance.
 * @memberof Validation
 * @since v1.15.0
 * @function ap
 * @static
 * @implements Apply
 * @example
 * // ap :: Validation v => Apply (b -> c) -> v a b -> v a c
 * import { Validation } from 'zoomjs';
 *
 * const valid = Validation.Success.of('yay!');
 * const failure = Validation.Failure.of('nay!');
 *
 * const toUpper = Validation.of(x => x.toUpperCase());
 *
 * Validation.ap(toUpper, valid); // Success('YAY!');
 * Validation.ap(toUpper, invalid); // Failure('nay!');
 *
 * @param  {Validation} left The validation containing a function to run on the value
 * @param  {Validation} right The validation containing a value
 * @return {Validation}
 */
Validation.ap = (0, _curry2.default)(function (left, right) {
  return Validation.chain(Validation.map(_2.default, right), left);
});

/**
 * @description Determine if an Validation is an instance of Failure
 * @memberof Validation
 * @since v1.15.0
 * @function isFailure
 * @static
 * @example
 * // isFailure :: Validation a b -> Bool
 * import { Validation } from 'zoomjs';
 *
 * Validation.isFailure(Validation.Failure.of(1)); // true
 * Validation.isFailure(Validation.Success.of(1)); // false
 *
 * @param  {Validation} validation The validation to query
 * @return {Boolean}
 */
Validation.isFailure = function (validation) {
  return validation instanceof Validation.Failure;
};

/**
 * @description Determine if an Validation is an instance of Success
 * @memberof Validation
 * @since v1.15.0
 * @function isSuccess
 * @static
 * @example
 * // isSuccess :: Validation a b -> Bool
 * import { Validation } from 'zoomjs';
 *
 * Validation.isSuccess(Validation.Success.of(1)); // true
 * Validation.isSuccess(Validation.Failure.of(1)); // false
 *
 * @param  {Validation} validation The validation to query
 * @return {Boolean}
 */
Validation.isSuccess = function (validation) {
  return validation instanceof Validation.Success;
};

/**
 * @description Combine two validations into one with a bias towards Failures.
 * If both values are the same type (both Failures, etc..) then their values
 * will be concatenated and a single instance of that type will be returned.
 * @memberof Validation
 * @since v1.15.0
 * @function concat
 * @static
 * @implements Semigroup
 * @example
 * // concat :: Validation v => v a b -> v a b -> v a b
 * import { Validation } from 'zoomjs';
 *
 * const failure = Validation.Failure.of(['fail!']);
 * const success = Validation.Success.of(['win!']);
 *
 * Validation.concat(failure, success); // failure
 * Validation.concat(success, failure); // failure
 * Validation.concat(failure, failure); // Failure(['fail!', 'fail!'])
 * Validation.concat(success, success); // Success(['win!', 'win!'])
 *
 * @param  {Validation} left The first validation
 * @param  {Validation} right The second validation
 * @return {Validation}
 */
Validation.concat = (0, _curry2.default)(function (left, right) {
  return left.cata({
    Failure: function Failure(value) {
      return right.cata({
        Success: (0, _always2.default)(left),
        Failure: function Failure(x) {
          return Validation.Failure(value.concat(x));
        }
      });
    },

    Success: function Success(value) {
      return right.cata({
        Success: function Success(x) {
          return Validation.Success(value.concat(x));
        },
        Failure: (0, _always2.default)(right)
      });
    }
  });
});

/**
 * @description Create an empty Validation. Used as the "identity" element
 * for the Validation monoid.
 * @memberof Validation
 * @since v1.15.0
 * @function empty
 * @static
 * @implements Monoid
 * @example
 * // empty :: a -> Validation b [c]
 * import { Validation } from 'zoomjs';
 *
 * Validation.empty(); // Success([])
 *
 * @return {Validation}
 */
Validation.empty = function () {
  return Validation.Success([]);
};

/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

/**
 * @description A function that accepts an object with two functions, one
 * to run if the either is an instance of `Success`, and one to run if the
 * either is an instance of `Failure`. The return value will be returned
 * directly, with no wrapper instance. This name is short for `catamorphism`.
 * An alias for {@link Validation#caseOf}
 * @memberof Validation
 * @since v1.0.0
 * @method
 * @instance
 * @see {@link Validation#caseOf}
 * @example
 * // cata Validation a b :: { Failure: a -> c, Success: b -> c } -> c
 * import { Validation } from 'zoomjs';
 *
 * Validation.of('foobar').cata({
 *   Success(foobar) {
 *     // Do something with foobar
 *   },
 *
 *   Failure(error) {
 *     // Handle the error
 *   },
 * });
 *
 * @param  {Object} cases The cases to match against.
 * @return {Validation}
 */
Validation.prototype.cata = Validation.prototype.cata;

/**
 * @description A function that accepts an object with two functions, one
 * to run if the either is an instance of `Success`, and one to run if the
 * either is an instance of `Failure`. The return value will be returned
 * directly, with no wrapper instance. This name is short for `catamorphism`.
 * An alias for {@link Validation#cata}
 * @memberof Validation
 * @since v1.17.0
 * @method
 * @instance
 * @see {@link Validation#cata}
 * @example
 * // caseOf Validation a b :: { Failure: a -> c, Success: b -> c } -> c
 * import { Validation } from 'zoomjs';
 *
 * Validation.of('foobar').caseOf({
 *   Success(foobar) {
 *     // Do something with foobar
 *   },
 *
 *   Failure(error) {
 *     // Handle the error
 *   },
 * });
 *
 * @param  {Object} cases The cases to match against.
 * @return {Validation}
 */
Validation.prototype.caseOf = Validation.prototype.cata;

/**
 * @description Lift a value into a successful 'Success' context.
 * @memberof Validation.Success
 * @since v1.15.0
 * @method
 * @instance
 * @implements Applicative
 * @example
 * import { Validation } from 'zoomjs';
 *
 * const valid = Validation.();
 *
 * valid.of(1); // Success(1)
 *
 * @param  {Any} value The value to put in the Validation
 * @return {Validation}
 */
Success.prototype.of = function of(value) {
  return Success.of(value);
};

/**
 * @description Lift a value into an unsuccessful 'Failure' context.
 * @memberof Validation.Failure
 * @since v1.15.0
 * @method
 * @instance
 * @implements Applicative
 * @example
 * import { Validation } from 'zoomjs';
 *
 * const invalid = Validation.();
 *
 * invalid.of(1); // Failure(1)
 *
 * @param  {Any} value The value to put in the Validation
 * @return {Validation}
 */
Failure.prototype.of = function of(value) {
  return Failure.of(value);
};

/**
 * @description Apply a transformation to the Validation if it is an instance
 * of "Success". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Success' to 'Failure' instance and stop
 * subsequent transformations from being applied. An alias for {@link Validation#andThen}
 * @memberof Validation
 * @since v1.15.0
 * @see {@link Validation#andThen}
 * @method
 * @instance
 * @implements Chain
 * @example
 * // chain Validation a b :: (b -> Validation a c) -> Validation a c
 * import { Validation } from 'zoomjs';
 *
 * const valid = Validation.Success.of('yay!');
 * const invalid = Validation.Failure.of('nay!');
 *
 * const toUpper = x => Validation.Success.of(x.toUpperCase());
 *
 * valid.chain(toUpper); // Success('YAY!');
 * invalid.chain(toUpper); // Failure('nay!');
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @return {Validation}
 */
Validation.prototype.chain = function chain(transform) {
  return Validation.chain(transform, this);
};

/**
 * @description Apply a transformation to the Validation if it is an instance
 * of "Success". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Success' to 'Failure' instance and stop
 * subsequent transformations from being applied. An alias for {@link Validation#chain}
 * @memberof Validation
 * @since v1.15.0
 * @see {@link Validation#chain}
 * @method
 * @instance
 * @example
 * // andThen Validation a b :: (b -> Validation a c) -> Validation a c
 * import { Validation } from 'zoomjs';
 *
 * const valid = Validation.Success.of('yay!');
 * const invalid = Validation.Failure.of('nay!');
 *
 * const toUpper = x => Validation.Success.of(x.toUpperCase());
 *
 * valid.andThen(toUpper); // Success('YAY!');
 * invalid.andThen(toUpper); // Failure('nay!');
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @return {Validation}
 */
Validation.prototype.andThen = function andThen(transform) {
  return Validation.chain(transform, this);
};

/**
 * @description Apply a transformation to the Validation if it is an instance
 * of "Success". Otherwise, ignore the transformation and return the instance.
 * @memberof Validation
 * @since v1.15.0
 * @method
 * @instance
 * @implements Functor
 * @example
 * // map Validation a b :: (b -> c) -> Validation a c
 * import { Validation } from 'zoomjs';
 *
 * const valid = Validation.Success.of('yay!');
 * const failure = Validation.Failure.of('nay!');
 *
 * const toUpper = x => x.toUpperCase();
 *
 * valid.map(toUpper); // Success('YAY!');
 * invalid.map(toUpper); // Failure('nay!');
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @return {Validation}
 */
Validation.prototype.map = function map(transform) {
  return Validation.map(transform, this);
};

/**
 * @description Apply a transformation to the Validation if it is an instance
 * of "Success". Otherwise, ignore the transformation and return the instance.
 * @memberof Validation
 * @since v1.15.0
 * @method
 * @instance
 * @implements Apply
 * @example
 * // ap Validation a b :: Apply (b -> c) -> Validation a c
 * import { Validation } from 'zoomjs';
 *
 * const valid = Validation.Success.of('yay!');
 * const failure = Validation.Failure.of('nay!');
 *
 * const toUpper = Validation.of(x => x.toUpperCase());
 *
 * valid.ap(toUpper); // Success('YAY!');
 * invalid.ap(toUpper); // Failure('nay!');
 *
 * @param  {Validation} apply A validation containing a function to run on the value
 * @return {Validation}
 */
Validation.prototype.ap = function ap(apply) {
  return Validation.ap(apply, this);
};

/**
 * @description Determine if an Validation is an instance of Failure
 * @memberof Validation
 * @since v1.15.0
 * @method
 * @instance
 * @example
 * // isFailure Validation a b :: c -> Bool
 * import { Validation } from 'zoomjs';
 *
 * Validation.Failure.of(1).isFailure(); // true
 * Validation.Success.of(1).isFailure(); // false
 *
 * @param  {Validation} validation The validation to query
 * @return {Boolean}
 */
Validation.prototype.isFailure = function isFailure() {
  return Validation.isFailure(this);
};

/**
 * @description Determine if an Validation is an instance of Success
 * @memberof Validation
 * @since v1.15.0
 * @method
 * @instance
 * @example
 * // isSuccess Validation a b :: c -> Bool
 * import { Validation } from 'zoomjs';
 *
 * Validation.Success.of(1).isSuccess(); // true
 * Validation.Failure.of(1).isSuccess(); // false
 *
 * @param  {Validation} validation The validation to query
 * @return {Boolean}
 */
Validation.prototype.isSuccess = function isSuccess() {
  return Validation.isSuccess(this);
};

/**
 * @description Combine two validations into one with a bias towards Failures.
 * If both values are the same type (both Failures, etc..) then their values
 * will be concatenated and a single instance of that type will be returned.
 * @memberof Validation
 * @since v1.15.0
 * @method
 * @instance
 * @implements Semigroup
 * @example
 * concat Validation a b :: Validation a b -> Validation a b
 * import { Validation } from 'zoomjs';
 *
 * const failure = Validation.Failure.of(['fail!']);
 * const success = Validation.Success.of(['win!']);
 *
 * success.concat(failure); // failure
 * failure.concat(success); // failure
 * failure.concat(failure); // Failure(['fail!', 'fail!'])
 * success.concat(success); // Success(['win!', 'win!'])
 *
 * @param  {Validation} other The validation to join with
 * @return {Validation}
 */
Validation.prototype.concat = function concat(other) {
  return Validation.concat(other, this);
};

exports.default = Validation;
module.exports = exports['default'];