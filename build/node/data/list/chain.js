'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

var _concat = require('./concat');

var _concat2 = _interopRequireDefault(_concat);

var _fold = require('./fold');

var _fold2 = _interopRequireDefault(_fold);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Map a function over an array and flatten
 * the results by one level.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function chain
 * @example
 * // chain :: (a -> [b]) -> [a] -> [b]
 * import { chain } from '@dustinws/zoom/data/list';
 *
 * chain(x => [x, x], [1, 2, 3]); // [1, 1, 2, 2, 3, 3]
 *
 * @param  {Function} transform The function used to transform the values
 * @param  {Array} list The list to use
 * @return {Array}
 */
function chain(transform, list) {
  return (0, _fold2.default)(_concat2.default, [], (0, _map2.default)(transform, list));
}

exports.default = (0, _curry2.default)(chain);
module.exports = exports['default'];