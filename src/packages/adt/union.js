import tag from './tag';

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
  const Parent = tag(parentType);

  Object.keys(childTypes).forEach((childType) => {
    // Get any params defined for the child.
    const params = childTypes[childType];

    // Tag the child object.
    const Child = tag(childType, ...params);

    // Inherit from the parent type.
    const ogProto = Child.prototype;
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;

    Object.assign(Child.prototype, ogProto);

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

export default union;
