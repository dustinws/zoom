'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fantasyLand = require('fantasy-land');

var _fantasyLand2 = _interopRequireDefault(_fantasyLand);

var _Task = require('./Task');

var _Task2 = _interopRequireDefault(_Task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Task Applicative
_Task2.default[_fantasyLand2.default.of] = _Task2.default.of;
_Task2.default.prototype[_fantasyLand2.default.of] = _Task2.default.prototype.of;

// Task Chain
_Task2.default[_fantasyLand2.default.chain] = _Task2.default.chain;
_Task2.default.prototype[_fantasyLand2.default.chain] = _Task2.default.prototype.chain;

// Task Functor
_Task2.default[_fantasyLand2.default.map] = _Task2.default.map;
_Task2.default.prototype[_fantasyLand2.default.map] = _Task2.default.prototype.map;

exports.default = _Task2.default;
module.exports = exports['default'];