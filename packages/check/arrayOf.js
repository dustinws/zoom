'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _core = require('../core');

var _Validation = require('../data/Validation');

var _Validation2 = _interopRequireDefault(_Validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof module:Zoom.Check
 * @description Ensure each value in an array satisfies a contract.
 * @since v1.14.0
 * @function arrayOf
 * @example
 * import { arrayOf, string } from '@dustinws/zoom/packages/check';
 *
 * arrayOf(string, ['foo']).isSuccess() // true
 * arrayOf(string, [23221]).isSuccess() // false
 *
 * @param {Function} contract The contract to verify
 * @param {Array<Any>} value The array to validate
 * @return {Validation}
 */
var arrayOf = (0, _core.curry)(function (contract, value) {
  return (0, _array2.default)(value).chain(function () {
    var validation = value.reduce(function (result, item) {
      return result.chain(function () {
        return contract(item);
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

exports.default = arrayOf;
module.exports = exports['default'];