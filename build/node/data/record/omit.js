'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

var _fold = require('../list/fold');

var _fold2 = _interopRequireDefault(_fold);

var _includes = require('../list/includes');

var _includes2 = _interopRequireDefault(_includes);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Create a new object without the specified keys.
 * @memberof Record
 * @since v1.16.0
 * @function omit
 * @example
 * // omit :: [String] -> { String: a } -> { String: a }
 * import { omit } from '@dustinws/zoom/data/record';
 *
 * omit(['a'], { a: 1, b:2 }) // { b: 2 }
 *
 * const sanitzeUser = omit(['password']);
 *
 * sanitzeUser({ name: 'Jo', password: 'fjls' }) // { name: 'Jo' }
 *
 * @param  {Array<String>} props The keys to remove
 * @param  {Object} source The source object
 * @return {Object}
 */
function omit(props, source) {
  return (0, _fold2.default)(function (res, key) {
    if (!(0, _includes2.default)(key, props)) {
      res[key] = source[key];
    }
    return res;
  }, {}, (0, _keys2.default)(source));
}

exports.default = (0, _curry2.default)(omit);
module.exports = exports['default'];