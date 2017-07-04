'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _symbol = require('./symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @memberof module:Zoom.ADT
 * @description Create a tagged abstract data type. Tags the object with the
 * "ADT.symbol" value, and creates a "toString" method.
 * @function tag
 * @since v1.0.0
 * @example
 * import { tag, symbol } from 'zoomjs/adt';
 *
 * const Point2D = tag('Point2D', 'x', 'y');
 *
 * const point = Point2D(10, 15);
 *
 * point.x // 10
 * point.y // 15
 *
 * point instanceof Point2D // true
 * point[symbol] // 'Point2D'
 * point.toString() // 'Point2D(0, 0)'
 *
 * @param  {String} type The name of the type
 * @param  {...String} params Parameter names
 * @return {Function}
 */
function tag(type) {
  for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  // Store the constructor on a temporary object so that
  // the constructor name will correctly match the type.
  var tmp = _defineProperty({}, type, function () {
    var _this = this;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    // Call new here so the consumer doesn't have to.
    if (!(this instanceof Adt)) {
      return new (Function.prototype.bind.apply(Adt, [null].concat(args)))();
    }

    // Set all instance variables.
    params.forEach(function (param, idx) {
      _this[param] = args[idx];
    });
  });

  // Retrieve the constructor and send the temporary object to GC.
  var Adt = tmp[type];
  tmp = null;

  Adt.prototype[_symbol2.default] = type;

  Adt.prototype.toString = function toString() {
    var _this2 = this;

    var paramsList = params.map(function (param) {
      return _this2[param];
    }).join(', ').trim();

    var paramDisplay = params.length ? '(' + paramsList + ')' : '';
    return '' + this[_symbol2.default] + paramDisplay;
  };

  return Adt;
}

exports.default = tag;
module.exports = exports['default'];