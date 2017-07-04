'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fold = require('../list/fold');

var _fold2 = _interopRequireDefault(_fold);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Turn an array of [key, value] tuples into an object
 * @memberof Record
 * @since v1.16.0
 * @function fromPairs
 * @example
 * // fromPairs :: [[String, a]] -> { String: a }
 * import { fromPairs } from '@dustinws/zoom/data/record';
 *
 * fromPairs([['a', 1], ['b', 2]]) // { a: 1, b: 2 }
 *
 * @param  {Array<Array<mixed>>} tuples The list of [key, value] tuples
 * @return {Object}
 */
function fromPairs(tuples) {
  return (0, _fold2.default)(function (result, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    result[key] = value; // eslint-disable-line no-param-reassign
    return result;
  }, {}, tuples);
}

exports.default = fromPairs;
module.exports = exports['default'];