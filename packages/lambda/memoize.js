'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _includes = require('../data/list/includes');

var _includes2 = _interopRequireDefault(_includes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof module:Zoom.Lambda
 * @description Create a function that only runs for arguments it hasn't
 * computed yet.
 * @since v2.0.0
 * @function memoize
 * @example
 * // memoize :: (a -> b) -> (a -> b)
 * import { memoize } from '@dustinws/zoom/packages/core';
 *
 * let count = 0;
 *
 * function someExpensiveOperation() {
 *   count += 1;
 *
 *   return count;
 * }
 *
 * const memoized = memoize(someExpensiveOperation);
 *
 * memoized(1); // 1
 * memoized(1); // 1
 * memoized(1); // 1
 * memoized(1); // 1
 *
 * count; // 1
 *
 * memoized(2); // 2
 * memoized(2); // 2
 * memoized(2); // 2
 * memoized(2); // 2
 *
 * count; // 2
 *
 * @param  {Any} value The value the memoize will return.
 * @return {Function}
 */
function memoize(func) {
  var memoized = function memoized(firstArg) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    var _memoized$cache = _slicedToArray(memoized.cache, 2),
        keys = _memoized$cache[0],
        vals = _memoized$cache[1];

    // If we've seen this argument before, just return the
    // cached result.


    if ((0, _includes2.default)(firstArg, keys)) {
      return vals[keys.indexOf(firstArg)];
    }

    // Otherwise, call the function and save the results.
    var result = func.apply(undefined, [firstArg].concat(rest));
    memoized.cache[0].push(firstArg);
    memoized.cache[1].push(result);
    return result;
  };

  // Create the cache
  memoized.cache = [[], []];

  return memoized;
}

exports.default = memoize;
module.exports = exports['default'];