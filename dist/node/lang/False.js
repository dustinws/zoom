'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constant = require('../lambda/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description A constant for the value "false"
 * @memberof module:Zoom.Lang
 * @since v2.0.0
 * @function False
 * @example
 * // False :: * -> Bool
 * import { False } from '@dustinws/zoom/packages/core';
 *
 * False(); // false
 * False(1, [], function(){}); // false
 *
 * @return {Boolean}
 */
var False = (0, _constant2.default)(false);

exports.default = False;
module.exports = exports['default'];