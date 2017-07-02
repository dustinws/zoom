'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adt = require('../adt');

var Tuple = (0, _adt.tag)('Tuple', 'left', 'right');

Tuple.of = function (a, b) {
  return Tuple(a, b);
};

Tuple.fst = function (tuple) {
  return tuple.left;
};

Tuple.snd = function (tuple) {
  return tuple.right;
};

Tuple.prototype.map = function map(transform) {
  return Tuple(this.left, transform(this.right));
};

Tuple.prototype.mapLeft = function map(transform) {
  return Tuple(transform(this.left), this.right);
};

exports.default = Tuple;
module.exports = exports['default'];