'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tag = tag;
exports.union = union;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// symbol :: Symbol
var symbol = exports.symbol = Symbol('ADT.tag');

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
  Adt[symbol] = type;

  Adt.prototype.toString = function toString() {
    var _this2 = this;

    var paramsList = params.map(function (param) {
      return _this2[param];
    }).join(', ').trim();

    var paramDisplay = params.length ? '(' + paramsList + ')' : '';
    return '' + this[symbol] + paramDisplay;
  };

  return Adt;
}

function union(parentType, childTypes) {
  // Create the parent type.
  var Parent = tag(parentType);

  Object.keys(childTypes).forEach(function (childType) {
    // Get any params defined for the child.
    var params = childTypes[childType];

    // Tag the child object.
    var Child = tag.apply(undefined, [childType].concat(_toConsumableArray(params)));

    // Inherit from the parent type.
    var ogProto = Child.prototype;
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;

    Object.assign(Child.prototype, ogProto);

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