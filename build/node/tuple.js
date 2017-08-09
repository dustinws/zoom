'use strict';

var _fantasyLand = require('fantasy-land');

var _fantasyLand2 = _interopRequireDefault(_fantasyLand);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _adt = require('./adt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tuple = (0, _adt.tag)('Tuple', 'left', 'right');

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// fst :: (a, b) -> a
Tuple.fst = function (tuple) {
  return tuple.left;
};

// snd :: (a, b) -> b
Tuple.snd = function (tuple) {
  return tuple.right;
};

// equals :: (a, b) -> (a, b) -> Bool
Tuple.equals = (0, _curry2.default)(function (left, right) {
  return left.left === right.left && left.right === right.right;
});

// map :: (b -> c) -> (a, b) -> (a, c)
Tuple.map = (0, _curry2.default)(function (transform, tuple) {
  return Tuple(tuple.left, transform(tuple.right));
});

// mapLeft :: (a -> c) -> (a, b) -> (c, b)
Tuple.mapLeft = (0, _curry2.default)(function (transform, tuple) {
  return Tuple(transform(tuple.left), tuple.right);
});

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
  return '(' + this.left.toString() + ', ' + this.right.toString() + ')';
};

// Symbol.iterator :: (a, b) ~> c -> Iterator
Tuple.prototype[Symbol.iterator] = function iterator() {
  var pending = ['left', 'right'];
  var tuple = this;
  return {
    next: function next() {
      if (pending.length) {
        return { value: tuple[pending.shift()] };
      }
      return { done: true };
    }
  };
};

/*
 |------------------------------------------------------------------------------
 | Fantasy Land
 |------------------------------------------------------------------------------
 */

// Tuple Applicative
Tuple[_fantasyLand2.default.equals] = Tuple.equals;
Tuple.prototype[_fantasyLand2.default.equals] = Tuple.prototype.equals;

// Tuple Functor
Tuple[_fantasyLand2.default.map] = Tuple.map;
Tuple.prototype[_fantasyLand2.default.map] = Tuple.prototype.map;

module.exports = Tuple;