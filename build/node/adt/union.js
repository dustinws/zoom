'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tag = require('./tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @memberof module:Zoom.ADT
 * @description Create a set of union types that all inherit from the returned
 * parent type. Adds a ".cata" method that acts as a switch between
 * the types. Instead of passing a type and a list of parameter names
 * like in "ADT.tag", an object is passed where the keys are the child
 * type names and the values are their associated parameter list.
 * If a type has no params (an empty array), an instance will be eagerly
 * created to act as a singleton.
 *
 * @since v1.0.0
 * @function union
 * @example
 * import { union } from '@dustinws/zoom/adt';
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
  var Parent = (0, _tag2.default)(parentType);

  Object.keys(childTypes).forEach(function (childType) {
    // Get any params defined for the child.
    var params = childTypes[childType];

    // Tag the child object.
    var Child = _tag2.default.apply(undefined, [childType].concat(_toConsumableArray(params)));

    // Inherit from the parent type.
    var ogProto = Child.prototype;
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;

    Object.assign(Child.prototype, ogProto);

    // Add the cata method.
    Child.prototype.cata = function cata(cases) {
      var _this = this;

      return cases[childType].apply(cases, _toConsumableArray(params.map(function (p) {
        return _this[p];
      })));
    };

    // Attach the child to the parent object. Eagerly create an
    // instance if there are no instance variables.
    Parent[childType] = params.length ? Child : Child();
  });

  return Parent;
}

exports.default = union;
module.exports = exports['default'];