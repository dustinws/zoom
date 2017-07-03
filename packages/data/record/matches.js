'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _curry = require('../../core/curry');

var _curry2 = _interopRequireDefault(_curry);

var _entries = require('./entries');

var _entries2 = _interopRequireDefault(_entries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Determine if an object has the same comparable values at
 * each key as a provided query object.
 * @memberof module:Zoom.Data.Record
 * @since v1.16.0
 * @function matches
 * @example
 * import { Record } from '@dustinws/zoom/packages/data';
 *
 * Record.matches({ name: 'barry' }, { name: 'barry', age: 31 }) // true
 * Record.matches({ name: 'barry' }, { name: 'jake', age: 26 }) // false
 *
 * @param  {Object} query The query object
 * @param  {Object} object The object to query
 * @return {Boolean}
 */
function matches(query, object) {
  var queries = (0, _entries2.default)(query);
  var key = void 0;
  var val = void 0;

  for (var i = 0; i < queries.length; i += 1) {
    var _queries$i = _slicedToArray(queries[i], 2);

    key = _queries$i[0];
    val = _queries$i[1];

    if (object[key] !== val) return false;
  }
  return true;
}

exports.default = (0, _curry2.default)(matches);
module.exports = exports['default'];