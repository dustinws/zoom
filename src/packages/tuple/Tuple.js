import curry from 'ramda/src/curry';
import { tag } from '../adt';

const Tuple = tag('Tuple', 'left', 'right');


/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// fst :: (a, b) -> a
Tuple.fst = tuple => tuple.left;

// snd :: (a, b) -> b
Tuple.snd = tuple => tuple.right;

// equals :: (a, b) -> (a, b) -> Bool
Tuple.equals = curry((left, right) =>
  left.left === right.left && left.right === right.right);

// map :: (b -> c) -> (a, b) -> (a, c)
Tuple.map = curry((transform, tuple) =>
  Tuple(tuple.left, transform(tuple.right)));

// mapLeft :: (a -> c) -> (a, b) -> (c, b)
Tuple.mapLeft = curry((transform, tuple) =>
  Tuple(transform(tuple.left), tuple.right));


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

// fst :: (a, b) ~> c -> a
Tuple.prototype.fst = function fst() {
  return Tuple.fst(this);
};

// fst :: (a, b) ~> c -> b
Tuple.prototype.snd = function snd() {
  return Tuple.snd(this);
};

// equals :: (a, b) ~> (a, b) -> Bool
Tuple.prototype.equals = function equals(tuple) {
  return Tuple.equals(tuple, this);
};

// map :: (a, b) ~> (b -> c) -> (a, c)
Tuple.prototype.map = function map(transform) {
  return Tuple.map(transform, this);
};

// mapLeft :: (a, b) ~> (a -> c) -> (c, b)
Tuple.prototype.mapLeft = function mapLeft(transform) {
  return Tuple.mapLeft(transform, this);
};

// toString :: (a, b) ~> c -> String
Tuple.prototype.toString = function toString() {
  return `(${this.left.toString()}, ${this.right.toString()})`;
};

// Symbol.iterator :: (a, b) ~> c -> Iterator
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
