'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

var _pipe = require('../../lambda/pipe');

var _pipe2 = _interopRequireDefault(_pipe);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

var _fold = require('../list/fold');

var _fold2 = _interopRequireDefault(_fold);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Create a new object where each value is the result of calling
 * the function with the original value at that key. Only the value is passed
 * to the "transform" function.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function map
 * @example
 * // map :: (a -> b) -> { String: a } -> { String: b }
 * import { map } from '@dustinws/zoom/data/record';
 *
 * map(n => n + 1, { a: 1 }) // { a: 2 }
 *
 * @param  {Function} transform The function to apply
 * @param  {Object} object The object transform
 * @return {Object}
 */
function map(transform, object) {
  return (0, _pipe2.default)(_keys2.default, (0, _fold2.default)(function (result, key) {
    // eslint-disable-next-line no-param-reassign
    result[key] = transform(object[key]);

    return result;
  }, {}))(object);
}

exports.default = (0, _curry2.default)(map);
module.exports = exports['default'];