'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('./path');

Object.defineProperty(exports, 'path', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_path).default;
  }
});

var _prop = require('./prop');

Object.defineProperty(exports, 'prop', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_prop).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }