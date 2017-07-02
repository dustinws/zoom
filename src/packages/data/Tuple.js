import { tag } from '../adt';

/**
 * The Tuple data type.
 *
 * @type {Tuple}
 */
const Tuple = tag('Tuple', 'left', 'right');

/**
 * Implement Applicative
 *
 * @param  {Any}
 * @param  {Any}
 * @return {Tuple}
 */
Tuple.of = (a, b) =>
  Tuple(a, b);

/**
 * Get the first element in a tuple.
 *
 * @param  {Tuple}
 * @return {A}
 */
Tuple.fst = tuple =>
  tuple.left;

/**
 * Get the second element in a tuple.
 *
 * @param  {Tuple}
 * @return {B}
 */
Tuple.snd = tuple =>
  tuple.right;

/**
 * Map a function over the second element in a tuple.
 *
 * @param  {Function} transform
 * @return {Tuple}
 */
Tuple.prototype.map = function map(transform) {
  return Tuple(this.left, transform(this.right));
};

/**
 * Map a function over the second element in a tuple.
 *
 * @param  {Function} transform
 * @return {Tuple}
 */
Tuple.prototype.mapLeft = function map(transform) {
  return Tuple(transform(this.left), this.right);
};

export default Tuple;
