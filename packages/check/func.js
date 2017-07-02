'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isType2 = require('./_isType');

var _isType3 = _interopRequireDefault(_isType2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof module:Zoom.Check
 * @description Ensure a value is an Function. Returns a Validation.
 * @since v1.14.0
 * @function func
 * @example
 * import { func } from '@dustinws/zoom/packages/check';
 *
 * func(function(){}).isSuccess() // true
 * func('').isSuccess() // false
 *
 * @param {Any} value The value to be checked
 * @return {Validation}
 */
var func = (0, _isType3.default)('Function');

exports.default = func;
module.exports = exports['default'];