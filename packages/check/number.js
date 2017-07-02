'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isType2 = require('./_isType');

var _isType3 = _interopRequireDefault(_isType2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof module:check
 * @description Ensure a value is a number. Returns a Validation.
 * @since v1.14.0
 * @function number
 * @example
 * import { number } from '@dustinws/zoom/packages/check';
 *
 * number(32).isSuccess() // true
 * number('').isSuccess() // false
 *
 * @param {Any} value The value to be checked
 * @return {Validation}
 */
var number = (0, _isType3.default)('Number');

exports.default = number;
module.exports = exports['default'];