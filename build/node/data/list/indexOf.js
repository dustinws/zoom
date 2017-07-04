'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

var _maybe = require('../maybe');

var _maybe2 = _interopRequireDefault(_maybe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Determine which index a value resides at inside of an
 * array. Returns a Maybe for the index, where Nothing indicates the
 * value is not present in the array.
 * @memberof List
 * @since v1.15.0
 * @function indexOf
 * @example
 * // indexOf :: * -> [*] -> Maybe Int
 * import { indexOf } from '@dustinws/zoom/data/list';
 *
 * indexOf(1, [1]); // Just(0)
 * indexOf(2, [1]); // Nothing
 *
 * @param  {Any} value The value to detect
 * @param  {Array<Any>} list The list to query
 * @return {Maybe<Number>}
 */
function indexOf(value, list) {
  var idx = list.indexOf(value);
  return idx === -1 ? _maybe2.default.Nothing : _maybe2.default.Just(idx);
}

exports.default = (0, _curry2.default)(indexOf);
module.exports = exports['default'];