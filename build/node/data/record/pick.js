'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

var _fold = require('../list/fold');

var _fold2 = _interopRequireDefault(_fold);

var _merge2 = require('./merge');

var _merge3 = _interopRequireDefault(_merge2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @description Create a new object containing only the specified keys.
 * @memberof Record
 * @since v1.16.0
 * @function pick
 * @example
 * // pick :: [String] -> { String: a } -> { String: a }
 * import { pick } from '@dustinws/zoom/data/record';
 *
 * pick(['a'], { a: 1, b:2 }) // { a: 1 }
 *
 * @param  {Array<String>} keys The keys to keep
 * @param  {Object} source The source object
 * @return {Object}
 */
function pick(keys, source) {
  return (0, _fold2.default)(function (res, key) {
    return (0, _merge3.default)(res, _defineProperty({}, key, source[key]));
  }, {}, keys);
}

exports.default = (0, _curry2.default)(pick);
module.exports = exports['default'];