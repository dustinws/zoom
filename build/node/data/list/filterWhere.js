'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _matches = require('../record/matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Find all objects in a list that have the same comparable
 * values as the query object.
 * @memberof module:Zoom.Data.List
 * @since v1.17.0
 * @function filterWhere
 * @example
 * // filterWhere :: { String: * } -> [{ String: * }] -> [{ String: * }]
 * import { filterWhere } from '@dustinws/zoom/data/list';
 *
 * const isAdmin = {
 *   admin: true,
 * };
 *
 * const users = [{ name: 'Lucy', admin: false }, { name: 'Jo', admin: true }];
 *
 * filterWhere(isAdmin, users); // [{ name: 'Jo', admin: true }]
 *
 * @param  {Object} query The query object
 * @param  {Array} list The list to use
 * @return {Array}
 */
function filterWhere(query, list) {
  return (0, _filter2.default)((0, _matches2.default)(query), list);
}

exports.default = (0, _curry2.default)(filterWhere);
module.exports = exports['default'];