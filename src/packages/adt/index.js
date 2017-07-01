/**
 * The ADT namespace.
 *
 * @type {Object}
 */
const ADT = module.exports = {};

/**
 * The tag used to get an object's type.
 *
 * @type {Symbol}
 */
ADT.symbol = Symbol('ADT.tag');

/**
 * Create a tagged abstract data type.
 *
 * @param  {String} type
 * @param  {Any[]} ...params
 * @return {Function}
 */
ADT.tag = (type, ...params) => {
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
      this[ADT.symbol] = type;
    },
  };

  // Retrieve the constructor and send the temporary object to GC.
  const Adt = tmp[type];
  tmp = null;

  return Adt;
};

/**
 * Create a set of union types that all inherit from the returned
 * parent type.
 *
 * @param  {String} parentType
 * @param  {Object} childTypes
 * @return {Function}
 */
ADT.union = (parentType, childTypes) => {
  // Create the parent type.
  const Parent = ADT.tag(parentType);

  Object.keys(childTypes).forEach((childType) => {
    // Get any params defined for the child.
    const params = childTypes[childType];

    // Tag the child object.
    const Child = ADT.tag(childType, ...params);

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
};
