'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _object = require('./object');

var _object2 = _interopRequireDefault(_object);

var _curry = require('../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

var _Validation = require('../data/Validation');

var _Validation2 = _interopRequireDefault(_Validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof module:Zoom.Check
 * @description Ensure each value in an object satisfies a contract.
 * @since v1.14.0
 * @function objectOf
 * @example
 * import { objectOf, string } from '@dustinws/zoom/check';
 *
 * objectOf(string, { a: '1' }).isSuccess() // true
 * objectOf(string, { a: 1 }).isSuccess() // false
 *
 * @param {Object} contract The contract to verify
 * @param {Object} value The array to validate
 * @return {Validation}
 */
exports.default = (0, _curry2.default)(function (contract, value) {
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