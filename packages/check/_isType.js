'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isType;

var _typeOf = require('../core/typeOf');

var _typeOf2 = _interopRequireDefault(_typeOf);

var _Validation = require('../data/Validation');

var _Validation2 = _interopRequireDefault(_Validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isType(expectedType) {
  return function (value) {
    var actualType = (0, _typeOf2.default)(value);

    if (actualType !== expectedType) {
      return _Validation2.default.Failure(new TypeError('Expected type ' + expectedType + ' but got type ' + actualType + '!'));
    }

    return _Validation2.default.Success(value);
  };
}
module.exports = exports['default'];