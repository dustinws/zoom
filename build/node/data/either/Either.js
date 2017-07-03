'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('../../lambda/__');

var _2 = _interopRequireDefault(_);

var _adt = require('../../adt');

var _curry = require('../../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

var _compose = require('../../lambda/compose');

var _compose2 = _interopRequireDefault(_compose);

var _constant = require('../../lambda/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Either = (0, _adt.union)('Either', {
  Right: ['value'],
  Left: ['value']
});

var Right = Either.Right;
var Left = Either.Left;

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Lift a value into a successful 'Right' context.
 * @memberof module:Zoom.Data.Either
 * @function of
 * @since v1.15.0
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * const valid = Either.of(1);
 *
 * valid.toString() // 'Right(1)'
 *
 * @param  {Any} value The value to put in the Either
 * @return {Either}
 */
Either.of = function of(value) {
  return Right(value);
};

/**
 * @description Lift a value into a successful 'Right' context.
 * @memberof module:Zoom.Data.Either
 * @function
 * @since v1.15.0
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * const valid = Either.Right.of(1);
 *
 * valid.toString() // 'Right(1)'
 *
 * @param  {Any} value The value to put in the Either
 * @return {Either}
 */
Right.of = function of(value) {
  return Right(value);
};

/**
 * @description Lift a value into an unsuccessful 'Left' context.
 * @memberof module:Zoom.Data.Either
 * @function
 * @since v1.15.0
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * const valid = Either.Left.of(1);
 *
 * valid.toString() // 'Left(1)'
 *
 * @param  {Any} value The value to put in the Either
 * @return {Either}
 */
Left.of = function of(value) {
  return Left(value);
};

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Right' to 'Left' instance and stop
 * subsequent transformations from being applied. An alias for
 * [Either.andThen](https://dustinws.github.io/zoom/module-Zoom.Data.Either.html#.andThen)
 * @memberof module:Zoom.Data.Either
 * @since v1.15.0
 * @function chain
 * @see [Either.andThen](https://dustinws.github.io/zoom/module-Zoom.Data.Either.html#.andThen)
 * @example
 * import { Either } from '@dustinws/zoom/data';
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
 * @param  {Either} either The either instance.
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
 * This is how you can switch from a 'Right' to 'Left' instance and stop
 * subsequent transformations from being applied. An alias for
 * [Either.chain](https://dustinws.github.io/zoom/module-Zoom.Data.Either.html#.chain)
 * @memberof module:Zoom.Data.Either
 * @since v1.17.0
 * @function andThen
 * @see [Either.chain](https://dustinws.github.io/zoom/module-Zoom.Data.Either.html#.chain)
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * const valid = Either.Right.of('yay!');
 * const invalid = Either.Left.of('nay!');
 *
 * const toUpper = x => Either.Right.of(x.toUpperCase());
 *
 * Either.andThen(toUpper, valid); // Right('YAY!');
 * Either.andThen(toUpper, invalid); // Left('nay!');
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @param  {Either} either The either instance.
 * @return {Either}
 */
Either.andThen = Either.chain;

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Either
 * @since v1.15.0
 * @function map
 * @example
 * import { Either } from '@dustinws/zoom/data';
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
 * @param  {Either} either The either instance.
 * @return {Either}
 */
Either.map = (0, _curry2.default)(function (transform, either) {
  return Either.chain((0, _compose2.default)(Either.of, transform), either);
});

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Either
 * @since v1.15.0
 * @function ap
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * const valid = Either.Right.of('yay!');
 * const failure = Either.Left.of('nay!');
 *
 * const toUpper = Either.of(x => x.toUpperCase());
 *
 * Either.ap(toUpper, valid); // Right('YAY!');
 * Either.ap(toUpper, invalid); // Left('nay!');
 *
 * @param  {Either} left The either containing a function to run on the value
 * @param  {Either} right The either containing a value
 * @return {Either}
 */
Either.ap = (0, _curry2.default)(function (left, right) {
  return Either.chain(Either.map(_2.default, right), left);
});

/**
 * @description Determine if an Either is an instance of Left
 * @memberof module:Zoom.Data.Either
 * @since v1.15.0
 * @function isLeft
 * @example
 * import { Either } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Either
 * @since v1.15.0
 * @function isRight
 * @example
 * import { Either } from '@dustinws/zoom/data';
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
 * @since v1.15.0
 * @memberof module:Zoom.Data.Either
 * @function try
 * @example
 * import { Either } from '@dustinws/zoom/data';
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

/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

/**
 * @description A function that accepts an object with two functions, one
 * to run if the either is an instance of `Right`, and one to run if the
 * either is an instance of `Left`. The return value will be returned
 * directly, with no wrapper instance. This name is short for `catamorphism`.
 * An alias for [Either#caseOf](https://dustinws.github.io/zoom/module-Zoom.Data.Either.html#.Either#caseOf)
 * @memberof module:Zoom.Data.Either
 * @since v1.0.0
 * @function
 * @see [Either#caseOf](https://dustinws.github.io/zoom/module-Zoom.Data.Either.html#.Either#caseOf)
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * Either.Right.of('foobar').cata({
 *   Right(foobar) {
 *     // Do something with foobar
 *   },
 *
 *   Left(error) {
 *     // Handle the error
 *   },
 * });
 *
 * @param  {Object} cases The cases to match against.
 * @return {Either}
 */
Either.prototype.cata = Either.prototype.cata;

/**
 * @description A function that accepts an object with two functions, one
 * to run if the either is an instance of `Right`, and one to run if the
 * either is an instance of `Left`. The return value will be returned
 * directly, with no wrapper instance. An alias for An alias for [Either#cata](https://dustinws.github.io/zoom/module-Zoom.Data.Either.html#.Either#cata)
 * @memberof module:Zoom.Data.Either
 * @since v1.0.0
 * @see [Either#cata](https://dustinws.github.io/zoom/module-Zoom.Data.Either.html#.Either#cata)
 * @function
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * Either.Right.of('foobar').caseOf({
 *   Right(foobar) {
 *     // Do something with foobar
 *   },
 *
 *   Left(error) {
 *     // Handle the error
 *   },
 * });
 *
 * @param  {Object} cases The cases to match against.
 * @return {Either}
 */
Either.prototype.caseOf = Either.prototype.cata;

/**
 * @description Lift a value into a successful 'Right' context.
 * @memberof module:Zoom.Data.Either
 * @since v1.15.0
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * const valid = Either.Right.of(1);
 *
 * valid.toString() // 'Right(1)'
 *
 * @param  {Any} value The value to put in the Either
 * @return {Either}
 */
Right.prototype.of = function of(value) {
  return Right.of(value);
};

/**
 * @description Lift a value into an unsuccessful 'Left' context.
 * @memberof module:Zoom.Data.Either
 * @since v1.15.0
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * const valid = Either.Left.of(1);
 *
 * valid.toString() // 'Left(1)'
 *
 * @param  {Any} value The value to put in the Either
 * @return {Either}
 */
Left.prototype.of = function of(value) {
  return Left.of(value);
};

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Right' to 'Left' instance and stop
 * subsequent transformations from being applied. An alias for
 * [Either#andThen](https://dustinws.github.io/zoom/module-Zoom.Data.Either.html#.Either#andThen)
 * @memberof module:Zoom.Data.Either
 * @since v1.15.0
 * @see [Either#andThen](https://dustinws.github.io/zoom/module-Zoom.Data.Either.html#.Either#andThen)
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * const valid = Either.Right.of('yay!');
 * const invalid = Either.Left.of('nay!');
 *
 * const toUpper = x => Either.Right.of(x.toUpperCase());
 *
 * valid.chain(toUpper); // Right('YAY!');
 * invalid.chain(toUpper); // Left('nay!');
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @return {Either}
 */
Either.prototype.chain = function chain(transform) {
  return Either.chain(transform, this);
};

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Right' to 'Left' instance and stop
 * subsequent transformations from being applied. An alias for
 * [Either#chain](https://dustinws.github.io/zoom/module-Zoom.Data.Either.html#.Either#chain)
 * @memberof module:Zoom.Data.Either
 * @since v1.15.0
 * @see [Either#chain](https://dustinws.github.io/zoom/module-Zoom.Data.Either.html#.Either#chain)
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * const valid = Either.Right.of('yay!');
 * const invalid = Either.Left.of('nay!');
 *
 * const toUpper = x => Either.Right.of(x.toUpperCase());
 *
 * valid.andThen(toUpper); // Right('YAY!');
 * invalid.andThen(toUpper); // Left('nay!');
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @return {Either}
 */
Either.prototype.andThen = function andThen(transform) {
  return Either.chain(transform, this);
};

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Either
 * @since v1.15.0
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * const valid = Either.Right.of('yay!');
 * const failure = Either.Left.of('nay!');
 *
 * const toUpper = x => x.toUpperCase();
 *
 * valid.map(toUpper); // Right('YAY!');
 * invalid.map(toUpper); // Left('nay!');
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @return {Either}
 */
Either.prototype.map = function map(transform) {
  return Either.map(transform, this);
};

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Either
 * @since v1.15.0
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * const valid = Either.Right.of('yay!');
 * const failure = Either.Left.of('nay!');
 *
 * const toUpper = Either.of(x => x.toUpperCase());
 *
 * valid.ap(toUpper, valid); // Right('YAY!');
 * invalid.ap(toUpper, invalid); // Left('nay!');
 *
 * @param  {Either} apply An either containing a function to run on the value
 * @return {Either}
 */
Either.prototype.ap = function ap(apply) {
  return Either.ap(apply, this);
};

/**
 * @description Determine if an Either is an instance of Left
 * @memberof module:Zoom.Data.Either
 * @since v1.15.0
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * Either.Left.of(1).isLeft(); // true
 * Either.Right.of(1).isLeft(); // false
 *
 * @return {Boolean}
 */
Either.prototype.isLeft = function isLeft() {
  return Either.isLeft(this);
};

/**
 * @description Determine if an Either is an instance of Right
 * @memberof module:Zoom.Data.Either
 * @since v1.15.0
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * Either.Right.of(1).isRight(); // true
 * Either.Left.of(1).isRight(); // false
 *
 * @return {Boolean}
 */
Either.prototype.isRight = function isRight() {
  return Either.isRight(this);
};

exports.default = Either;
module.exports = exports['default'];