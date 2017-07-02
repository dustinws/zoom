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
const symbol = Symbol('ADT.tag');

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
function tag(type, ...params) {
  // Store the constructor on a temporary object so that
  // the constructor name will correctly match the type.
  let tmp = {
    // eslint-disable-next-line object-shorthand, func-names, consistent-return
    [type]: function (...args) {
      // Call new here so the consumer doesn't have to.
      if (!(this instanceof Adt)) {
        return new Adt(...args);
      }

      // Set all instance variables.
      params.forEach((param, idx) => {
        this[param] = args[idx];
      });
    },
  };

  // Retrieve the constructor and send the temporary object to GC.
  const Adt = tmp[type];
  tmp = null;

  Adt.prototype[symbol] = type;

  Adt.prototype.toString = function toString() {
    const paramsList = params.map(param => this[param].toString()).join(', ');
    return `${this[symbol]}${paramsList && `(${paramsList})`}`;
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
  const Parent = tag(parentType);

  Object.keys(childTypes).forEach((childType) => {
    // Get any params defined for the child.
    const params = childTypes[childType];

    // Tag the child object.
    const Child = tag(childType, ...params);

    // Inherit from the parent type.
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;

    // Add the cata method.
    Child.prototype.cata = function cata(cases) {
      return cases[childType](...params.map(p => this[p]));
    };

    // Attach the child to the parent object. Eagerly create an
    // instance if there are no instance variables.
    Parent[childType] = params.length ? Child : Child();
  });

  return Parent;
}

export {
  tag,
  union,
  symbol,
};
