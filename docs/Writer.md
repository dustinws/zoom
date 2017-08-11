# Writer

#### Fantasy Land Implementations
`Applicative`, `Functor`, `Apply`, `Chain`, `Monad`

---

A `Writer` is way to attach metadata to function calls, such as
logging.

---

### Static

---

#### of
`of :: a -> Writer w a`

Create a new writer that will return the given value.

```JavaScript
import { Writer } from 'zoomjs';

Writer.of('foo'); // Writer(null, foo)
```

---

#### tell
`tell :: w -> Writer w a -> Writer w a`

Attach a new piece of metadata to a writer.

```JavaScript
import { Writer } from 'zoomjs';

Writer.tell('A log!', Writer.of('foo'));
// Writer(Tuple('foo', ['A log!']))
```

---

#### chain
`chain :: (a -> Writer w b) -> Writer w a -> Writer w b`

Run multiple writers in sequence. The function given to `.chain` must return a `Writer`.

```JavaScript
import { Tuple, Writer } from 'zoomjs';

// half :: Number -> Writer [String] Number
const half = n =>
  Writer(Tuple(n / 2, `I just halved ${n}.`));

Writer.chain(half, Writer.of(10));
// Writer(Tuple(5, ['I just halved 10.']))
```

---

#### map
`map :: (a -> b) -> Writer w a -> Writer w b`

Apply a function to the value held by a `Writer`. Returns a new `Writer`.

```JavaScript
import { Writer } from 'zoomjs';

const writer = Writer.of('foo');

Writer.map(x => x.toUpperCase(), writer);
// => Writer(Tuple('FOO', []))
```

---

#### ap
`ap :: Apply (a -> b) -> Writer w a -> Writer w b`

Apply a function in an `Apply` to the value held by a `Writer`. Returns a new `Writer`.

```JavaScript
import { Writer } from 'zoomjs';

const writer = Writer.of('foo');
const toUpper = x =>
  Writer(Tuple(x => x.toUpperCase(), `I just uppercased ${x}.`));

Writer.ap(toUpper, writer);
// => Writer(Tuple('FOO', ['I just uppercased foo.']))
```

---

### Instance

---

#### chain
`chain :: Writer w a ~> (a -> Writer w b) -> Writer w b`

Run multiple writers in sequence. The function given to `.chain` must return a `Writer`.

```JavaScript
import { Writer } from 'zoomjs';

// half :: Number -> Writer [String] Number
const half = n =>
  Writer(Tuple(n / 2, `I just halved ${n}.`));

Writer.of(10).chain(half);
// Writer(Tuple(5, ['I just halved 10.']))
```

---

#### tell
`tell :: Writer w a ~> w -> Writer w a`

Attach a new piece of metadata to a writer.

```JavaScript
import { Writer } from 'zoomjs';

Writer.of('foo').tell('A log!');
// Writer(Tuple('foo', ['A log!']))
```

---

#### map
`map :: Writer w a ~> (a -> b) -> Writer w b`

Apply a function to the value held by a `Writer`. Returns a new `Writer`.

```JavaScript
import { Writer } from 'zoomjs';

const writer = Writer.of('foo');

writer.map(x => x.toUpperCase());
// => Writer(Tuple('FOO', []))
```

---

#### ap
`ap :: Writer w a ~> Apply (a -> b) -> Writer w b`

Apply a function in an `Apply` to the value held by a `Writer`. Returns a new `Writer`.

```JavaScript
import { Writer } from 'zoomjs';

const writer = Writer.of('foo');
const toUpper = Writer.of(x => x.toUpperCase());

reaer.ap(toUpper);
// => Writer(Tuple('FOO', []))
```
