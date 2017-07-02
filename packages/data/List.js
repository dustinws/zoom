'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('../core/curry');

var _curry2 = _interopRequireDefault(_curry);

var _complement = require('../core/complement');

var _complement2 = _interopRequireDefault(_complement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = {};

List.of = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args;
};

List.fold = (0, _curry2.default)(function (fn, seed, list) {
  return list.reduce(fn, seed);
});

List.map = (0, _curry2.default)(function (fn, list) {
  return list.map(function (x) {
    return fn(x);
  });
});

List.filter = (0, _curry2.default)(function (fn, list) {
  return list.filter(function (x) {
    return fn(x);
  });
});

List.reject = (0, _curry2.default)(function (fn, list) {
  return list.filter((0, _complement2.default)(function (x) {
    return fn(x);
  }));
});

exports.default = List;
module.exports = exports['default'];