'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _lambda = require('../lambda');

var _Validation = require('../data/Validation');

var _Validation2 = _interopRequireDefault(_Validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _lambda.curry)(function (contracts, value) {
  return (0, _array2.default)(contracts).chain(function () {
    return (0, _array2.default)(value);
  }).chain(function () {
    if (contracts.length !== value.length) {
      return _Validation2.default.Failure(new TypeError('Invalid Product Length.'));
    }
    var validation = value.reduce(function (result, item, idx) {
      return result.chain(function () {
        return contracts[idx](value[idx]);
      });
    }, _Validation2.default.empty());

    return validation.cata({
      Failure: _Validation2.default.Failure,
      Success: function Success() {
        return _Validation2.default.Success(value);
      }
    });
  });
});
module.exports = exports['default'];