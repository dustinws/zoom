'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isType2 = require('./_isType');

var _isType3 = _interopRequireDefault(_isType2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof module:Zoom.Check
 * @description Ensure a value is undefined. Returns a Validation.
 * @since v1.14.0
 * @function undef
 * @example
 * import { undef } from '@dustinws/zoom/check';
 *
 * undef(32).isSuccess() // true
 * undef('').isSuccess() // false
 *
 * @param {Any} value The value to be checked
 * @return {Validation}
 */
var undef = (0, _isType3.default)('Undefined');

exports.default = undef;
module.exports = exports['default'];