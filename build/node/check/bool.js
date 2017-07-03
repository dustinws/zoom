'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isType2 = require('./_isType');

var _isType3 = _interopRequireDefault(_isType2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof module:Zoom.Check
 * @description Ensure a value is an Boolean. Returns a Validation.
 * @since v1.14.0
 * @function bool
 * @example
 * import { bool } from '@dustinws/zoom/check';
 *
 * bool(true).isSuccess() // true
 * bool('').isSuccess() // false
 *
 * @param {Any} value The value to be checked
 * @return {Validation}
 */
var bool = (0, _isType3.default)('Boolean');

exports.default = bool;
module.exports = exports['default'];