'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fantasyLand = require('fantasy-land');

var _fantasyLand2 = _interopRequireDefault(_fantasyLand);

var _Either = require('./Either');

var _Either2 = _interopRequireDefault(_Either);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
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
 *
 * @class Either
 * @memberof module:Zoom.Data
 */

// Either Applicative
_Either2.default[_fantasyLand2.default.of] = _Either2.default.of;

// Either Chain
_Either2.default[_fantasyLand2.default.chain] = _Either2.default.chain;
_Either2.default.prototype[_fantasyLand2.default.chain] = _Either2.default.prototype.chain;

// Either Functor
_Either2.default[_fantasyLand2.default.map] = _Either2.default.map;
_Either2.default.prototype[_fantasyLand2.default.map] = _Either2.default.prototype.map;

// Either Apply
_Either2.default[_fantasyLand2.default.ap] = _Either2.default.ap;
_Either2.default.prototype[_fantasyLand2.default.ap] = _Either2.default.prototype.ap;

// Right Applicative
_Either2.default.Right[_fantasyLand2.default.of] = _Either2.default.Right.of;
_Either2.default.Right.prototype[_fantasyLand2.default.of] = _Either2.default.Right.prototype.of;

// Either.Right Chain
_Either2.default.Right[_fantasyLand2.default.chain] = _Either2.default.Right.chain;
_Either2.default.Right.prototype[_fantasyLand2.default.chain] = _Either2.default.Right.prototype.chain;

// Either.Right Functor
_Either2.default.Right[_fantasyLand2.default.map] = _Either2.default.Right.map;
_Either2.default.Right.prototype[_fantasyLand2.default.map] = _Either2.default.Right.prototype.map;

// Either.Right Apply
_Either2.default.Right[_fantasyLand2.default.ap] = _Either2.default.Right.ap;
_Either2.default.Right.prototype[_fantasyLand2.default.ap] = _Either2.default.Right.prototype.ap;

// Left Applicative
_Either2.default.Left[_fantasyLand2.default.of] = _Either2.default.Left.of;
_Either2.default.Left.prototype[_fantasyLand2.default.of] = _Either2.default.Left.prototype.of;

// Either.Left Chain
_Either2.default.Left[_fantasyLand2.default.chain] = _Either2.default.Left.chain;
_Either2.default.Left.prototype[_fantasyLand2.default.chain] = _Either2.default.Left.prototype.chain;

// Either.Left Functor
_Either2.default.Left[_fantasyLand2.default.map] = _Either2.default.Left.map;
_Either2.default.Left.prototype[_fantasyLand2.default.map] = _Either2.default.Left.prototype.map;

// Either.Left Apply
_Either2.default.Left[_fantasyLand2.default.ap] = _Either2.default.Left.ap;
_Either2.default.Left.prototype[_fantasyLand2.default.ap] = _Either2.default.Left.prototype.ap;

exports.default = _Either2.default;
module.exports = exports['default'];