'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

var _find = require('./find');

var _find2 = _interopRequireDefault(_find);

var _matches = require('../record/matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Find the first element in a list that matches a query object.
 * @memberof List
 * @since v1.17.0
 * @function findWhere
 * @example
 * // findWhere :: { String: * } -> [a] -> Maybe a
 * import { findWhere } from '@dustinws/zoom/data/list';
 *
 * findWhere({ a: 2 }, [{ a: 1 }, { a: 2 }]) // Just({ a: 2 })
 * findWhere({ a: 3 }, [{ a: 1 }, { a: 2 }]) // Nothing
 *
 * @param  {Function} query The query object
 * @param  {Array<T>} list The list to use
 * @return {Maybe<T>}
 */
function findWhere(query, list) {
  return (0, _find2.default)((0, _matches2.default)(query), list);
}

exports.default = (0, _curry2.default)(findWhere);
module.exports = exports['default'];