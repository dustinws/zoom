'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adt = require('../adt');

var _constant = require('../core/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Result = (0, _adt.union)('Result', {
  Ok: ['value'],
  Err: ['value']
});

Result.of = Result.Ok.of = Result.Ok;

Result.Err.of = Result.Err.prototype.of = function of(value) {
  return Result.Err(value);
};

Result.prototype.of = Result.Ok.prototype.of = function of(value) {
  return Result.Ok(value);
};

Result.prototype.chain = function chain(transform) {
  return this.cata({
    Err: (0, _constant2.default)(this),
    Ok: transform
  });
};

Result.prototype.map = function map(transform) {
  var _this = this;

  return this.chain(function (x) {
    return _this.of(transform(x));
  });
};

Result.prototype.isErr = function isErr() {
  return this instanceof Result.Err;
};

Result.prototype.isOk = function isOk() {
  return this instanceof Result.Ok;
};

exports.default = Result;
module.exports = exports['default'];