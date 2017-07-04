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

/**
 * @class Either
 * @abstract
 * @description
 * `Either` is an abstraction around error handling that allows the user
 * to return their errors instead of throw them. `Either` is a super class
 * with two constructors, `Left` and `Right`. The `Right` constructor
 * represents a successful operation, and the `Left` constructor represents
 * an unsuccessful operation with an embedded error message. You can chain
 * functions that return `Either` instances by using `.chain` or `.andThen`.
 *
 * @example
 * import Either from '@dustinws/zoom/data/either';
 *
 * // Expose the constructors
 * const { Left, Right } = Either;
 *
 * // `Either.try` is a convenience function that wraps functions
 * // that can potentially throw in an Either.
 * const parseJson = Either.try(JSON.parse);
 *
 * // Ensure a user is an admin before going any further
 * const enforeAdminAccess = (user) => {
 *   if (!user.admin) {
 *     return Left('Must be an admin to continue');
 *   }
 *
 *   return Right(user);
 * };
 *
 * parseJson('{ "admin": false }')
 *   .andThen(enforceAdminAccess)
 *   .cata({
 *     Right(adminUser) {
 *       // Do something with the admin
 *     },
 *
 *     Left(error) {
 *       // Handle the error
 *     },
 *   });
 */
var Either = (0, _adt.union)('Either', {
  /**
   * @class Either.Right
   * @extends Either
   */
  Right: ['value'],

  /**
   * @class Either.Left
   * @extends Either
   */
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
 * @memberof Either
 * @since v1.15.0
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * Either.of(1).toString();
 * // => 'Right(1)'
 *
 * @param  {B} value The value to put in the Either
 * @return {Either<A, B>}
 */
Either.of = function of(value) {
  return Right(value);
};

/**
 * @description Lift a value into a successful 'Right' context.
 * @memberof Either
 * @since v1.15.0
 * @example
 * import { Right } from '@dustinws/zoom/data';
 *
 * Right.of(1).toString();
 * // => 'Right(1)'
 *
 * @param  {B} value The value to put in the Either
 * @return {Either<A, B>}
 */
Right.of = function of(value) {
  return Right(value);
};

/**
 * @description Lift a value into an unsuccessful 'Left' context.
 * @memberof Either
 * @since v1.15.0
 * @example
 * import { Left } from '@dustinws/zoom/data';
 *
 * Left.of(1).toString();
 * // => 'Left(1)'
 *
 * @param  {A} value The value to put in the Either
 * @return {Either<A, B>}
 */
Left.of = function of(value) {
  return Left(value);
};

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Right' to 'Left' instance and stop
 * subsequent transformations from being applied. An alias for {@link Either.andThen}
 * @memberof Either
 * @static
 * @function
 * @since v1.15.0
 * @see {@link Either.andThen}
 * @example
 * // chain Either a b :: (b -> Either a c) -> Either a c
 * import { chain, Left, Right } from '@dustinws/zoom/data/either';
 *
 * // toUpper :: String -> Either String String
 * const toUpper = x =>
 *   typeof x !== 'string'
 *     ? Left.of('toUpper() recieved a non string.')
 *     : Right.of(x.toUpperCase());
 *
 * // A "Right" will apply the next operation
 * chain(toUpper, Right.of('boom'));
 * // => Right(BOOM)
 *
 * // A "Left" will ignore the next operation
 * chain(toUpper, Left.of('yea right'));
 * // => Left(yea right)
 *
 * @param  {function} transform The transformation to apply to the inner value
 * @param  {Either<A, B>} either The either instance.
 * @return {Either<A, C>}
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
 * subsequent transformations from being applied. An alias for {@link Either.chain}
 * @memberof Either
 * @since v1.17.0
 * @function andThen
 * @static
 * @see {@link Either.chain}
 * @example
 * // andThen Either a b :: (b -> Either a c) -> Either a c
 * import { andThen, Left, Right } from '@dustinws/zoom/data/either';
 *
 * // toUpper :: String -> Either String String
 * const toUpper = x =>
 *   typeof x !== 'string'
 *     ? Left.of('toUpper() recieved a non string.')
 *     : Right.of(x.toUpperCase());
 *
 * // A "Right" will apply the next operation
 * andThen(toUpper, Right.of('boom'));
 * // => Right(BOOM)
 *
 * // A "Left" will ignore the next operation
 * andThen(toUpper, Left.of('yea right'));
 * // => Left(yea right)
 *
 * @param  {function} transform The transformation to apply to the inner value
 * @param  {Either<A, B>} either The either instance.
 * @return {Either<A, C>}
 */
Either.andThen = Either.chain;

/**
 * @description `map` is very similar to {@link Either.andThen} and
 * {@link Either.chain} in that it only runs the function if the
 * either is an instance of `Just`. The main difference is that {@link Either.andThen}
 * and {@link Either.chain} expect the functions you give them to return
 * new `Either` instances, and map let's you use plain old functions.
 * @memberof Either
 * @since v1.15.0
 * @function map
 * @static
 * @example
 * // map Either a b :: (b -> c) -> Either a c
 * import { map, Left, Right } from '@dustinws/zoom/data/either';
 *
 * // toUpper :: String -> String
 * const toUpper = x => x.toUpperCase();
 *
 * // A "Right" will run the next operation
 * map(toUpper, Right.of('yay'));
 * // => Right('YAY!');
 *
 * // A "Left" will ignore the next operation
 * map(toUpper, Left.of('nay!'));
 * // => Left('nay!');
 *
 * @param  {function} transform The transformation to apply to the inner value
 * @param  {Either<A, B>} either The either instance.
 * @return {Either<A, C>}
 */
Either.map = (0, _curry2.default)(function (transform, either) {
  return Either.chain((0, _compose2.default)(Either.of, transform), either);
});

/**
 * @description
 * `ap` is just like `map`, allowing a user to use plain old functions to
 * transform values hidden away in `Either`s. The only difference is that
 * instead of giving it the function, you give it an `Either` of the function.
 * This is known as the `Apply` type in fantasy land JS.
 *
 * @memberof Either
 * @since v1.15.0
 * @function ap
 * @static
 * @example
 * // ap :: Either e => e a b -> e a (b -> c) -> e a c
 * import { ap, Left, Right } from '@dustinws/zoom/data';
 *
 * // toUpperE :: Either a (String -> String)
 * const toUpperE = Right(x => x.toUpperCase());
 *
 * // A "Right" will apply the next operation
 * ap(toUpperE, Right.of('boom'));
 * // => Right(BOOM)
 *
 * // A "Left" will ignore the next operation
 * ap(toUpperE, Left.of('yea right'));
 * // => Left(yea right)
 *
 * @param  {Either<A, function>} left The either containing a function to run on the value
 * @param  {Either<A, B>} right The either containing a value
 * @return {Either<A, C>}
 */
Either.ap = (0, _curry2.default)(function (left, right) {
  return Either.chain(Either.map(_2.default, right), left);
});

/**
 * @description Determine if an Either is an instance of Left
 * @memberof Either
 * @since v1.15.0
 * @function isLeft
 * @static
 * @example
 * // isLeft :: Either a b -> Bool
 * import { isLeft, Left, Right } from '@dustinws/zoom/data';
 *
 * isLeft(Left.of());
 * // => true
 *
 * isLeft(Right.of());
 * // => false
 *
 * @param  {Either<A, B>} either The either to query
 * @return {Boolean}
 */
Either.isLeft = function (either) {
  return either instanceof Either.Left;
};

/**
 * @description Determine if an Either is an instance of Right
 * @memberof Either
 * @since v1.15.0
 * @function isRight
 * @static
 * @example
 * // isRight :: Either a b -> Bool
 * import { isRight, Left, Right } from '@dustinws/zoom/data';
 *
 * isRight(Right.of());
 * // => true
 *
 * isRight(Left.of());
 * // => false
 *
 * @param  {Either<A, B>} either The either to query
 * @return {Boolean}
 */
Either.isRight = function (either) {
  return either instanceof Either.Right;
};

/**
 * @description
 * A helper function for wrapping a potential `throwable`. Returns a new
 * function that will wrap the original one in a try / catch block
 * and return a `Right` or `Left` for successful or unsuccessful values,
 * respectively.
 * @since v1.15.0
 * @deprecated
 * This will be removed in v3 in favor of {@link Either.lift}
 * @memberof Either
 * @function try
 * @static
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * const parse = Either.try(JSON.parse);
 *
 * parse('{ "foo": "bar" }');
 * // => Right({ foo: 'bar' })
 *
 * parse('wuT is json?');
 * // => Left(SyntaxError)
 *
 * @param  {function} func
 * @return {function}
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

/**
 * @description
 * A helper function for wrapping a potential `throwable`. Returns a new
 * function that will wrap the original one in a try / catch block
 * and return a `Right` or `Left` for successful or unsuccessful values,
 * respectively.
 * @since v1.15.0
 * @memberof Either
 * @function lift
 * @static
 * @example
 * import { lift } from '@dustinws/zoom/data/either';
 *
 * const parse = lift(JSON.parse);
 *
 * parse('{ "foo": "bar" }');
 * // => Right({ foo: 'bar' })
 *
 * parse('wuT is json?');
 * // => Left(SyntaxError)
 *
 * @param  {function} func
 * @return {function}
 */
Either.lift = function (func) {
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
 * An alias for {@link Either#caseOf}
 * @memberof Either
 * @since v1.0.0
 * @method
 * @instance
 * @see {@link Either#caseOf}
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * Either.of(1).cata({
 *   Right(one) {
 *     // Do something with one
 *   },
 *
 *   Left(error) {
 *     // Handle the error
 *   },
 * });
 *
 * @this Either
 * @param  {object} cases `{ Left: a -> c, Right: b -> c }`
 * @param  {function} cases.Left The `Left` case
 * @param  {function} cases.Right The `Right` case
 * @return {Either<A, C>}
 */
Either.prototype.cata = Either.prototype.cata;

/**
 * @description A function that accepts an object with two functions, one
 * to run if the either is an instance of `Right`, and one to run if the
 * either is an instance of `Left`. The return value will be returned
 * directly, with no wrapper instance. An alias for An alias for {@link Either#cata}
 * @memberof Either
 * @since v1.0.0
 * @see {@link Either#cata}
 * @method
 * @instance
 * @example
 * import { Either } from '@dustinws/zoom/data';
 *
 * Either.of(1).caseOf({
 *   Right(one) {
 *     // Do something with one
 *   },
 *
 *   Left(error) {
 *     // Handle the error
 *   },
 * });
 *
 * @this Either
 * @param  {object} cases `{ Left: a -> c, Right: b -> c }`
 * @param  {function} cases.Left The `Left` case
 * @param  {function} cases.Right The `Right` case
 * @return {Either<A, C>}
 */
Either.prototype.caseOf = Either.prototype.cata;

/**
 * @description Lift a value into a successful 'Right' context.
 * @memberof Either.Right
 * @since v1.15.0
 * @method of
 * @instance
 * @example
 * import { Right } from '@dustinws/zoom/data/either';
 *
 * Right.of(1);
 * // => Right(1)
 *
 * @this Either
 * @param  {B} value The value to put in the Either
 * @return {Either<A, B>}
 */
Right.prototype.of = function of(value) {
  return Right.of(value);
};

/**
 * @description Lift a value into an unsuccessful 'Left' context.
 * @memberof Either.Left
 * @since v1.15.0
 * @method of
 * @instance
 * @example
 * import { Left } from '@dustinws/zoom/data/either';
 *
 * Left.of(1);
 * // => Left(1)
 *
 * @this Either
 * @param  {A} value The value to put in the Either
 * @return {Either<A, B>}
 */
Left.prototype.of = function of(value) {
  return Left.of(value);
};

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Right' to 'Left' instance and stop
 * subsequent transformations from being applied. An alias for {@link Either#andThen}
 *
 * @memberof Either
 * @since v1.15.0
 * @method
 * @instance
 * @see {@link Either#andThen}
 * @example
 * import { Left, Right } from '@dustinws/zoom/data/either';
 *
 * // toUpper :: String -> Either String String
 * const toUpper = x =>
 *   typeof x !== 'string'
 *     ? Left.of('toUpper() recieved a non string.')
 *     : Right.of(x.toUpperCase());
 *
 * // A "Right" will apply the next operation
 * Right.of('boom').chain(toUpper);
 * // => Right(BOOM)
 *
 * // A "Left" will ignore the next operation
 * Left.of('yea right').chain(toUpper);
 * // => Left(yea right)
 *
 * @this Either
 * @param  {function} transform The transformation to apply to the inner value
 * @return {Either<A, C>}
 */
Either.prototype.chain = function chain(transform) {
  return Either.chain(transform, this);
};

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Right' to 'Left' instance and stop
 * subsequent transformations from being applied. An alias for {@link Either#chain}
 *
 * @memberof Either
 * @since v1.15.0
 * @method
 * @instance
 * @see {@link Either#chain}
 * @example
 * import { Left, Right } from '@dustinws/zoom/data/either';
 *
 * // toUpper :: String -> Either String String
 * const toUpper = x =>
 *   typeof x !== 'string'
 *     ? Left.of('toUpper() recieved a non string.')
 *     : Right.of(x.toUpperCase());
 *
 * // A "Right" will apply the next operation
 * Right.of('boom').andThen(toUpper);
 * // => Right(BOOM)
 *
 * // A "Left" will ignore the next operation
 * Left.of('yea right').andThen(toUpper);
 * // => Left(yea right)
 *
 * @this Either
 * @param  {function} transform The transformation to apply to the inner value
 * @return {Either<A, C>}
 */
Either.prototype.andThen = function andThen(transform) {
  return Either.chain(transform, this);
};

/**
 * @description `map` is very similar to {@link Either.andThen} and
 * {@link Either.chain} in that it only runs the function if the
 * either is an instance of `Just`. The main difference is that {@link Either.andThen}
 * and {@link Either.chain} expect the functions you give them to return
 * new `Either` instances, and map let's you use plain old functions.
 *
 * @memberof Either
 * @since v1.15.0
 * @method
 * @instance
 * @example
 * import { Left, Right } from '@dustinws/zoom/data/either';
 *
 * // toUpper :: String -> String
 * const toUpper = x => x.toUpperCase();
 *
 * // A "Right" will run the next operation
 * Right.of('yay').map(toUpper);
 * // => Right('YAY!');
 *
 * // A "Left" will ignore the next operation
 * Left.of('nay!').map(toUpper);
 * // => Left('nay!');
 *
 * @this Either
 * @param  {function} transform The transformation to apply to the inner value
 * @return {Either<A, C>}
 */
Either.prototype.map = function map(transform) {
  return Either.map(transform, this);
};

/**
 * @description
 * `ap` is just like `map`, allowing a user to use plain old functions to
 * transform values hidden away in `Either`s. The only difference is that
 * instead of giving it the function, you give it an `Either` of the function.
 * This is known as the `Apply` type in fantasy land JS.
 *
 * @memberof Either
 * @method
 * @instance
 * @since v1.15.0
 * @example
 * // ap :: Either e => e a b -> e a (b -> c) -> e a c
 * import { ap, Left, Right } from '@dustinws/zoom/data';
 *
 * // toUpperE :: Either a (String -> String)
 * const toUpperE = Right(x => x.toUpperCase());
 *
 * // A "Right" will apply the next operation
 * Right.of('boom').ap(toUpperE);
 * // => Right(BOOM)
 *
 * // A "Left" will ignore the next operation
 * Left.of('yea right').ap(toUpperE);
 * // => Left(yea right)
 *
 * @this Either
 * @param  {Either<A, function>} apply An either containing a function to run on the value
 * @return {Either<A, C>}
 */
Either.prototype.ap = function ap(apply) {
  return Either.ap(apply, this);
};

/**
 * @description Determine if an Either is an instance of Left
 * @memberof Either
 * @since v1.15.0
 * @method
 * @instance
 * @example
 * import { Left, Right } from '@dustinws/zoom/data/either';
 *
 * Left.of(1).isLeft(); // true
 * Right.of(1).isLeft(); // false
 *
 * @this Either
 * @return {Boolean}
 */
Either.prototype.isLeft = function isLeft() {
  return Either.isLeft(this);
};

/**
 * @description Determine if an Either is an instance of Right
 * @memberof Either
 * @since v1.15.0
 * @method
 * @instance
 * @example
 * import { Left, Right } from '@dustinws/zoom/data/either';
 *
 * Right.of(1).isRight(); // true
 * Left.of(1).isRight(); // false
 *
 * @this Either
 * @return {Boolean}
 */
Either.prototype.isRight = function isRight() {
  return Either.isRight(this);
};

exports.default = Either;
module.exports = exports['default'];