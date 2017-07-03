import { tag } from '../adt';
import curry from '../lambda/curry';

/**
 * @class Tuple
 * @memberof module:Zoom.Data
 */
const Tuple = tag('Tuple', 'left', 'right');


/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Create a two element tuple.
 * @memberof module:Zoom.Data.Tuple
 * @since v1.15.0
 * @function of
 * @example
 * import { Tuple } from '@dustinws/zoom/data';
 *
 * Tuple.of(1, 3).toString(); // (1, 3)
 *
 * @param  {Any} left The first element
 * @param  {Any} right The second element
 * @return {Tuple}
 */
Tuple.of = (a, b) =>
  Tuple(a, b);

/**
 * @description Get the first element of a Tuple
 * @memberof module:Zoom.Data.Tuple
 * @since v1.15.0
 * @function fst
 * @example
 * import { Tuple } from '@dustinws/zoom/data';
 *
 * const user = Tuple.of(1, 'Jake');
 *
 * Tuple.fst(user); // 1
 *
 * @param  {Tuple} tuple The tuple
 * @return {Any}
 */
Tuple.fst = tuple =>
  tuple.left;

/**
 * @description Get the second element of a Tuple
 * @memberof module:Zoom.Data.Tuple
 * @since v1.15.0
 * @function snd
 * @example
 * import { Tuple } from '@dustinws/zoom/data';
 *
 * const user = Tuple.of(1, 'Jake');
 *
 * Tuple.snd(user); // 'Jake'
 *
 * @param  {Tuple} tuple The tuple
 * @return {Any}
 */
Tuple.snd = tuple =>
  tuple.right;

/**
 * @description Apply a function to the second element of a tuple
 * and return a new, modified tuple.
 * @memberof module:Zoom.Data.Tuple
 * @since v1.15.0
 * @function map
 * @example
 * import { Tuple } from '@dustinws/zoom/data';
 *
 * const user = Tuple.of(1, 'Jake');
 *
 * Tuple.map(x => x.toUpperCase(), user).toString(); // (1, 'JAKE')
 *
 * @param  {Function} transform The function to run
 * @param  {Tuple} tuple The tuple
 * @return {Any}
 */
Tuple.map = curry((transform, tuple) =>
  Tuple.of(tuple.left, transform(tuple.right)));

/**
 * @description Apply a function to the first element of a tuple
 * and return a new, modified tuple.
 * @memberof module:Zoom.Data.Tuple
 * @since v1.15.0
 * @function mapLeft
 * @example
 * import { Tuple } from '@dustinws/zoom/data';
 *
 * const user = Tuple.of(1, 'Jake');
 *
 * Tuple.mapLeft(n => n + 1, user).toString(); // (2, 'Jake')
 *
 * @param  {Function} transform The function to run
 * @param  {Tuple} tuple The tuple
 * @return {Any}
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
* @memberof module:Zoom.Data.Tuple
* @since v1.15.0
* @example
* import { Tuple } from '@dustinws/zoom/data';
*
* const emptyTuple = Tuple.of();
*
* emptyTuple.of(1, 3).toString(); // (1, 3)
*
* @param  {Any} left The first element
* @param  {Any} right The second element
* @return {Tuple}
*/
Tuple.prototype.of = function of(left, right) {
  return Tuple.of(left, right);
};

/**
* @description Get the first element of a Tuple. Instance version of "Tuple.fst"
* @memberof module:Zoom.Data.Tuple
* @since v1.15.0
* @example
* import { Tuple } from '@dustinws/zoom/data';
*
* Tuple.of(1, 'Jake').fst(); // 1
*
* @return {Any}
*/
Tuple.prototype.fst = function fst() {
  return Tuple.fst(this);
};

/**
* @description Get the second element of a Tuple. Instance version of "Tuple.snd"
* @memberof module:Zoom.Data.Tuple
* @since v1.15.0
* @example
* import { Tuple } from '@dustinws/zoom/data';
*
* Tuple.of(1, 'Jake').snd(); // 'Jake'
*
* @return {Any}
*/
Tuple.prototype.snd = function snd() {
  return Tuple.snd(this);
};

/**
* @description Apply a function to the second element of a tuple
* and return a new, modified tuple. Instance version of "Tuple.map"
* @memberof module:Zoom.Data.Tuple
* @since v1.15.0
* @example
* import { Tuple } from '@dustinws/zoom/data';
*
* const user = Tuple.of(1, 'Jake');
*
* user.map(x => x.toUpperCase()).toString() // (1, 'JAKE')
*
* @param  {Function} transform The function to run
* @return {Any}
*/
Tuple.prototype.map = function map(transform) {
  return Tuple.map(transform, this);
};

/**
* @description Apply a function to the first element of a tuple
* and return a new, modified tuple. Instance version of "Tuple.mapLeft"
* @memberof module:Zoom.Data.Tuple
* @since v1.15.0
* @example
* import { Tuple } from '@dustinws/zoom/data';
*
* const user = Tuple.of(1, 'Jake');
*
* user.mapLeft(n => n + 1).toString(); // (2, 'Jake')
*
* @param  {Function} transform The function to run
* @param  {Tuple} tuple The tuple
* @return {Any}
*/
Tuple.prototype.mapLeft = function mapLeft(transform) {
  return Tuple.mapLeft(transform, this);
};

/**
* @description Get the string representation of the tuple.
* @memberof module:Zoom.Data.Tuple
* @since v1.15.0
* @example
* import { Tuple } from '@dustinws/zoom/data';
*
* Tuple.of(1, 'Jake').toString(); // (1, 'Jake')
*
* @return {String}
*/
Tuple.prototype.toString = function toString() {
  return `(${this.left.toString()}, ${this.right.toString()})`;
};


export default Tuple;
