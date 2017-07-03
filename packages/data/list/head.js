'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Maybe = require('../Maybe');

var _Maybe2 = _interopRequireDefault(_Maybe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Get the first element of a potentially empty array.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function head
 * @example
 * // head :: [a] -> Maybe a
 * import { head } from '@dustinws/zoom/packages/data/list';
 *
 * head([1]); // Just(1)
 * head([]); // Nothing
 *
 * @param  {Array<T>} list The array to use
 * @return {Maybe<T>}
 */
function head(list) {
  return _Maybe2.default.fromNullable(list[0]);
}

exports.default = head;
module.exports = exports['default'];