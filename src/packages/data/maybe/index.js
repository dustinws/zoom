import FL from 'fantasy-land';
import Maybe from './Maybe';

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
Maybe[FL.of] = Maybe.of;

// Maybe Chain
Maybe[FL.chain] = Maybe.chain;
Maybe.prototype[FL.chain] = Maybe.prototype.chain;

// Maybe Functor
Maybe[FL.map] = Maybe.map;
Maybe.prototype[FL.map] = Maybe.prototype.map;

// Maybe Apply
Maybe[FL.ap] = Maybe.ap;
Maybe.prototype[FL.ap] = Maybe.prototype.ap;


// Just Applicative
Maybe.Just[FL.of] = Maybe.Just.of;
Maybe.Just.prototype[FL.of] = Maybe.Just.prototype.of;

// Maybe.Just Chain
Maybe.Just[FL.chain] = Maybe.Just.chain;
Maybe.Just.prototype[FL.chain] = Maybe.Just.prototype.chain;

// Maybe.Just Functor
Maybe.Just[FL.map] = Maybe.Just.map;
Maybe.Just.prototype[FL.map] = Maybe.Just.prototype.map;

// Maybe.Just Apply
Maybe.Just[FL.ap] = Maybe.Just.ap;
Maybe.Just.prototype[FL.ap] = Maybe.Just.prototype.ap;


// Nothing Applicative
Maybe.Nothing[FL.of] = Maybe.Nothing.of;

// Maybe.Nothing Chain
Maybe.Nothing[FL.chain] = Maybe.Nothing.chain;

// Maybe.Nothing Functor
Maybe.Nothing[FL.map] = Maybe.Nothing.map;

// Maybe.Nothing Apply
Maybe.Nothing[FL.ap] = Maybe.Nothing.ap;


export default Maybe;
