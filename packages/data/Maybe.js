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
 * @class Maybe
 * @memberof module:Zoom.Data
 */
var Maybe = (0, _adt.union)('Maybe', {
  Just: ['value'],
  Nothing: []
});

var Just = Maybe.Just;
var Nothing = Maybe.Nothing;

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Lift a value into a successful 'Just' context.
 * @memberof module:Zoom.Data.Maybe
 * @function of
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/packages/data';
 *
 * const val = Maybe.of(1);
 *
 * val.toString() // 'Just(1)'
 *
 * @param  {Any} value The value to put in the Maybe
 * @return {Maybe}
 */
Maybe.of = function of(value) {
  return Just(value);
};

/**
 * @description Lift a value into a successful 'Just' context.
 * @memberof module:Zoom.Data.Maybe
 * @function
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/packages/data';
 *
 * const val = Maybe.Just.of(1);
 *
 * val.toString() // 'Just(1)'
 *
 * @param  {Any} value The value to put in the Maybe
 * @return {Maybe}
 */
Just.of = function of(value) {
  return Just(value);
};

/**
 * @description Lift a value into a 'Nothing' context. Any value
 * passed will be ignored.
 * @memberof module:Zoom.Data.Maybe
 * @function
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/packages/data';
 *
 * const val = Maybe.Nothing.of(1);
 *
 * val.toString() // 'Nothing'
 *
 * @param  {Any} value The value to put in the Maybe
 * @return {Maybe}
 */
Nothing.of = function of() {
  return Maybe.Nothing;
};

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Just' to 'Nothing' instance and stop
 * subsequent transformations from being applied.
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @function chain
 * @example
 * import { Maybe } from '@dustinws/zoom/packages/data';
 *
 * const valid = Maybe.Just.of('yay!');
 * const invalid = Maybe.Nothing;
 *
 * const toUpper = x => Maybe.Just.of(x.toUpperCase());
 *
 * Maybe.chain(toUpper, valid); // Just('YAY!')
 * Maybe.chain(toUpper, invalid); // Nothing
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @param  {Maybe} maybe The maybe
 * @return {Maybe}
 */
Maybe.chain = (0, _curry2.default)(function (transform, maybe) {
  return maybe.cata({
    Nothing: (0, _constant2.default)(maybe),
    Just: transform
  });
});

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @function map
 * @example
 * import { Maybe } from '@dustinws/zoom/packages/data';
 *
 * const valid = Maybe.Just.of('yay!');
 * const failure = Maybe.Nothing;
 *
 * const toUpper = x => x.toUpperCase();
 *
 * Maybe.map(toUpper, valid); // Just('YAY!')
 * Maybe.map(toUpper, invalid); // Nothing
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @param  {Maybe} maybe The maybe
 * @return {Maybe}
 */
Maybe.map = (0, _curry2.default)(function (transform, maybe) {
  return Maybe.chain((0, _compose2.default)(Maybe.of, transform), maybe);
});

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @function ap
 * @example
 * import { Maybe } from '@dustinws/zoom/packages/data';
 *
 * const valid = Maybe.Just.of('yay!');
 * const failure = Maybe.Nothing;
 *
 * const toUpper = Maybe.of(x => x.toUpperCase());
 *
 * Maybe.ap(toUpper, valid); // Just('YAY!')
 * Maybe.ap(toUpper, invalid); // Nothing
 *
 * @param  {Maybe} left The maybe containing a function to run on the value
 * @param  {Maybe} right The maybe containing a value
 * @return {Maybe}
 */
Maybe.ap = (0, _curry2.default)(function (left, right) {
  return Maybe.chain(Maybe.map(_2.default, right), left);
});

/**
 * @description Determine if an Maybe is an instance of Nothing
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @function isNothing
 * @example
 * import { Maybe } from '@dustinws/zoom/packages/data';
 *
 * Maybe.isNothing(Maybe.Nothing); // true
 * Maybe.isNothing(Maybe.Just.of(1)); // false
 *
 * @param  {Maybe} maybe The maybe to query
 * @return {Boolean}
 */
Maybe.isNothing = function (maybe) {
  return maybe === Maybe.Nothing;
};

/**
 * @description Determine if an Maybe is an instance of Just
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @function isJust
 * @example
 * import { Maybe } from '@dustinws/zoom/packages/data';
 *
 * Maybe.isJust(Maybe.Just.of(1)); // true
 * Maybe.isJust(Maybe.Nothing); // false
 *
 * @param  {Maybe} maybe The maybe to query
 * @return {Boolean}
 */
Maybe.isJust = function (maybe) {
  return maybe instanceof Maybe.Just;
};

/**
 * @description Create a maybe from a potentially null value.
 * @since v1.15.0
 * @memberof module:Zoom.Data.Maybe
 * @function fromNullable
 * @example
 * import { Maybe } from '@dustinws/zoom/packages/data';
 *
 * Maybe.fromNullable(''); // Just('')
 * Maybe.fromNullable(null); // Nothing
 * Maybe.fromNullable(); // Nothing
 *
 * @param  {Any} value
 * @return {Maybe}
 */
Maybe.fromNullable = function (value) {
  if (value === null || value === undefined) {
    return Maybe.Nothing;
  }

  return Maybe.Just.of(value);
};

/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Lift a value into a successful 'Just' context.
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/packages/data';
 *
 * const val = Maybe.Just.of(1);
 *
 * val.toString() // 'Just(1)'
 *
 * @param  {Any} value The value to put in the Maybe
 * @return {Maybe}
 */
Just.prototype.of = function of(value) {
  return Just(value);
};

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * This is how you can switch from a 'Just' to 'Nothing' instance and stop
 * subsequent transformations from being applied.
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/packages/data';
 *
 * const valid = Maybe.Just.of('yay!');
 * const invalid = Maybe.Nothing;
 *
 * const toUpper = x => Maybe.Just.of(x.toUpperCase());
 *
 * valid.chain(toUpper); // Just('YAY!')
 * invalid.chain(toUpper); // Nothing
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @return {Maybe}
*/
Maybe.prototype.chain = function chain(transform) {
  return Maybe.chain(transform, this);
};

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/packages/data';
 *
 * const valid = Maybe.Just.of('yay!');
 * const failure = Maybe.Nothing;
 *
 * const toUpper = x => x.toUpperCase();
 *
 * valid.map(toUpper); // Just('YAY!')
 * invalid.map(toUpper); // Nothing
 *
 * @param  {Function} transform The transformation to apply to the inner value
 * @return {Maybe}
 */
Maybe.prototype.map = function map(transform) {
  return Maybe.map(transform, this);
};

/**
 * @description Apply a transformation to the Maybe if it is an instance
 * of "Just". Otherwise, ignore the transformation and return the instance.
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/packages/data';
 *
 * const valid = Maybe.Just.of('yay!');
 * const failure = Maybe.Nothing;
 *
 * const toUpper = Maybe.of(x => x.toUpperCase());
 *
 * valid.ap(toUpper); // Just('YAY!')
 * invalid.ap(toUpper); // Nothing
 *
 * @param  {Maybe} applyt A maybe containing a function to run on the value
 * @return {Maybe}
 */
Maybe.prototype.ap = function ap(transform) {
  return Maybe.ap(transform, this);
};

/**
 * @description Determine if an Maybe is an instance of Nothing
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/packages/data';
 *
 * Maybe.Nothing.isNothing(); // true
 * Maybe.Just.of().isNothing(); // false
 *
 * @return {Boolean}
 */
Maybe.prototype.isNothing = function isNothing() {
  return Maybe.isNothing(this);
};

/**
 * @description Determine if an Maybe is an instance of Just
 * @memberof module:Zoom.Data.Maybe
 * @since v1.15.0
 * @example
 * import { Maybe } from '@dustinws/zoom/packages/data';
 *
 * Maybe.Just.of().isJust(); // true
 * Maybe.Nothing.isJust(); // false
 *
 * @return {Boolean}
 */
Maybe.prototype.isJust = function isJust() {
  return Maybe.isJust(this);
};

exports.default = Maybe;
module.exports = exports['default'];