'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _curry = require('../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

var _validation = require('../data/validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof module:Zoom.Check
 * @description Ensure each value in an array satisfies a contract.
 * @since v1.14.0
 * @function arrayOf
 * @example
 * import { arrayOf, string } from '@dustinws/zoom/check';
 *
 * arrayOf(string, ['foo']).isSuccess() // true
 * arrayOf(string, [23221]).isSuccess() // false
 *
 * @param {Function} contract The contract to verify
 * @param {Array<Any>} value The array to validate
 * @return {Validation}
 */
var arrayOf = (0, _curry2.default)(function (contract, value) {
  return (0, _array2.default)(value).chain(function () {
    var validation = value.reduce(function (result, item) {
      return result.chain(function () {
        return contract(item);
      });
    }, _validation2.default.empty());

    return validation.cata({
      Failure: _validation2.default.Failure,
      Success: function Success() {
        return _validation2.default.Success(value);
      }
    });
  });
});

exports.default = arrayOf;
module.exports = exports['default'];