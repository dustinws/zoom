'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pipe;

var _fold = require('../data/list/fold');

var _fold2 = _interopRequireDefault(_fold);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof module:Zoom.Lambda
 * @description Create a left to right function composition.
 * @since v2.0.0
 * @function pipe
 * @example
 * import { pipe } from '@dustinws/zoom/lambda';
 *
 * const square = n => n * n;
 * const increment = n => n + 1;
 *
 * const main = pipe(increment, square);
 *
 * main(4); // 25
 * pipe(increment, square)(4) === square(increment(4))
 *
 * @param  {...Function} functions The functions to pipe
 * @return {Function}
 */
function pipe() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    var head = fns[0],
        tail = fns.slice(1);


    return (0, _fold2.default)(function (a, b) {
      return b(a);
    }, head.apply(undefined, arguments), tail);
  };
}
module.exports = exports['default'];