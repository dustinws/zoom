'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

var _indexOf = require('./indexOf');

var _indexOf2 = _interopRequireDefault(_indexOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Determine if an item is present in an array.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function includes
 * @example
 * // includes :: * -> [*] -> Bool
 * import { includes } from '@dustinws/zoom/packages/data/list';
 *
 * includes(1, [1]); // true
 * includes(2, [1]); // false
 *
 * @param  {Any} value The value to detect
 * @param  {Array<Any>} list The array to query
 * @return {Boolean}
 */
function includes(value, list) {
  return (0, _indexOf2.default)(value, list).isJust();
}

exports.default = (0, _curry2.default)(includes);
module.exports = exports['default'];