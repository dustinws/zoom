import __ from '../lambda/__';
import { union } from '../adt';
import curry from '../lambda/curry';
import compose from '../lambda/compose';
import constant from '../lambda/constant';

/**
 * @class Validation
 * @memberof module:Zoom.Data
 */
const Validation = union('Validation', {
  Success: ['value'],
  Failure: ['value'],
});

const Success = Validation.Success;
const Failure = Validation.Failure;

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Lift a value into a successful 'Success' context.
 * @memberof module:Zoom.Data.Validation
 * @function of
 * @since v1.15.0
 * @example
 * import { Validation } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Validation
 * @function
 * @since v1.15.0
 * @example
 * import { Validation } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Validation
 * @function
 * @since v1.15.0
 * @example
 * import { Validation } from '@dustinws/zoom/data';
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
 * subsequent transformations from being applied.
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @function chain
 * @example
 * import { Validation } from '@dustinws/zoom/data';
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
Validation.chain = curry((transform, validation) =>
  validation.cata({
    Failure: constant(validation),
    Success: transform,
  }));

/**
 * @description Apply a transformation to the Validation if it is an instance
 * of "Success". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @function map
 * @example
 * import { Validation } from '@dustinws/zoom/data';
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
Validation.map = curry((transform, validation) =>
  Validation.chain(compose(Validation.of, transform), validation));

/**
 * @description Apply a transformation to the Validation if it is an instance
 * of "Success". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @function ap
 * @example
 * import { Validation } from '@dustinws/zoom/data';
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
Validation.ap = curry((left, right) =>
  Validation.chain(Validation.map(__, right), left));

/**
 * @description Determine if an Validation is an instance of Failure
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @function isFailure
 * @example
 * import { Validation } from '@dustinws/zoom/data';
 *
 * Validation.isFailure(Validation.Failure.of(1)); // true
 * Validation.isFailure(Validation.Success.of(1)); // false
 *
 * @param  {Validation} validation The validation to query
 * @return {Boolean}
 */
Validation.isFailure = validation => validation instanceof Validation.Failure;

/**
 * @description Determine if an Validation is an instance of Success
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @function isSuccess
 * @example
 * import { Validation } from '@dustinws/zoom/data';
 *
 * Validation.isSuccess(Validation.Success.of(1)); // true
 * Validation.isSuccess(Validation.Failure.of(1)); // false
 *
 * @param  {Validation} validation The validation to query
 * @return {Boolean}
 */
Validation.isSuccess = validation => validation instanceof Validation.Success;

/**
 * @description Combine two validations into one with a bias towards Failures.
 * If both values are the same type (both Failures, etc..) then their values
 * will be concatenated and a single instance of that type will be returned.
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @function concat
 * @example
 * import { Validation } from '@dustinws/zoom/data';
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
Validation.concat = curry((left, right) =>
  left.cata({
    Failure: value =>
      right.cata({
        Success: constant(left),
        Failure: x => Validation.Failure(value.concat(x)),
      }),

    Success: value =>
      right.cata({
        Success: x => Validation.Success(value.concat(x)),
        Failure: constant(right),
      }),
  }));

/**
 * @description Create an empty Validation. Used as the "identity" element
 * for the Validation monoid.
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @function empty
 * @example
 * import { Validation } from '@dustinws/zoom/data';
 *
 * Validation.empty(); // Success([])
 *
 * @return {Validation}
 */
Validation.empty = () =>
  Validation.Success([]);


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Lift a value into a successful 'Success' context.
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @example
 * import { Validation } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @example
 * import { Validation } from '@dustinws/zoom/data';
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
 * subsequent transformations from being applied.
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @example
 * import { Validation } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @example
 * import { Validation } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @example
 * import { Validation } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @example
 * import { Validation } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @example
 * import { Validation } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @example
 * import { Validation } from '@dustinws/zoom/data';
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

export default Validation;
