'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

var _maybe = require('../data/maybe');

var _maybe2 = _interopRequireDefault(_maybe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Get the value at the given key on the given object. Returns
 * a Maybe.
 * @memberof module:Zoom.Core
 * @since v1.16.0
 * @function prop
 * @example
 * // prop :: String -> { String: a } -> Maybe a
 * import { prop } from '@dustinws/zoom/core';
 *
 * prop('a', { a: 1 }) // Just(1)
 * prop('a', {}) // Nothing
 *
 * @param  {String} key The key to lookup
 * @param  {Object} object The object to query
 * @return {Maybe<Any>}
 */
function prop(key, object) {
  return _maybe2.default.fromNullable(object[key]);
}

exports.default = (0, _curry2.default)(prop);
module.exports = exports['default'];