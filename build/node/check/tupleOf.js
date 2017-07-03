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
 * @description Validate a co-product indexed by numbers.
 * @since v1.14.0
 * @function tupleOf
 * @example
 * import { tupleOf, number, string } from '@dustinws/zoom/check';
 *
 * const user = tupleOf([number, string]);
 *
 * user(['1', 'dustin']).isSuccess() // true
 * user([1, 'dustin']).isSuccess() // false
 * user(['dustin']).isSuccess() // false
 *
 * @param {Object} contracts An array of contracts
 * @param {Object} value The array to validate
 * @return {Validation}
 */
exports.default = (0, _curry2.default)(function (contracts, value) {
  return (0, _array2.default)(contracts).chain(function () {
    return (0, _array2.default)(value);
  }).chain(function () {
    if (contracts.length !== value.length) {
      return _validation2.default.Failure(new TypeError('Invalid Product Length.'));
    }
    var validation = value.reduce(function (result, item, idx) {
      return result.chain(function () {
        return contracts[idx](value[idx]);
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
module.exports = exports['default'];