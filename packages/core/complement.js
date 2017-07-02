"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = complement;
function complement(func) {
  return function () {
    return !func.apply(undefined, arguments);
  };
}
module.exports = exports["default"];