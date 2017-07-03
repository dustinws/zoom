'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = union;

var _validation = require('../data/validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof module:Zoom.Check
 * @description Create a contract that succeeds if any of it's inner contracts
 * succeeds.
 * @since v1.14.0
 * @function union
 * @example
 * import { union, string, bool } from '@dustinws/zoom/check';
 *
 * const myType = union([string, bool]);
 *
 * myType('').isSuccess() // true
 * myType(true).isSuccess() // false
 * myType(32).isSuccess() // false
 *
 * @param {Object} contracts An array of contracts
 * @param {Object} value The value to validate
 * @return {Validation}
 */
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

    return _validation2.default.Failure(validations.map(function (x) {
      return x.value;
    }));
  };
}
module.exports = exports['default'];