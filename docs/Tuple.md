# Tuple

A `Tuple` is like a list with a fixed number of elements. In this
implementation, we limit the number of elements to two, making this
more akin to a `Pair` type.

---

`Tuple` supports the `Symbol.iterator` protocol, which means it supports
`for of` loops, `...spread`, and `[a, b] = Tuple(0, 0)` destructuring.
For more detailed usage, see `Tuple#Iterator`

---
#### Fantasy Land Implementations
`Setoid`, `Functor`

### Usage

```JavaScript
import { Tuple } from 'zoomjs';

// Create a Tuple instance
// user :: (Int, String)
const user = Tuple(1, 'Dustin');

user.toString(); // (1, 'Dustin')
```

---

### Static

---

#### fst
```hs
fst :: (a, b) -> a
```

Get the first element of a Tuple

```JavaScript
import { Tuple } from 'zoomjs';

Tuple.fst(Tuple(1, 'Jake')); // 1
```

---

#### snd
```hs
snd :: (a, b) -> b
```

Get the second element of a Tuple

```JavaScript
import { Tuple } from 'zoomjs';

Tuple.snd(Tuple(1, 'Jake')); // 'Jake'
```

---

#### equals
```hs
equals :: (a, b) -> (a, b) -> Bool
```

Determine if one tuple is the same as another. Both elements are checked with the `===` comparison operator.

```JavaScript
import { Tuple } from 'zoomjs';

const userA = Tuple('male', 'Dustin');
const userB = Tuple('male', 'Dustin');
const userC = Tuple('male', 'Jimmy');

Tuple.equals(userA, userB);
// => true

Tuple.equals(userA, userC);
// => false

Tuple.equals(userB, userC);
// => false
```

---

#### map
```hs
map :: (b -> c) -> (a, b) -> (a, c)
```

Apply a function to the second element of a tuple and return a new, modified tuple.

```JavaScript
import { Tuple } from 'zoomjs';

// toUpper :: String -> String
const toUpper = x => x.toUpperCase();

Tuple.map(toUpper, Tuple(1, 'jake'));
// => (1, 'JAKE')
```

---

#### mapLeft
```hs
mapLeft :: (a -> c) -> (a, b) -> (c, b)
```

Apply a function to the first element of a tuple and return a new, modified tuple.

```JavaScript
import { Tuple } from 'zoomjs';

const user = Tuple(1, 'Jake');

Tuple.mapLeft(n => n + 1, user); // (2, 'Jake')
```

---

### Instance

---

#### fst
```hs
fst :: (a, b) ~> c -> a
```

Get the first element of a Tuple. Instance version of "Tuple.fst"

```JavaScript
import { Tuple } from 'zoomjs';

Tuple(1, 'Jake').fst(); // 1
```

---

#### snd
```hs
snd :: (a, b) ~> c -> b
```

Get the second element of a Tuple. Instance version of "Tuple.snd"

```JavaScript
import { Tuple } from 'zoomjs';

Tuple(1, 'Jake').snd(); // 'Jake'
```

---

#### equals
```hs
equals :: (a, b) ~> (a, b) -> Bool
```

Determine if one tuple is the same as another. Both elements are checked with the `===` comparison operator.

```JavaScript
import { Tuple } from 'zoomjs';

const userA = Tuple('male', 'Dustin');
const userB = Tuple('male', 'Dustin');
const userC = Tuple('male', 'Jimmy');

userA.equals(userB);
// => true

userA.equals(userC);
// => false

userB.equals(userC);
// => false
```

---

#### map
```hs
map :: (a, b) ~> (b -> c) -> (a, c)
```

Apply a function to the second element of a tuple and return a new, modified tuple. Instance version of "Tuple.map"

```JavaScript
import { Tuple } from 'zoomjs';

const user = Tuple(1, 'Jake');

user.map(x => x.toUpperCase()).toString() // (1, 'JAKE')
```

---

#### mapLeft
```hs
mapLeft :: (a, b) ~> (a -> c) -> (c, b)
```

Apply a function to the first element of a tuple and return a new, modified tuple. Instance version of `Tuple.mapLeft`

```JavaScript
import { Tuple } from 'zoomjs';

const user = Tuple(1, 'Jake');

user.mapLeft(n => n + 1).toString(); // (2, 'Jake')
```

---

#### Tuple#Iterator

Support the `Symbol.iterator` protocol.

```JavaScript
import { Tuple } from 'zoomjs';

// user :: (Int, String)
const user = Tuple(1, 'Janet');

// For-of loops
for (let element of user) {
  console.log(element);
}

// 1
// 'Janet'


// Spread Operator
// saveUser :: Int -> String -> DbResult
function saveUser(id, username) {
  return Db.save(id, username);
}

saveUser(...user);


// Destructuring
const [id, username] = user;

// saveUserT :: (Int, String) -> DbResult
function saveUserT([id, username]) {
  return Db.save(id, username);
}

saveUserT(user);
```
