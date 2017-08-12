# Core

---

### Static

---

#### liftA2
`liftA2 :: Monad m => (a -> b -> c) -> m a -> m b -> m c`

Call a regular function with two arguments with the values contained in two separate monads of the same type. Returns a monad of the same type with the result.

```JavaScript
import { liftA2 } from 'zoomjs/core';
import { Just, Nothing } from 'zoomjs/maybe';

const add = (a, b) => a + b;

liftA2(add, Nothing, Nothing); // Nothing
liftA2(add, Just(1), Nothing); // Nothing
liftA2(add, Nothing, Just(1)); // Nothing

liftA2(add, Just(1), Just(1)); // Just(2)
```

---

#### liftA3
`liftA3 :: Monad m => (a -> b -> c -> d) -> m a -> m b -> m c -> m d`

Call a regular function with three arguments with the values contained in three separate monads of the same type. Returns a monad of the same type with the result.

```JavaScript
import { liftA3 } from 'zoomjs/core';
import { Just, Nothing } from 'zoomjs/maybe';

const add3 = (a, b, c) => a + b + c;

liftA3(add3, Nothing, Nothing, Nothing); // Nothing
liftA3(add3, Just(1), Nothing, Nothing); // Nothing
liftA3(add3, Nothing, Just(1), Nothing); // Nothing
liftA3(add3, Nothing, Nothing, Just(1)); // Nothing

liftA3(add3, Just(1), Just(1), Just(1)); // Just(3)
```

---

#### liftA4
`liftA4 :: Monad m => (a -> b -> c -> d -> e) -> m a -> m b -> m c -> m d -> m e`

Call a regular function with four arguments with the values contained in four separate monads of the same type. Returns a monad of the same type with the result.

```JavaScript
import { liftA4 } from 'zoomjs/core';
import { Just, Nothing } from 'zoomjs/maybe';

const add4 = (a, b, c, d) => a + b + c + d;

liftA4(add4, Nothing, Nothing, Nothing, Nothing); // Nothing
liftA4(add4, Just(1), Nothing, Nothing, Nothing); // Nothing
liftA4(add4, Nothing, Just(1), Nothing, Nothing); // Nothing
liftA4(add4, Nothing, Nothing, Just(1), Nothing); // Nothing
liftA4(add4, Nothing, Nothing, Nothing, Just(1)); // Nothing

liftA4(add4, Just(1), Just(1), Just(1), Just(1)); // Just(4)
```
