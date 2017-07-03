'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../../core/curry');

var _curry2 = _interopRequireDefault(_curry);

var _complement = require('../../core/complement');

var _complement2 = _interopRequireDefault(_complement);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Apply a predicate to each element in an array and
 * return a new array containing all of the values the predicate
 * returned a falsy response for.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function reject
 * @example
 * // reject :: (a -> Bool) -> [a] -> [a]
 * import { reject } from '@dustinws/zoom/packages/data/list';
 *
 * const isOdd = n => n % 2;
 * const numbers = [1, 2, 3, 4, 5];
 *
 * reject(isOdd, numbers); // [2, 4]
 *
 * @param  {Function} predicate The function that determines which items to remove
 * @param  {Array<Any>} list The list to filter
 * @return {Array<Any>}
 */
function reject(predicate, list) {
  return (0, _filter2.default)((0, _complement2.default)(predicate), list);
}

exports.default = (0, _curry2.default)(reject);
module.exports = exports['default'];