'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../core/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A curried wrapper around the addition computation.
 *
 * @param  {Number} left
 * @param  {Number} right
 * @return {Number}
 */
exports.default = (0, _curry2.default)(function (left, right) {
  return left + right;
});
module.exports = exports['default'];