"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeOf;
function typeOf(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
module.exports = exports["default"];