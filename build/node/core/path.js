'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

var _prop = require('./prop');

var _prop2 = _interopRequireDefault(_prop);

var _fold = require('../data/list/fold');

var _fold2 = _interopRequireDefault(_fold);

var _Maybe = require('../data/Maybe');

var _Maybe2 = _interopRequireDefault(_Maybe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Get the value at the given path on the given object. Returns
 * a Maybe.
 * @memberof module:Zoom.Core
 * @since v1.16.0
 * @function path
 * @example
 * import { path } from '@dustinws/zoom/core';
 *
 * path(['a', 'b'], { a: { b: 1 } }) // Just(1)
 * path(['rows', 0], { rows: [1] }) // Just(1)
 * path(['a', 'b', 'c', 0, 'd'], {}) // Nothing
 *
 * @param  {Array<String | Number>} key An array of indices
 * @param  {Object} object The object to query
 * @return {Maybe<Any>}
 */
function path(crumbs, object) {
  return (0, _fold2.default)(function (a, b) {
    return a.chain((0, _prop2.default)(b));
  }, _Maybe2.default.Just(object), crumbs);
}

exports.default = (0, _curry2.default)(path);
module.exports = exports['default'];