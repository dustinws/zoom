'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isType2 = require('./_isType');

var _isType3 = _interopRequireDefault(_isType2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof module:Zoom.Check
 * @description Ensure a value is a string. Returns a Validation.
 * @since v1.14.0
 * @function string
 * @example
 * import { string } from '@dustinws/zoom/check';
 *
 * string('').isSuccess() // true
 * string(32).isSuccess() // false
 *
 * @param {Any} value The value to be checked
 * @return {Validation}
 */
var string = (0, _isType3.default)('String');

exports.default = string;
module.exports = exports['default'];