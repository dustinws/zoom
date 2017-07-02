import __ from '../core/__';
import { union } from '../adt';
import curry from '../core/curry';
import compose from '../core/compose';
import constant from '../core/constant';

/**
 * @class Either
 * @memberof module:Zoom.Data
 */
const Either = union('Either', {
  Right: ['value'],
  Left: ['value'],
});

const Right = Either.Right;
const Left = Either.Left;

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Lift a value into a successful 'Right' context.
 * @memberof module:Zoom.Data.Either
 * @function of
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
Either.of = function of(value) {
  return Right(value);
};

/**
 * @description Lift a value into a successful 'Right' context.
 * @memberof module:Zoom.Data.Either
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
Right.of = function of(value) {
  return Right(value);
};

/**
 * @description Lift a value into an unsuccessful 'Left' context.
 * @memberof module:Zoom.Data.Either
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
Left.of = function of(value) {
  return Left(value);
};

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Right' to 'Left' instance and stop
 * subsequent transformations from being applied.
 * @memberof module:Zoom.Data.Either
 * @since v1.0.0
 * @function chain
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
 * @param  {Eight} either The either instance.
 * @return {Either}
 */
Either.chain = curry((transform, either) =>
  either.cata({
    Left: constant(either),
    Right: transform,
  }));

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Either
 * @since v1.0.0
 * @function map
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
 * @param  {Eight} either The either instance.
 * @return {Either}
 */
Either.map = curry((transform, either) =>
  Either.chain(compose(Either.of, transform), either));

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Either
 * @since v1.0.0
 * @function ap
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
 * @param  {Either} left The either containing a function to run on the value
 * @param  {Either} right The either containing a value
 * @return {Either}
 */
Either.ap = curry((left, right) =>
  Either.chain(Either.map(__, right), left));

/**
 * @description Determine if an Either is an instance of Left
 * @memberof module:Zoom.Data.Either
 * @since v1.0.0
 * @function isLeft
 * @example
 * import { Either } from '@dustinws/zoom/packages/data';
 *
 * Either.isLeft(Either.Left.of(1)); // true
 * Either.isLeft(Either.Right.of(1)); // false
 *
 * @param  {Either} either The either to query
 * @return {Boolean}
 */
Either.isLeft = either => either instanceof Either.Left;

/**
 * @description Determine if an Either is an instance of Right
 * @memberof module:Zoom.Data.Either
 * @since v1.0.0
 * @function isRight
 * @example
 * import { Either } from '@dustinws/zoom/packages/data';
 *
 * Either.isRight(Either.Right.of(1)); // true
 * Either.isRight(Either.Left.of(1)); // false
 *
 * @param  {Either} either The either to query
 * @return {Boolean}
 */
Either.isRight = either => either instanceof Either.Right;

/**
 * @description Create a function that returns a Right when it is successful
 * and returns a Left when it throws.
 * @since v1.0.0
 * @memberof module:Zoom.Data.Either
 * @function try
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
Either.try = func => (...args) => {
  try {
    return Either.Right(func(...args));
  } catch (error) {
    return Either.Left(error);
  }
};


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Lift a value into a successful 'Right' context.
 * @memberof module:Zoom.Data.Either
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
Right.prototype.of = function of(value) {
  return Right.of(value);
};

/**
 * @description Lift a value into an unsuccessful 'Left' context.
 * @memberof module:Zoom.Data.Either
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
Left.prototype.of = function of(value) {
  return Left.of(value);
};

/**
 * @description Apply a transformation to the Either if it is an instance
 * of "Right". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Right' to 'Left' instance and stop
 * subsequent transformations from being applied.
 * @memberof module:Zoom.Data.Either
 * @since v1.0.0
 * @example
 * import { Either } from '@dustinws/zoom/packages/data';
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
 * @memberof module:Zoom.Data.Either
 * @since v1.0.0
 * @example
 * import { Either } from '@dustinws/zoom/packages/data';
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
 * @since v1.0.0
 * @example
 * import { Either } from '@dustinws/zoom/packages/data';
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
 * @since v1.0.0
 * @example
 * import { Either } from '@dustinws/zoom/packages/data';
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
 * @since v1.0.0
 * @example
 * import { Either } from '@dustinws/zoom/packages/data';
 *
 * Either.Right.of(1).isRight(); // true
 * Either.Left.of(1).isRight(); // false
 *
 * @return {Boolean}
 */
Either.prototype.isRight = function isRight() {
  return Either.isRight(this);
};

export default Either;
