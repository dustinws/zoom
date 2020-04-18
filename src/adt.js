// symbol :: Symbol
const symbol = Symbol('ADT.tag');


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
  Adt[symbol] = type;

  Adt.prototype.toString = function toString() {
    const paramsList = params
      .map(param => this[param])
      .join(', ')
      .trim();

    const paramDisplay = params.length ? `(${paramsList})` : '';
    return `${this[symbol]}${paramDisplay}`;
  };

  return Adt;
}

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


module.exports = {
  symbol,
  tag,
  union,
};
