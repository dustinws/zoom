'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tag = tag;
exports.union = union;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The tag used to get an object's type.
 *
 * @type {Symbol}
 */
var symbol = exports.symbol = Symbol('ADT.tag');

/**
 * Create a tagged abstract data type.
 *
 * @param  {String} type
 * @param  {Any[]} ...params
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

    // Tag the type.
    this[symbol] = type;
  });

  // Retrieve the constructor and send the temporary object to GC.
  var Adt = tmp[type];
  tmp = null;

  return Adt;
}

/**
 * Create a set of union types that all inherit from the returned
 * parent type.
 *
 * @param  {String} parentType
 * @param  {Object} childTypes
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
      var _this2 = this;

      return cases[childType].apply(cases, _toConsumableArray(params.map(function (p) {
        return _this2[p];
      })));
    };

    // Attach the child to the parent object. Eagerly create an
    // instance if there are no instance variables.
    Parent[childType] = params.length ? Child : Child();
  });

  return Parent;
}