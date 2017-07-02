'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pipe;

var _List = require('../data/List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pipe() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    var head = fns[0],
        tail = fns.slice(1);


    return _List2.default.fold(function (a, b) {
      return b(a);
    }, head.apply(undefined, arguments), tail);
  };
}
module.exports = exports['default'];