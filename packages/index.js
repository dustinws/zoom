'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adt = require('./adt');

var ADT = _interopRequireWildcard(_adt);

var _check = require('./check');

var check = _interopRequireWildcard(_check);

var _core = require('./core');

var core = _interopRequireWildcard(_core);

var _data = require('./data');

var data = _interopRequireWildcard(_data);

var _logic = require('./logic');

var logic = _interopRequireWildcard(_logic);

var _math = require('./math');

var math = _interopRequireWildcard(_math);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @namespace Zoom
 */

exports.default = {
  ADT: ADT,
  check: check,
  core: core,
  data: data,
  logic: logic,
  math: math
};
module.exports = exports['default'];