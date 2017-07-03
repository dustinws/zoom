'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Maybe = require('../Maybe');

var _Maybe2 = _interopRequireDefault(_Maybe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Get the last element of a potentially empty array.
 * @memberof module:Zoom.Data.List
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
  return _Maybe2.default.fromNullable(list[list.length - 1]);
}

exports.default = last;
module.exports = exports['default'];