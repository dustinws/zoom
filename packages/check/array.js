'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isType2 = require('./_isType');

var _isType3 = _interopRequireDefault(_isType2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof module:check
 * @description Ensure a value is an array. Returns a Validation.
 * @since v1.14.0
 * @function array
 * @example
 * import { array } from '@dustinws/zoom/packages/check';
 *
 * array([]).isSuccess() // true
 * array('').isSuccess() // false
 *
 * @param {Any} value The value to be checked
 * @return {Validation}
 */
var array = (0, _isType3.default)('Array');

exports.default = array;
module.exports = exports['default'];