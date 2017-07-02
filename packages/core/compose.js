'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compose;

var _pipe = require('./pipe');

var _pipe2 = _interopRequireDefault(_pipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function compose() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return _pipe2.default.apply(undefined, _toConsumableArray(fns.reverse()));
}
module.exports = exports['default'];