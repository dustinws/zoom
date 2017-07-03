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
 * @class Validation
 * @memberof module:Zoom.Data
 */
var Validation = (0, _adt.union)('Validation', {
  Success: ['value'],
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
 * @memberof module:Zoom.Data.Validation
 * @function of
 * @since v1.15.0
 * @example
 * import { Validation } from '@dustinws/zoom/packages/data';
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
 * import { Validation } from '@dustinws/zoom/packages/data';
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
 * import { Validation } from '@dustinws/zoom/packages/data';
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
 * import { Validation } from '@dustinws/zoom/packages/data';
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
    Failure: (0, _constant2.default)(validation),
    Success: transform
  });
});

/**
 * @description Apply a transformation to the Validation if it is an instance
 * of "Success". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @function map
 * @example
 * import { Validation } from '@dustinws/zoom/packages/data';
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
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @function ap
 * @example
 * import { Validation } from '@dustinws/zoom/packages/data';
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
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @function isFailure
 * @example
 * import { Validation } from '@dustinws/zoom/packages/data';
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
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @function isSuccess
 * @example
 * import { Validation } from '@dustinws/zoom/packages/data';
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
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @function concat
 * @example
 * import { Validation } from '@dustinws/zoom/packages/data';
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
        Success: (0, _constant2.default)(left),
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
        Failure: (0, _constant2.default)(right)
      });
    }
  });
});

/**
 * @description Create an empty Validation. Used as the "identity" element
 * for the Validation monoid.
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @function empty
 * @example
 * import { Validation } from '@dustinws/zoom/packages/data';
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
 * @description Lift a value into a successful 'Success' context.
 * @memberof module:Zoom.Data.Validation
 * @since v1.15.0
 * @example
 * import { Validation } from '@dustinws/zoom/packages/data';
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
 * import { Validation } from '@dustinws/zoom/packages/data';
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
 * import { Validation } from '@dustinws/zoom/packages/data';
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
 * import { Validation } from '@dustinws/zoom/packages/data';
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
 * import { Validation } from '@dustinws/zoom/packages/data';
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
 * import { Validation } from '@dustinws/zoom/packages/data';
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
 * import { Validation } from '@dustinws/zoom/packages/data';
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
 * import { Validation } from '@dustinws/zoom/packages/data';
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