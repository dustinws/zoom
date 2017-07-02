'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adt = require('../adt');

/**
 * The Tuple data type.
 *
 * @type {Tuple}
 */
var Tuple = (0, _adt.tag)('Tuple', 'left', 'right');

/**
 * Implement Applicative
 *
 * @param  {Any}
 * @param  {Any}
 * @return {Tuple}
 */
Tuple.of = function (a, b) {
  return Tuple(a, b);
};

/**
 * Get the first element in a tuple.
 *
 * @param  {Tuple}
 * @return {A}
 */
Tuple.fst = function (tuple) {
  return tuple.left;
};

/**
 * Get the second element in a tuple.
 *
 * @param  {Tuple}
 * @return {B}
 */
Tuple.snd = function (tuple) {
  return tuple.right;
};

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
Tuple.prototype.mapLeft = function mapLeft(transform) {
  return Tuple(transform(this.left), this.right);
};

/**
 * Represent the tuple as a string value.
 *
 * @return {String}
 */
Tuple.prototype.toString = function toString() {
  return '(' + this.left.toString() + ', ' + this.right.toString() + ')';
};

exports.default = Tuple;
module.exports = exports['default'];