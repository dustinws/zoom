/**
 * @module ADT
 */

/**
 * The tag used to get an object's type.
 *
 * @since v1.0.0
 * @type {Symbol}
 * @example
 * const obj = {
 *   [ADT.symbol]: 'MyType',
 * };
 */
export const symbol = Symbol('ADT.tag');

/**
 * Create a tagged abstract data type. Tags the object with the
 * "ADT.symbol" value, and creates a "toString" method.
 *
 * @since v1.0.0
 * @example
 * const Point2D = tag('Point2D', 'x', 'y');
 *
 * const point = Point2D(0, 0);
 *
 * point instanceof Point2D // true
 * point[ADT.symbol] // 'Point2D'
 * point.toString() // 'Point2D(0, 0)'
 *
 * @param  {String} type
 * @param  {...String} params
 * @return {Function}
 */
export function tag(type, ...params) {
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

      // Tag the type.
      this[symbol] = type;

      const paramList = params.map(p => this[p]);
      this.toString = function toString() {
        return `${type}${!params.length ? '' : `(${paramList.map(x => x.toString()).join(', ')})`}`;
      };
    },
  };

  // Retrieve the constructor and send the temporary object to GC.
  const Adt = tmp[type];
  tmp = null;

  return Adt;
}

/**
 * Create a set of union types that all inherit from the returned
 * parent type. Adds a ".cata" method that acts as a switch between
 * the types. Instead of passing a type and a list of parameter names
 * like in "ADT.tag", an object is passed where the keys are the child
 * type names and the values are their associated parameter list.
 * If a type has no params (an empty array), an instance will be eagerly
 * created to act as a singleton.
 *
 * @since v1.0.0
 * @example
 * const Maybe = union('Maybe', {
 *   Just: ['value'],
 *   Nothing: [],
 * });
 *
 * Maybe.prototype.getOrElse = function getOrElse(defaultValue) {
 *   return this.cata({
 *     Just: value => value,
 *
 *     Nothing: () => defaultValue,
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
 * @param  {String} parentType
 * @param  {Object} childTypes
 * @return {Function}
 */
export function union(parentType, childTypes) {
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
