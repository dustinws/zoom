'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Math = exports.Logic = exports.Lang = exports.Lambda = exports.Data = exports.Core = exports.Check = exports.ADT = undefined;

var _adt = require('./adt');

var ADT = _interopRequireWildcard(_adt);

var _check = require('./check');

var Check = _interopRequireWildcard(_check);

var _core = require('./core');

var Core = _interopRequireWildcard(_core);

var _data = require('./data');

var Data = _interopRequireWildcard(_data);

var _lambda = require('./lambda');

var Lambda = _interopRequireWildcard(_lambda);

var _lang = require('./lang');

var Lang = _interopRequireWildcard(_lang);

var _logic = require('./logic');

var Logic = _interopRequireWildcard(_logic);

var _math = require('./math');

var Math = _interopRequireWildcard(_math);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @namespace Zoom
 */

exports.ADT = ADT;
exports.Check = Check;
exports.Core = Core;
exports.Data = Data;
exports.Lambda = Lambda;
exports.Lang = Lang;
exports.Logic = Logic;
exports.Math = Math;