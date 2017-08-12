# IO

#### Fantasy Land Implementations
`Applicative`, `Functor`, `Apply`, `Chain`, `Monad`

---
`IO` is a way to run computations that cause external effects, such
as a database write.

---

### Static

---

#### of
```hs
of :: a -> IO a
```

Create a new io that will return the given value.

```JavaScript
import IO from 'zoomjs/io';

IO.of('foo');
// IO(foo)
```

---

#### chain
```hs
chain :: (a -> IO b) -> IO a -> IO b
```

Run multiple IOs in sequence. The function given to `.chain` must return a new `IO`.

```JavaScript
import fs from 'fs';
import { IO } from 'zoomjs';

// readFile :: String -> IO String
const readFile = file =>
  IO(() => fs.readFileSync(file, 'utf8'));

// log :: String -> IO String
const log = message =>
  IO(() => {
    console.log(message);
    return message;
  });

IO.chain(log, readFile('package.json'));
// IO('{ "name": "zoomjs", ... }')
```

---

#### map
```hs
map :: (a -> b) -> IO a -> IO b
```

Apply a function to the value held by a `IO`. Returns a new `IO`.

```JavaScript
import { IO } from 'zoomjs';

const toUpper = string =>
  string.toUpperCase();

IO.map(toUpper, IO.of('foo'));
// => IO('FOO')
```

---

#### ap
```hs
ap :: Apply (a -> b) -> IO a -> IO b
```

Apply a function contained in an `Apply` to the value held by a `IO`. Returns a new `IO`.

```JavaScript
import { IO } from 'zoomjs';

const toUpper = string =>
  string.toUpperCase();

IO.ap(IO.of(toUpper), IO.of('foo'));
// => IO('FOO')
```

---

### Instance

---

#### chain
```hs
chain :: IO a ~> (a -> IO b) -> IO b
```

Run multiple IOs in sequence. The function given to `.chain` must return a new `IO`.

```JavaScript
import fs from 'fs';
import { IO } from 'zoomjs';

// readFile :: String -> IO String
const readFile = file =>
  IO(() => fs.readFileSync(file, 'utf8'));

// log :: String -> IO String
const log = message =>
  IO(() => {
    console.log(message);
    return message;
  });

readFile('package.json').chain(log);
// IO('{ "name": "zoomjs", ... }')
```

---

#### map
```hs
map :: IO a ~> (a -> b) -> IO b
```

Apply a function to the value held by a `IO`. Returns a new `IO`.

```JavaScript
import { IO } from 'zoomjs';

const toUpper = string =>
  string.toUpperCase();

IO.of('foo').map(toUpper);
// => IO('FOO')
```

---

#### ap
```hs
ap :: IO a ~> Apply (a -> b) -> IO b
```

Apply a function contained in an `Apply` to the value held by a `IO`. Returns a new `IO`.

```JavaScript
import { IO } from 'zoomjs';

const toUpper = string =>
  string.toUpperCase();

IO.of('foo').ap(IO.of(toUpper));
// => IO('FOO')
```
