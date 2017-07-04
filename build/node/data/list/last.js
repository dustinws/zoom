'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maybe = require('../maybe');

var _maybe2 = _interopRequireDefault(_maybe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Get the last element of a potentially empty array.
 * @memberof List
 * @since v1.15.0
 * @function last
 * @example
 * import { last } from '@dustinws/zoom/data/list';
 *
 * last([1, 2]); // Just(2)
 * last([1]); // Just(1)
 * last([]); // Nothing
 *
 * @param  {Array<T>} list The array to use
 * @return {Maybe<T>}
 */
function last(list) {
  return _maybe2.default.fromNullable(list[list.length - 1]);
}

exports.default = last;
module.exports = exports['default'];