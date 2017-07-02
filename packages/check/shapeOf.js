'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _object = require('./object');

var _object2 = _interopRequireDefault(_object);

var _core = require('../core');

var _Validation = require('../data/Validation');

var _Validation2 = _interopRequireDefault(_Validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @memberof module:check
 * @description Validate a co-product indexed by strings.
 * @since v1.14.0
 * @function shapeOf
 * @example
 * import { shapeOf, string, bool } from '@dustinws/zoom/packages/check';
 *
 * const user = shapeOf({
 *   id: string,
 *   admin: bool,
 * });
 *
 * user({ id: '1', active: false }).isSuccess() // true
 * user({ id: 1, active: false }).isSuccess() // false
 * user({ active: false }).isSuccess() // false
 *
 * @param {Object} contracts An object of contracts
 * @param {Object} value The object to validate
 * @return {Validation}
 */
exports.default = (0, _core.curry)(function (contracts, value) {
  return (0, _object2.default)(contracts).chain(function () {
    return (0, _object2.default)(value);
  }).chain(function () {
    if (Object.keys(contracts).length !== Object.keys(value).length) {
      return _Validation2.default.Failure(new TypeError('Invalid Product Length.'));
    }
    var validation = Object.keys(value).reduce(function (result, item) {
      return result.chain(function () {
        return contracts[item](value[item]);
      });
    }, _Validation2.default.empty());

    return validation.cata({
      Failure: _Validation2.default.Failure,
      Success: function Success() {
        return _Validation2.default.Success(value);
      }
    });
  });
});
module.exports = exports['default'];