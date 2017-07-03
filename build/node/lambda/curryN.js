'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./__');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @memberof module:Zoom.Lambda
 * @description Convert a non-curried function with the given arity to
 * a curried function. This includes compatibility with "core.__".
 * @since v2.0.0
 * @function curryN
 * @example
 * import { curryN } from '@dustinws/zoom/lambda';
 *
 * const add = curryN(2, (a, b) => a + b);
 *
 * add(1, 4); // 5
 * add(1)(4); // 5
 * add(1); // [Function]
 * add(1)(); // [Function]
 *
 * @param  {Number} arity The number of arguments the function expects
 * @param  {Function} func The function to curry
 * @return {Function}
 */
function curryN(arity, func) {
  return function curried() {
    for (var _len = arguments.length, as = Array(_len), _key = 0; _key < _len; _key++) {
      as[_key] = arguments[_key];
    }

    if (as.length >= arity && as.indexOf(_2.default) < 0) {
      return func.apply(undefined, as);
    }
    return function () {
      for (var _len2 = arguments.length, bs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        bs[_key2] = arguments[_key2];
      }

      return (
        // eslint-disable-next-line no-confusing-arrow
        curried.apply(undefined, _toConsumableArray(as.map(function (x) {
          return x === _2.default ? bs.shift() : x;
        }).concat(bs)))
      );
    };
  };
}

exports.default = curryN(2, curryN);
module.exports = exports['default'];