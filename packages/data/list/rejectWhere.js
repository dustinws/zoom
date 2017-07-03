'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

var _reject = require('./reject');

var _reject2 = _interopRequireDefault(_reject);

var _matches = require('../record/matches');

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Remove all objects in a list that have the same comparable
 * values as the query object.
 * @memberof module:Zoom.Data.List
 * @since v1.17.0
 * @function rejectWhere
 * @example
 * // rejectWhere :: { String: * } -> [{ String: * }] -> [{ String: * }]
 * import { rejectWhere } from '@dustinws/zoom/packages/data/list';
 *
 * const users = [{ name: 'Lucy', admin: false }, { name: 'Jo', admin: true }];
 *
 * rejectWhere({ admin: false }, users); // [{ name: 'Jo', admin: true }]
 *
 * @param  {Object} query The query object
 * @param  {Array} list The list to use
 * @return {Array}
 */
function rejectWhere(query, list) {
  return (0, _reject2.default)((0, _matches2.default)(query), list);
}

exports.default = (0, _curry2.default)(rejectWhere);
module.exports = exports['default'];