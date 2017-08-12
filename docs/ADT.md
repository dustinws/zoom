# ADT

Helpers for creating abstract data types.


### Static

---

#### symbol
```hs
symbol :: Symbol
```

The identifier used to get an object's type.

```JavaScript
import { symbol } from 'zoomjs/adt';

const obj = {
  [symbol]: 'MyType',
};
```

---

#### tag
`tag(string, ...params)`

Create a tagged abstract data type. Tags the object with the "ADT.symbol" value, and creates a "toString" method.

```JavaScript
import { tag, symbol } from 'zoomjs/adt';

const Point2D = tag('Point2D', 'x', 'y');

const point = Point2D(10, 15);

point.x // 10
point.y // 15

point instanceof Point2D // true
point[symbol] // 'Point2D'
point.toString() // 'Point2D(0, 0)'
```

---

#### union
`union(string, object)`

Create a set of union types that all inherit from the returned parent type. Adds a ".cata" method that acts as a switch between the types. Instead of passing a type and a list of parameter names like in "ADT.tag", an object is passed where the keys are the child type names and the values are their associated parameter list. If a type has no params (an empty array), an instance will be eagerly created to act as a singleton.

```JavaScript
import { union } from 'zoomjs/adt';

const Maybe = union('Maybe', {
  Just: ['value'],
  Nothing: [],
});

Maybe.prototype.getOrElse = function withDefault(defaultValue) {
  return this.cata({
    Just(value) {
      return value;
    },

    Nothing() {
      return defaultValue;
    },
  });
};

const justFoo = Maybe.Just('foo');
const nothing = Maybe.Nothing;

justFoo instanceof Maybe // true
justFoo instanceof Maybe.Just // true

nothing instanceof Maybe // true

justFoo.withDefault('bar'); // 'foo'
nothing.withDefault('bar'); // 'bar'
```
