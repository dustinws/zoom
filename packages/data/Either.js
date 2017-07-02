'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('../core/__');

var _2 = _interopRequireDefault(_);

var _adt = require('../adt');

var _curry = require('../core/curry');

var _curry2 = _interopRequireDefault(_curry);

var _compose = require('../core/compose');

var _compose2 = _interopRequireDefault(_compose);

var _constant = require('../core/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The Either super class.
 *
 * @class Either
 * @memberof module:data
 */
var Either = (0, _adt.union)('Either', {
  Right: ['value'],
  Left: ['value']
});

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Lift a value into a successful 'Right' context.
 * @memberof module:data.Either
 * @function
 * @since v1.0.0
 * @example
 * import { Either } from '@dustinws/zoom/packages/data';
 *
 * const valid = Either.of(1);
 *
 * valid.toString() // 'Right(1)'
 *
 * @param  {Any} value The value to put in the Either
 * @return {Either}
 */
Either.of = Either.Right;

/**
 * @description Lift a value into a successful 'Right' context.
 * @memberof module:data.Either
 * @function
 * @since v1.0.0
 * @example
 * import { Either } from '@dustinws/zoom/packages/data';
 *
 * const valid = Either.Right.of(1);
 *
 * valid.toString() // 'Right(1)'
 *
 * @param  {Any} value The value to put in the Either
 * @return {Either}
 */
Either.Right.of = Either.Right;

/**
 * @description Lift a value into an unsuccessful 'Left' context.
 * @memberof module:data.Either
 * @function
 * @since v1.0.0
 * @example
 * import { Either } from '@dustinws/zoom/packages/data';
 *
 * const valid = Either.Left.of(1);
 *
 * valid.toString() // 'Left(1)'
 *
 * @param  {Any} value The value to put in the Either
 * @return {Either}
 */
Either.Left.of = Either.Left.prototype.of = function of(value) {
  return Either.Left(value);
};

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Right' to 'Left' instance and stop
 * subsequent transformations from being applied.
 * @memberof module:data.Either
 * @since v1.0.0
 * @function
 * @example
 * import { Either } from '@dustinws/zoom/packages/data';
 *
 * const valid = Either.Right.of('yay!');
 * const invalid = Either.Left.of('nay!');
 *
 * const toUpper = x => Either.Right.of(x.toUpperCase());
 *
 * Either.chain(toUpper, valid); // Right('YAY!');
 * Either.chain(toUpper, invalid); // Left('nay!');
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @return {Either}
 */
Either.chain = (0, _curry2.default)(function (transform, either) {
  return either.cata({
    Left: (0, _constant2.default)(either),
    Right: transform
  });
});

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * @memberof module:data.Either
 * @since v1.0.0
 * @function
 * @example
 * import { Either } from '@dustinws/zoom/packages/data';
 *
 * const valid = Either.Right.of('yay!');
 * const failure = Either.Left.of('nay!');
 *
 * const toUpper = x => x.toUpperCase();
 *
 * Either.map(toUpper, valid); // Right('YAY!');
 * Either.map(toUpper, invalid); // Left('nay!');
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @return {Either}
 */
Either.map = (0, _curry2.default)(function (transform, either) {
  return Either.chain((0, _compose2.default)(Either.of, transform), either);
});

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * @memberof module:data.Either
 * @since v1.0.0
 * @function
 * @example
 * import { Either } from '@dustinws/zoom/packages/data';
 *
 * const valid = Either.Right.of('yay!');
 * const failure = Either.Left.of('nay!');
 *
 * const toUpper = Either.of(x => x.toUpperCase());
 *
 * Either.ap(toUpper, valid); // Right('YAY!');
 * Either.ap(toUpper, invalid); // Left('nay!');
 *
 * @param  {Either} left The either containing a value
 * @param  {Either} right The either containing a function to run on the value
 * @return {Either}
 */
Either.ap = (0, _curry2.default)(function (left, right) {
  return Either.chain(Either.map(_2.default, left), right);
});

/**
 * @description Determine if an Either is an instance of Left
 * @memberof module:data/Either
 * @since v1.0.0
 * @function
 * @example
 * import { Either } from '@dustinws/zoom/packages/data';
 *
 * Either.isLeft(Either.Left.of(1)); // true
 * Either.isLeft(Either.Right.of(1)); // false
 *
 * @param  {Either} either The either to query
 * @return {Boolean}
 */
Either.isLeft = function (either) {
  return either instanceof Either.Left;
};

/**
 * @description Determine if an Either is an instance of Right
 * @memberof module:data/Either
 * @since v1.0.0
 * @function
 * @example
 * import { Either } from '@dustinws/zoom/packages/data';
 *
 * Either.isRight(Either.Right.of(1)); // true
 * Either.isRight(Either.Left.of(1)); // false
 *
 * @param  {Either} either The either to query
 * @return {Boolean}
 */
Either.isRight = function (either) {
  return either instanceof Either.Right;
};

/**
 * @description Create a function that returns a Right when it is successful
 * and returns a Left when it throws.
 * @since v1.0.0
 * @memberof module:data/Either
 * @function
 * @example
 * import { Either } from '@dustinws/zoom/packages/data';
 *
 * const parse = Either.try(JSON.parse);
 *
 * parse('{ "foo": "bar" }').isRight(); // true
 * parse('...').isRight(); // false
 *
 * @param  {Function} func
 * @return {Function}
 */
Either.try = function (func) {
  return function () {
    try {
      return Either.Right(func.apply(undefined, arguments));
    } catch (error) {
      return Either.Left(error);
    }
  };
};

exports.default = Either;
module.exports = exports['default'];