"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = constant;
function constant(value) {
  return function () {
    return value;
  };
}
module.exports = exports["default"];