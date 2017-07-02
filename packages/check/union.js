'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = union;

var _Validation = require('../data/Validation');

var _Validation2 = _interopRequireDefault(_Validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function union(contracts) {
  return function (value) {
    var validations = contracts.map(function (f) {
      return f(value);
    });
    var valid = validations.find(function (x) {
      return x.isSuccess();
    });

    if (valid) {
      return valid;
    }

    return _Validation2.default.Failure(validations.map(function (x) {
      return x.value;
    }));
  };
}
module.exports = exports['default'];