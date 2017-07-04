import curry from 'ramda/src/curry';
import { tag } from '../adt';

/**
 * @class Tuple
 * @description
 * A `Tuple` is like a list with a fixed number of elements. In this
 * implementation, we limit the number of elements to two, making this
 * more akin to a `Pair` type.
 *
 * ---
 * `Tuple` supports the `Symbol.iterator` protocol, which means it supports
 * `for of` loops, `...spread`, and `[a, b] = Tuple.of(0, 0)` destructuring.
 * For more detailed usage, see {@link Tuple#Iterator}
 *
 * ---
 * #### Fantasy Land Implementations
 * `Setoid`, `Applicative`, `Functor`
 * @example
 * import { Tuple } from 'zoomjs';
 *
 * // Create a Tuple instance
 * // user :: (Int, String)
 * const user = Tuple.of(1, 'Dustin');
 *
 * user.toString(); // (1, 'Dustin')
 */
const Tuple = tag('Tuple', 'left', 'right');


/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Create a new tuple.
 * @memberof Tuple
 * @since v1.15.0
 * @implements Applicative
 * @function of
 * @example
 * // of :: a -> b -> (a, b)
 * import { Tuple } from 'zoomjs';
 *
 * Tuple.of(1, 3).toString(); // (1, 3)
 *
 * @param  {A} left The first element
 * @param  {B} right The second element
 * @return {Tuple<A, B>}
 */
Tuple.of = (a, b) =>
  Tuple(a, b);

/**
 * @description Get the first element of a Tuple
 * @memberof Tuple
 * @since v1.15.0
 * @function fst
 * @example
 * // fst :: (a, b) -> a
 * import { Tuple } from 'zoomjs';
 *
 * Tuple.fst(Tuple.of(1, 'Jake')); // 1
 *
 * @param  {Tuple<A, B>} tuple The tuple
 * @return {A}
 */
Tuple.fst = tuple =>
  tuple.left;

/**
 * @description Get the second element of a Tuple
 * @memberof Tuple
 * @since v1.15.0
 * @function snd
 * @example
 * // snd :: (a, b) -> b
 * import { Tuple } from 'zoomjs';
 *
 * Tuple.snd(Tuple.of(1, 'Jake')); // 'Jake'
 *
 * @param  {Tuple<A, B>} tuple The tuple
 * @return {B}
 */
Tuple.snd = tuple =>
  tuple.right;

/**
 * @description Determine if one tuple is the same as another. Both elements
 * are checked with the `===` comparison operator.
 * @memberof Tuple
 * @since v1.15.0
 * @implements Setoid
 * @function equals
 * @example
 * // equals :: (a, b) -> (a, b) -> Bool
 * import { Tuple } from 'zoomjs';
 *
 * const userA = Tuple.of('male', 'Dustin');
 * const userB = Tuple.of('male', 'Dustin');
 * const userC = Tuple.of('male', 'Jimmy');
 *
 * Tuple.equals(userA, userB);
 * // => true
 *
 * Tuple.equals(userA, userC);
 * // => false
 *
 * Tuple.equals(userB, userC);
 * // => false
 *
 * @param  {Tuple<A, B>} left The first tuple
 * @param  {Tuple<A, B>} right The second tuple
 * @return {Boolean}
 */
Tuple.equals = curry((left, right) =>
  left.left === right.left && left.right === right.right);

/**
 * @description Apply a function to the second element of a tuple and return
 * a new, modified tuple.
 * @memberof Tuple
 * @since v1.15.0
 * @implements Functor
 * @function map
 * @example
 * // map :: (b -> c) -> (a, b) -> (a, c)
 * import { Tuple } from 'zoomjs';
 *
 * // toUpper :: String -> String
 * const toUpper = x => x.toUpperCase();
 *
 * Tuple.map(toUpper, Tuple.of(1, 'jake'));
 * // => (1, 'JAKE')
 *
 * @param  {function} transform The function to run
 * @param  {Tuple<A, B>} tuple The tuple
 * @return {Tuple<A, C>}
 */
Tuple.map = curry((transform, tuple) =>
  Tuple.of(tuple.left, transform(tuple.right)));

/**
 * @description Apply a function to the first element of a tuple
 * and return a new, modified tuple.
 * @memberof Tuple
 * @since v1.15.0
 * @function mapLeft
 * @example
 * // mapLeft :: (a -> c) -> (a, b) -> (c, b)
 * import { Tuple } from 'zoomjs';
 *
 * const user = Tuple.of(1, 'Jake');
 *
 * Tuple.mapLeft(n => n + 1, user).toString(); // (2, 'Jake')
 *
 * @param  {function} transform The function to run
 * @param  {Tuple<A, B>} tuple The tuple
 * @return {Tuple<C, B>}
 */
Tuple.mapLeft = curry((transform, tuple) =>
  Tuple(transform(tuple.left), tuple.right));


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

/**
* @description Create a two element tuple. The instance version of "Tuple.of"
* @memberof Tuple
* @since v1.15.0
* @implements Applicative
* @method
* @instance
* @example
* // of (a, b) :: c -> d -> (c, d)
* import { Tuple } from 'zoomjs';
*
* const emptyTuple = Tuple.of();
*
* emptyTuple.of(1, 3).toString(); // (1, 3)
*
* @this Tuple
* @param  {A} left The first element
* @param  {B} right The second element
* @return {Tuple<A, B>}
*/
Tuple.prototype.of = function of(left, right) {
  return Tuple.of(left, right);
};

/**
* @description Get the first element of a Tuple. Instance version of "Tuple.fst"
* @memberof Tuple
* @since v1.15.0
* @method
* @instance
* @example
* // fst (a, b) :: c -> a
* import { Tuple } from 'zoomjs';
*
* Tuple.of(1, 'Jake').fst(); // 1
*
* @this Tuple
* @return {A}
*/
Tuple.prototype.fst = function fst() {
  return Tuple.fst(this);
};

/**
* @description Get the second element of a Tuple. Instance version of "Tuple.snd"
* @memberof Tuple
* @since v1.15.0
* @method
* @instance
* @example
* // snd (a, b) :: c -> b
* import { Tuple } from 'zoomjs';
*
* Tuple.of(1, 'Jake').snd(); // 'Jake'
*
* @this Tuple
* @return {B}
*/
Tuple.prototype.snd = function snd() {
  return Tuple.snd(this);
};

/**
 * @description Determine if one tuple is the same as another. Both elements
 * are checked with the `===` comparison operator.
 * @memberof Tuple
 * @since v1.15.0
 * @implements Setoid
 * @method
 * @instance
 * @example
 * // equals (a, b) :: (a, b) -> Bool
 * import { Tuple } from 'zoomjs';
 *
 * const userA = Tuple.of('male', 'Dustin');
 * const userB = Tuple.of('male', 'Dustin');
 * const userC = Tuple.of('male', 'Jimmy');
 *
 * userA.equals(userB);
 * // => true
 *
 * userA.equals(userC);
 * // => false
 *
 * userB.equals(userC);
 * // => false
 *
 * @this Tuple
 * @param  {Tuple<A, B>} tuple The tuple to compare against
 * @return {Boolean}
 */
Tuple.prototype.equals = function equals(tuple) {
  return Tuple.equals(tuple, this);
};

/**
* @description Apply a function to the second element of a tuple
* and return a new, modified tuple. Instance version of "Tuple.map"
* @memberof Tuple
* @since v1.15.0
* @implements Functor
* @method
* @instance
* @example
* // map (a, b) :: (b -> c) -> (a, c)
* import { Tuple } from 'zoomjs';
*
* const user = Tuple.of(1, 'Jake');
*
* user.map(x => x.toUpperCase()).toString() // (1, 'JAKE')
*
* @this Tuple
* @param  {function} transform The function to run
* @return {Tuple<A, C>}
*/
Tuple.prototype.map = function map(transform) {
  return Tuple.map(transform, this);
};

/**
* @description Apply a function to the first element of a tuple
* and return a new, modified tuple. Instance version of {@link Tuple.mapLeft}
* @memberof Tuple
* @since v1.15.0
* @method
* @instance
* @example
* // mapLeft (a, b) :: (a -> c) -> (c, b)
* import { Tuple } from 'zoomjs';
*
* const user = Tuple.of(1, 'Jake');
*
* user.mapLeft(n => n + 1).toString(); // (2, 'Jake')
*
* @this Tuple
* @param  {function} transform The function to run
* @param  {Tuple<A, B>} tuple The tuple
* @return {Tuple<C, B>}
*/
Tuple.prototype.mapLeft = function mapLeft(transform) {
  return Tuple.mapLeft(transform, this);
};

/**
* @description Get the string representation of the tuple.
* @memberof Tuple
* @since v1.15.0
* @method
* @instance
* @example
* // toString (a, b) :: c -> String
* import { Tuple } from 'zoomjs';
*
* Tuple.of(1, 'Jake').toString(); // (1, 'Jake')
*
* @this Tuple
* @return {String}
*/
Tuple.prototype.toString = function toString() {
  return `(${this.left.toString()}, ${this.right.toString()})`;
};

/**
 * @memberof Tuple
 * @description
 * Support the `Symbol.iterator` protocol.
 * @since v2.2.0
 * @method Iterator
 * @instance
 * @example
 * import { Tuple } from 'zoomjs';
 *
 * // user :: (Int, String)
 * const user = Tuple.of(1, 'Janet');
 *
 * // For-of loops
 * for (let element of user) {
 *   console.log(element);
 * }
 *
 * // 1
 * // 'Janet'
 *
 *
 * // Spread Operator
 * // saveUser :: Int -> String -> DbResult
 * function saveUser(id, username) {
 *   return Db.save(id, username);
 * }
 *
 * saveUser(...user);
 *
 *
 * // Destructuring
 * const [id, username] = user;
 *
 * // saveUserT :: (Int, String) -> DbResult
 * function saveUserT([id, username]) {
 *   return Db.save(id, username);
 * }
 *
 * saveUserT(user);
 *
 * @this Either
 * @return {Iterator}
 */
Tuple.prototype[Symbol.iterator] = function iterator() {
  const pending = ['left', 'right'];
  const tuple = this;
  return {
    next() {
      if (pending.length) {
        return { value: tuple[pending.shift()] };
      }
      return { done: true };
    },
  };
};


export default Tuple;
