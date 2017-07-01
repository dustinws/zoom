/**
 * The tag used to get an object's type.
 *
 * @type {Symbol}
 */
export const symbol = Symbol('ADT.tag');

/**
 * Create a tagged abstract data type.
 *
 * @param  {String} type
 * @param  {Any[]} ...params
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
 * parent type.
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
