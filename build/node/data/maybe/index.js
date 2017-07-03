'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fantasyLand = require('fantasy-land');

var _fantasyLand2 = _interopRequireDefault(_fantasyLand);

var _Maybe = require('./Maybe');

var _Maybe2 = _interopRequireDefault(_Maybe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description
 * `Maybe` is an abstraction around null values that allows the user to give up
 * null checks entirely. `Maybe` is a super class with two constructors,
 * `Nothing` and `Just`. Since `Nothing` is a static type with no data, it is
 * eagerly created at runtime and referred to as a singleton. The `Just`
 * constructor represents an existing value, and `Nothing` represents an
 * empty value with an embedded error message. You can chain functions that
 * return `Maybe` instances by using `.andThen`.
 *
 * @example
 * // Some deeply nested object where any key can be null.
 * const data = {
 *   location: {
 *     address: {
 *       streetNumber: '43',
 *     },
 *   },
 * };
 *
 * // With regular null checking
 * // This version checks the next value at each step
 * // If the structure of "data" changes, refactoring this
 * // function can be troublesome and error prone due to
 * // re-arranging conditional blocks.
 * function getStreetNumber(data, defaultValue) {
 *   if (data.location != null) {
 *     if (data.location.address != null) {
 *       if (data.location.address.streetNumber != null) {
 *         return data.location.address.streetNumber;
 *       }
 *       return defaultValue;;
 *     }
 *     return defaultValue;;
 *   }
 *   return defaultValue;;
 * }
 *
 * getStreetNumber(data) // '43'
 * getStreetNumber({}, 'No Address') // 'No Address'
 *
 *
 *
 * // With Maybe
 * import Maybe from '@dustinws/zoom/data/maybe';
 *
 * // Create a generic `get` function that will return a Maybe.
 * // `fromNullable` is a convenience function that allows the
 * // user to create maybe instances from potentially null values.
 * const get = key => obj => Maybe.fromNullable(obj[key]);
 *
 * // In this version, we have no nesting,
 * // with null checks happening at each step.
 * // If the structure of "data" changes, the lack
 * // of nesting means we can just add / remove lines.
 * function getStreetNumber(data) {
 *   return get('location')(data)
 *     .andThen(get('address'))
 *     .andThen(get('streetNumber'));
 * }
 *
 * // You can use the `withDefault` method to extract the value
 * getStreetNumber(data).withDefault('No Address') // '42'
 *
 * getStreetNumber({}).withDefault('No Address') // 'No Address'
 *
 * @class Maybe
 * @memberof module:Zoom.Data
 */

// Maybe Applicative
_Maybe2.default[_fantasyLand2.default.of] = _Maybe2.default.of;

// Maybe Chain
_Maybe2.default[_fantasyLand2.default.chain] = _Maybe2.default.chain;
_Maybe2.default.prototype[_fantasyLand2.default.chain] = _Maybe2.default.prototype.chain;

// Maybe Functor
_Maybe2.default[_fantasyLand2.default.map] = _Maybe2.default.map;
_Maybe2.default.prototype[_fantasyLand2.default.map] = _Maybe2.default.prototype.map;

// Maybe Apply
_Maybe2.default[_fantasyLand2.default.ap] = _Maybe2.default.ap;
_Maybe2.default.prototype[_fantasyLand2.default.ap] = _Maybe2.default.prototype.ap;

// Just Applicative
_Maybe2.default.Just[_fantasyLand2.default.of] = _Maybe2.default.Just.of;
_Maybe2.default.Just.prototype[_fantasyLand2.default.of] = _Maybe2.default.Just.prototype.of;

// Maybe.Just Chain
_Maybe2.default.Just[_fantasyLand2.default.chain] = _Maybe2.default.Just.chain;
_Maybe2.default.Just.prototype[_fantasyLand2.default.chain] = _Maybe2.default.Just.prototype.chain;

// Maybe.Just Functor
_Maybe2.default.Just[_fantasyLand2.default.map] = _Maybe2.default.Just.map;
_Maybe2.default.Just.prototype[_fantasyLand2.default.map] = _Maybe2.default.Just.prototype.map;

// Maybe.Just Apply
_Maybe2.default.Just[_fantasyLand2.default.ap] = _Maybe2.default.Just.ap;
_Maybe2.default.Just.prototype[_fantasyLand2.default.ap] = _Maybe2.default.Just.prototype.ap;

// Nothing Applicative
_Maybe2.default.Nothing[_fantasyLand2.default.of] = _Maybe2.default.Nothing.of;

// Maybe.Nothing Chain
_Maybe2.default.Nothing[_fantasyLand2.default.chain] = _Maybe2.default.Nothing.chain;

// Maybe.Nothing Functor
_Maybe2.default.Nothing[_fantasyLand2.default.map] = _Maybe2.default.Nothing.map;

// Maybe.Nothing Apply
_Maybe2.default.Nothing[_fantasyLand2.default.ap] = _Maybe2.default.Nothing.ap;

exports.default = _Maybe2.default;
module.exports = exports['default'];