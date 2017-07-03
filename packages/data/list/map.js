'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../../core/curry');

var _curry2 = _interopRequireDefault(_curry);

var _fold = require('./fold');

var _fold2 = _interopRequireDefault(_fold);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Apply a function to each element in a list and return
 * the results in a new array.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function map
 * @example
 * // map :: (a -> b) -> [a] -> [b]
 * import { map } from '@dustinws/zoom/packages/data/list';
 *
 * const inc = n => n + 1;
 * const numbers = [1, 2, 3, 4, 5];
 *
 * map(inc, numbers); // [2, 3, 4, 5, 6]
 *
 * @param  {Function} fn
 * @param  {Array<Any>} list
 * @return {Array<Any>}
 */
function map(transform, list) {
  return (0, _fold2.default)(function (results, item) {
    results.push(transform(item));
    return results;
  }, [], list);
}

exports.default = (0, _curry2.default)(map);
module.exports = exports['default'];