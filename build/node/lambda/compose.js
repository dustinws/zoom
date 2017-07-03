'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compose;

var _pipe = require('./pipe');

var _pipe2 = _interopRequireDefault(_pipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @memberof module:Zoom.Lambda
 * @description Create a right to left function composition.
 * @since v2.0.0
 * @function compose
 * @example
 * import { compose } from '@dustinws/zoom/lambda';
 *
 * const square = n => n * n;
 * const increment = n => n + 1;
 *
 * const main = compose(square, increment);
 *
 * main(4); // 25
 * compose(square, increment)(4) === square(increment(4))
 *
 * @param  {...Function} functions The functions to compose
 * @return {Function}
 */
function compose() {
  for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return _pipe2.default.apply(undefined, _toConsumableArray(functions.reverse()));
}
module.exports = exports['default'];