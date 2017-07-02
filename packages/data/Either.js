'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adt = require('../adt');

var _constant = require('../core/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Either = (0, _adt.union)('Either', {
  Right: ['value'],
  Left: ['value']
});

Either.of = Either.Right.of = Either.Right;

Either.Left.of = Either.Left.prototype.of = function of(value) {
  return Either.Left(value);
};

Either.prototype.of = Either.Right.prototype.of = function of(value) {
  return Either.Right(value);
};

Either.prototype.chain = function chain(transform) {
  return this.cata({
    Left: (0, _constant2.default)(this),
    Right: transform
  });
};

Either.prototype.map = function map(transform) {
  var _this = this;

  return this.chain(function (x) {
    return _this.of(transform(x));
  });
};

Either.prototype.isLeft = function isLeft() {
  return this instanceof Either.Left;
};

Either.prototype.isRight = function isRight() {
  return this instanceof Either.Right;
};

Either.try = function (func) {
  return function () {
    try {
      return Either.Right(func.apply(undefined, arguments));
    } catch (error) {
      return Either.Left(error);
    }
  };
};

exports.default = Either;
module.exports = exports['default'];