'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @memberof module:Zoom.Lambda
 * @description Given a function and an array of values, apply the
 * array of values as parameters to the function.
 * @since v2.0.0
 * @function spread
 * @example
 * import { spread } from '@dustinws/zoom/lambda';
 *
 * Promise
 *   .all([
 *     lookupFileOne('one.txt'),
 *     lookupFileTwo('two.txt'),
 *     lookupFileThree('three.txt'),
 *   ])
 *   .then(
 *      spread((bufferOne, bufferTwo, bufferThree) => {
 *        // Do stuff with the buffers
 *      })
 *     );
 *
 * @param  {Function} func The function to run
 * @param  {Array<Any>} args The array to spread out
 * @return {Any}
 */
function spread(func, args) {
  return func.apply(undefined, _toConsumableArray(args));
}

exports.default = (0, _curry2.default)(spread);
module.exports = exports['default'];