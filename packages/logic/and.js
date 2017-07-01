'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A curried wrapper around the logical && operator.
 *
 * @param  {Any} left
 * @param  {Any} right
 * @return {Any}
 */
exports.default = (0, _curry2.default)(function (left, right) {
  return left && right;
});
module.exports = exports['default'];