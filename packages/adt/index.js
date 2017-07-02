'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var symbol = Symbol('ADT.tag');

function tag(type) {
  for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  var tmp = _defineProperty({}, type, function () {
    var _this = this;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (!(this instanceof Adt)) {
      return new (Function.prototype.bind.apply(Adt, [null].concat(args)))();
    }

    params.forEach(function (param, idx) {
      _this[param] = args[idx];
    });

    this[symbol] = type;

    var paramList = params.map(function (p) {
      return _this[p];
    });
    this.toString = function toString() {
      return '' + type + (!params.length ? '' : '(' + paramList.map(function (x) {
        return x.toString();
      }).join(', ') + ')');
    };
  });

  var Adt = tmp[type];
  tmp = null;

  return Adt;
}

function union(parentType, childTypes) {
  var Parent = tag(parentType);

  Object.keys(childTypes).forEach(function (childType) {
    var params = childTypes[childType];

    var Child = tag.apply(undefined, [childType].concat(_toConsumableArray(params)));

    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;

    Child.prototype.cata = function cata(cases) {
      var _this2 = this;

      return cases[childType].apply(cases, _toConsumableArray(params.map(function (p) {
        return _this2[p];
      })));
    };

    Parent[childType] = params.length ? Child : Child();
  });

  return Parent;
}

exports.tag = tag;
exports.union = union;
exports.symbol = symbol;