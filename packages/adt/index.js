'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @module ADT
 * @description Helpers for creating abstract data types.
 */

/**
 * @memberof module:ADT
 * @description The tag used to get an object's type.
 * @since v1.0.0
 * @type {Symbol}
 * @example
 * import { symbol } from '@dustinws/zoom/packages/adt';
 *
 * const obj = {
 *   [symbol]: 'MyType',
 * };
 */
var symbol = Symbol('ADT.tag');

/**
 * @memberof module:ADT
 * @description Create a tagged abstract data type. Tags the object with the
 * "ADT.symbol" value, and creates a "toString" method.
 *
 * @since v1.0.0
 * @example
 * import { tag, symbol } from '@dustinws/zoom/packages/adt';
 *
 * const Point2D = tag('Point2D', 'x', 'y');
 *
 * const point = Point2D(0, 0);
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

  Adt.prototype[symbol] = type;

  Adt.prototype.toString = function toString() {
    var _this2 = this;

    var paramsList = params.map(function (param) {
      return _this2[param].toString();
    }).join(', ');
    return '' + this[symbol] + (paramsList && '(' + paramsList + ')');
  };

  return Adt;
}

/**
 * @memberof module:ADT
 * @description Create a set of union types that all inherit from the returned
 * parent type. Adds a ".cata" method that acts as a switch between
 * the types. Instead of passing a type and a list of parameter names
 * like in "ADT.tag", an object is passed where the keys are the child
 * type names and the values are their associated parameter list.
 * If a type has no params (an empty array), an instance will be eagerly
 * created to act as a singleton.
 *
 * @since v1.0.0
 * @example
 * import { union } from '@dustinws/zoom/packages/adt';
 *
 * const Maybe = union('Maybe', {
 *   Just: ['value'],
 *   Nothing: [],
 * });
 *
 * Maybe.prototype.getOrElse = function getOrElse(defaultValue) {
 *   return this.cata({
 *     Just(value) {
 *       return value;
 *     },
 *
 *     Nothing() {
 *       return defaultValue;
 *     },
 *   });
 * };
 *
 * const justFoo = Maybe.Just('foo');
 * const nothing = Maybe.Nothing;
 *
 * justFoo instanceof Maybe // true
 * justFoo instanceof Maybe.Just // true
 *
 * nothing instanceof Maybe // true
 *
 * justFoo.getOrElse('bar'); // 'foo'
 * nothing.getOrElse('bar'); // 'bar'
 *
 * @param  {String} parentType The name of the super type
 * @param  {Object} childTypes An object of case types and their param names
 * @return {Function}
 */
function union(parentType, childTypes) {
  // Create the parent type.
  var Parent = tag(parentType);

  Object.keys(childTypes).forEach(function (childType) {
    // Get any params defined for the child.
    var params = childTypes[childType];

    // Tag the child object.
    var Child = tag.apply(undefined, [childType].concat(_toConsumableArray(params)));

    // Inherit from the parent type.
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;

    // Add the cata method.
    Child.prototype.cata = function cata(cases) {
      var _this3 = this;

      return cases[childType].apply(cases, _toConsumableArray(params.map(function (p) {
        return _this3[p];
      })));
    };

    // Attach the child to the parent object. Eagerly create an
    // instance if there are no instance variables.
    Parent[childType] = params.length ? Child : Child();
  });

  return Parent;
}

exports.tag = tag;
exports.union = union;
exports.symbol = symbol;