'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adt = require('../adt');

var _constant = require('../core/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Validation = (0, _adt.union)('Validation', {
  Success: ['value'],
  Failure: ['value']
});

Validation.of = Validation.Success.of = Validation.Success;

Validation.Failure.of = Validation.Failure.prototype.of = function of(value) {
  return Validation.Failure(value);
};

Validation.prototype.of = Validation.Success.prototype.of = function of(value) {
  return Validation.Success(value);
};

Validation.prototype.chain = function chain(transform) {
  return this.cata({
    Failure: (0, _constant2.default)(this),
    Success: transform
  });
};

Validation.prototype.map = function map(transform) {
  var _this = this;

  return this.chain(function (x) {
    return _this.of(transform(x));
  });
};

Validation.prototype.isFailure = function isFailure() {
  return this instanceof Validation.Failure;
};

Validation.prototype.isSuccess = function isSuccess() {
  return this instanceof Validation.Success;
};

Validation.prototype.concat = function concat(other) {
  var _this2 = this;

  return this.cata({
    Failure: function Failure(value) {
      return other.cata({
        Success: (0, _constant2.default)(_this2),
        Failure: function Failure(x) {
          return Validation.Failure(value.concat(x));
        }
      });
    },

    Success: function Success(value) {
      return other.cata({
        Success: function Success(x) {
          return Validation.Success(value.concat(x));
        },
        Failure: (0, _constant2.default)(other)
      });
    }
  });
};

Validation.empty = function () {
  return Validation.Success([]);
};

Validation.combine = function (cases) {
  return function (value) {
    return Object.keys(cases).reduce(function (result, nextCase) {
      return result.concat(cases[nextCase](value[nextCase]));
    }, Validation.empty()).map(function () {
      return value;
    });
  };
};

exports.default = Validation;
module.exports = exports['default'];