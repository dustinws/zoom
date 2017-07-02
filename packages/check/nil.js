'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isType2 = require('./_isType');

var _isType3 = _interopRequireDefault(_isType2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof module:Zoom.Check
 * @description Ensure a value is a null. Returns a Validation.
 * @since v1.14.0
 * @function nil
 * @example
 * import { nil } from '@dustinws/zoom/packages/check';
 *
 * nil(null).isSuccess() // true
 * nil('').isSuccess() // false
 *
 * @param {Any} value The value to be checked
 * @return {Validation}
 */
var nil = (0, _isType3.default)('Null');

exports.default = nil;
module.exports = exports['default'];