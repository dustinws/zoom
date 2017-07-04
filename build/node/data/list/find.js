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
 * @description Find the first element in a list that satisfies a predicate
 * function. Returns a Maybe.
 * @memberof List
 * @since v1.17.0
 * @function find
 * @example
 * // find :: (a -> Bool) -> [a] -> Maybe a
 * import { find } from '@dustinws/zoom/data/list';
 *
 * const isOdd = n => n % 2;
 *
 * find(isOdd, [2, 4, 2, 3]) // Just(3)
 * find(isOdd, [2, 4, 2, 2]) // Nothing
 *
 * @param  {Function} predicate The function used to match the element
 * @param  {Array<T>} list The list to use
 * @return {Maybe<T>}
 */
function find(predicate, list) {
  for (var i = 0; i < list.length; i += 1) {
    if (predicate(list[i])) {
      return _maybe2.default.Just.of(list[i]);
    }
  }

  return _maybe2.default.Nothing;
}

exports.default = (0, _curry2.default)(find);
module.exports = exports['default'];