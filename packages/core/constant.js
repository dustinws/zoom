"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = constant;
/**
 * Create a function that always returns the initial value.
 *
 * @param  {Any} constantValue
 * @return {Function}
 */
function constant(value) {
  return function () {
    return value;
  };
}
module.exports = exports["default"];