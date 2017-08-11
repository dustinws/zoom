# Reader

#### Fantasy Land Implementations
`Applicative`, `Functor`, `Apply`, `Chain`, `Monad`

A `Reader` is way to do dependency injection. This makes it a great tool
for testing, since it is easy to mock stateful operations.

---

### Static

---

#### of
`of :: a -> Reader e a`

Create a new reader that will return the given value.

```JavaScript
import { Reader } from 'zoomjs';

Reader.of('foo'); // Reader(null, foo)
```

---

#### chain
`chain :: (a -> Reader e b) -> Reader e a -> Reader e b`

Run multiple readers in sequence. The function given to `.chain` must return a `Reader`.

```JavaScript
import { Reader } from 'zoomjs';

// query :: String -> Reader Env [DbRow]
const query = sql =>
  Reader(env => env.db.query(sql));

Reader.chain(query, Reader.of('Select from "users";'));
// Reader(Env, [DbRow])
```

---

#### map
`map :: (a -> b) -> Reader e a -> Reader e b`

Apply a function to the value held by a `Reader`. Returns a new `Reader`.

```JavaScript
import { Reader } from 'zoomjs';

const reader = Reader.of('foo');

Reader.map(x => x.toUpperCase(), reader);
// => Reader(null, FOO)
```

---

#### ap
`ap :: Apply (a -> b) -> Reader e a -> Reader e b`

Apply a function to the value held by a `Reader`. Returns a new `Reader`.

```JavaScript
import { Reader } from 'zoomjs';

const reader = Reader.of('foo');
const toUpper = Reader.of(x => x.toUpperCase());

Reader.ap(toUpper, reader);
// => Reader(null, FOO)
```

---

### Instance

---

#### chain
`chain :: Reader e a ~> (a -> Reader e b) -> Reader e b`

Run multiple readers in sequence. The function given to `.chain` must return a `Reader`.

```JavaScript
import { Reader } from 'zoomjs';

// query :: String -> Reader Env [DbRow]
const query = sql =>
  Reader(env => env.db.query(sql));

Reader.of('Select from "users"').chain(query);
// Reader(Env, [DbRow])
```

---

#### map
`map :: Reader e a ~> (a -> b) -> Reader e b`

Apply a function to the value held by a `Reader`. Returns a new `Reader`.

```JavaScript
import { Reader } from 'zoomjs';

const reader = Reader.of('foo');

reader.map(x => x.toUpperCase());
// => Reader(null, FOO)
```

---

#### ap
`ap :: Reader e a ~> Apply (a -> b) -> Reader e b`

Apply a function to the value held by a `Reader`. Returns a new `Reader`.

```JavaScript
import { Reader } from 'zoomjs';

const reader = Reader.of('foo');
const toUpper = Reader.of(x => x.toUpperCase());

reader.ap(toUpper);
// => Reader(null, FOO)
```
