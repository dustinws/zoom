'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isType2 = require('./_isType');

var _isType3 = _interopRequireDefault(_isType2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof module:Zoom.Check
 * @description Ensure a value is an object. Returns a Validation.
 * @since v1.14.0
 * @function object
 * @example
 * import { object } from '@dustinws/zoom/check';
 *
 * object({}).isSuccess() // true
 * object('').isSuccess() // false
 *
 * @param {Any} value The value to be checked
 * @return {Validation}
 */
var object = (0, _isType3.default)('Object');

exports.default = object;
module.exports = exports['default'];