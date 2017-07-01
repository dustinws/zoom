'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var __ = require('./__');

/**
 * Create a curried function with the given arity.
 *
 * @param  {Number} arity
 * @param  {Function} func
 * @return {Function}
 */
module.exports = function (arity, func) {
  return function curried() {
    for (var _len = arguments.length, as = Array(_len), _key = 0; _key < _len; _key++) {
      as[_key] = arguments[_key];
    }

    if (as.length >= arity && as.indexOf(__) < 0) {
      return func.apply(undefined, as);
    }
    return function () {
      for (var _len2 = arguments.length, bs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        bs[_key2] = arguments[_key2];
      }

      return (
        // eslint-disable-next-line no-confusing-arrow
        curried.apply(undefined, _toConsumableArray(as.map(function (x) {
          return x === __ ? bs.shift() : x;
        }).concat(bs)))
      );
    };
  };
};