'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _add = require('./add');

Object.defineProperty(exports, 'add', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_add).default;
  }
});

var _ceil = require('./ceil');

Object.defineProperty(exports, 'ceil', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ceil).default;
  }
});

var _divide = require('./divide');

Object.defineProperty(exports, 'divide', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_divide).default;
  }
});

var _floor = require('./floor');

Object.defineProperty(exports, 'floor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_floor).default;
  }
});

var _multiply = require('./multiply');

Object.defineProperty(exports, 'multiply', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_multiply).default;
  }
});

var _subtract = require('./subtract');

Object.defineProperty(exports, 'subtract', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_subtract).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }