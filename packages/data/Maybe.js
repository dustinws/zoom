'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adt = require('../adt');

var _constant = require('../core/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Maybe = (0, _adt.union)('Maybe', {
  Just: ['value'],
  Nothing: []
});

Maybe.of = Maybe.Just.of = Maybe.Just;

Maybe.Nothing.of = (0, _constant2.default)(Maybe.Nothing);

Maybe.prototype.of = Maybe.Just.prototype.of = function of(value) {
  return Maybe.Just(value);
};

Maybe.prototype.chain = function chain(transform) {
  return this.cata({
    Nothing: (0, _constant2.default)(this),
    Just: transform
  });
};

Maybe.prototype.map = function map(transform) {
  var _this = this;

  return this.chain(function (x) {
    return _this.of(transform(x));
  });
};

Maybe.prototype.getOrElse = function getOrElse(value) {
  return this.cata({
    Nothing: (0, _constant2.default)(value),
    Just: (0, _constant2.default)(this.value)
  });
};

Maybe.prototype.isJust = function isJust() {
  return this instanceof Maybe.Just;
};

Maybe.prototype.isNothing = function isNothing() {
  return this === Maybe.Nothing;
};

Maybe.fromNullable = function (value) {
  if (value === null || value === undefined) {
    return Maybe.Nothing;
  }
  return Maybe.Just.of(value);
};

exports.default = Maybe;
module.exports = exports['default'];