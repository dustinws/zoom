'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _object = require('./object');

var _object2 = _interopRequireDefault(_object);

var _core = require('../core');

var _Validation = require('../data/Validation');

var _Validation2 = _interopRequireDefault(_Validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _core.curry)(function (contract, value) {
  return (0, _object2.default)(value).chain(function () {
    var validation = Object.keys(value).reduce(function (result, item) {
      return result.chain(function () {
        return contract(value[item]);
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