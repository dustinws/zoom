'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constant = require('../lambda/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description A constant for the value "true"
 * @memberof module:Zoom.Lang
 * @since v2.0.0
 * @function True
 * @example
 * True :: * -> Bool
 * import { True } from '@dustinws/zoom/lang';
 *
 * True(); // true
 * True(1, [], function(){}); // true
 *
 * @return {Boolean}
 */
var True = (0, _constant2.default)(true);

exports.default = True;
module.exports = exports['default'];