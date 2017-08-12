# RemoteData

`RemoteData` represents a data request to a remote source. This works especially well for frontend applications that need to make api requests.

```hs
type RemoteData e a = NotAsked
                    | Loading
                    | Failure e
                    | Success a
```

---

#### Fantasy Land Implementations
`Semigroup`, `Applicative`, `Functor`, `Apply`, `Chain`, `Monad`

---

### Static

---

#### of
```hs
of :: a -> RemoteData e a
```

Create a new `RemoteData` instance. By default, this returns an instance of `Success`.

```JavaScript
import { RemoteData } from 'zoomjs';

RemoteData.of('Hello!');
// Success('Hello!')
```

---

#### NotAsked.of
```hs
of :: a -> RemoteData e a
```

Get a reference to the `NotAsked` singleton. Defined for api consistency.

```JavaScript
import { NotAsked } from 'zoomjs/remote-data';

NotAsked.of();
// NotAsked
```

---

#### Loading.of
```hs
of :: a -> RemoteData e a
```

Get a reference to the `Loading` singleton. Defined for api consistency.

```JavaScript
import { Loading } from 'zoomjs/remote-data';

Loading.of();
// Loading
```

---

#### Failure.of
```hs
of :: e -> RemoteData e a
```

Create a new `Failure` instance.

```JavaScript
import { Failure } from 'zoomjs/remote-data';

Failure.of('error!');
// Failure('error!')
```

---

#### Success.of
```hs
of :: a -> RemoteData e a
```

Create a new `Success` instance.

```JavaScript
import { Success } from 'zoomjs/remote-data';

Success.of('Hello!');
// Success('Hello!')
```

---

#### chain
```hs
chain :: (a -> RemoteData e b) -> RemoteData e a -> RemoteData e b
```

Call a function that returns a `RemoteData` instance with the value stored in another `RemoteData`. The function will only be called if the last argument is a `Success`.

```JavaScript
import {
  chain,
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

const liftedDouble = (a) =>
  Success(a + a);

chain(liftedDouble, NotAsked);
// NotAsked

chain(liftedDouble, Loading);
// Loading

chain(liftedDouble, Failure(10));
// Failure(10)

chain(liftedDouble, Success(10));
// Success(20)
```

---

#### andThen
```hs
andThen :: (a -> RemoteData e b) -> RemoteData e a -> RemoteData e b
```

Call a function that returns a `RemoteData` instance with the value stored in another `RemoteData`. The function will only be called if the last argument is a `Success`. Alias for `RemoteData.chain`.

```JavaScript
import {
  andThen,
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

const liftedDouble = (a) =>
  Success(a + a);

andThen(liftedDouble, NotAsked);
// NotAsked

andThen(liftedDouble, Loading);
// Loading

andThen(liftedDouble, Failure(10));
// Failure(10)

andThen(liftedDouble, Success(10));
// Success(20)
```

---

#### map
```hs
map :: (a -> b) -> RemoteData e a -> RemoteData e b
```

Apply a regular function to the value stored in a `RemoteData`. The function will only be called for `Success` instances.

```JavaScript
import {
  map,
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

const double = (a) => a + a;

map(double, NotAsked);
// NotAsked

map(double, Loading);
// Loading

map(double, Failure(10));
// Failure(10)

map(double, Success(10));
// Success(20)
```

---

#### ap
```hs
ap :: Apply (a -> b) -> RemoteData e a -> RemoteData e b
```

Apply a regular function stored in an `Apply` to the value stored in a `RemoteData`. The function will only be called for `Success` instances.

```JavaScript
import {
  ap,
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

const double = (a) => a + a;

ap(Success(double), NotAsked);
// NotAsked

ap(Success(double), Loading);
// Loading

ap(Success(double), Failure(10));
// Failure(10)

ap(Success(double), Success(10));
// Success(20)
```

---

#### concat
```hs
concat :: RemoteData e a -> RemoteData e a -> RemoteData e a
```

Combine two `RemoteData` instances into one. The priority runs in this order -

- If either value is `NotAsked`, then `NotAsked` will be returned
- If either value is `Loading`, then `Loading` will be returned
- If either value is `Failure`, then `Failure` will be returned
- If both values are `Failure`, then  the left `Failure` will be returned
- If both values are `Success`, their values will be combined with the `concat` method.

This requires the value stored in the `Success` instances to implement `concat`.

```JavaScript
import {
  concat,
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

concat(NotAsked, Success('success!'));
// NotAsked

concat(Loading, Success('success!'));
// Loading

concat(Failure('error!'), Success('success!'));
// Failure('error')

concat(Success('woo! '), Success('success!'));
// Success('woo! success!')
```

---

#### isNotAsked
`isNotAsked :: RemoteData e a -> Bool`

Determine if a `RemoteData` instance is `NotAsked`.

```JavaScript
import {
  isNotAsked,
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

isNotAsked(NotAsked); // true
isNotAsked(Loading); // false
isNotAsked(Failure(10)); // false
isNotAsked(Success(10)); // false
```

---

#### isLoading
`isLoading :: RemoteData e a -> Bool`

Determine if a `RemoteData` instance is `Loading`.

```JavaScript
import {
  isLoading,
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

isLoading(NotAsked); // false
isLoading(Loading); // true
isLoading(Failure(10)); // false
isLoading(Success(10)); // false
```

---

#### isFailure
`isFailure :: RemoteData e a -> Bool`

Determine if a `RemoteData` instance is an instance of `Failure`.

```JavaScript
import {
  isFailure,
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

isFailure(NotAsked); // false
isFailure(Loading); // false
isFailure(Failure(10)); // true
isFailure(Success(10)); // false
```

---

#### isSuccess
`isSuccess :: RemoteData e a -> Bool`

Determine if a `RemoteData` instance is an instance of `Success`.

```JavaScript
import {
  isSuccess,
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

isSuccess(NotAsked); // false
isSuccess(Loading); // false
isSuccess(Failure(10)); // false
isSuccess(Success(10)); // true
```

---

### Instance

---

#### Failure#of
```hs
of :: RemoteData e b ~> f -> RemoteData f c
```

Create a new `Failure` instance. Instance version of `Failure.of`.

```JavaScript
import { Failure } from 'zoomjs/remote-data';

Failure().of('error!');
// Failure('error!')
```

---

#### Success#of
```hs
of :: RemoteData e a ~> b -> RemoteData f b
```

Create a new `Success` instance. Instance version of `Success.of`.

```JavaScript
import { Success } from 'zoomjs/remote-data';

Success().of('error!');
// Success('error!')
```

---

#### chain
```hs
chain :: RemoteData e a ~> (a -> RemoteData e b) -> RemoteData e b
```

Call a function that returns a `RemoteData` instance with the value stored in another `RemoteData`. The function will only be called if the last argument is a `Success`.

```JavaScript
import {
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

const liftedDouble = (a) =>
  Success(a + a);

NotAsked.chain(liftedDouble);
// NotAsked

Loading.chain(liftedDouble);
// Loading

Failure(10).chain(liftedDouble);
// Failure(10)

Success(10).chain(liftedDouble);
// Success(20)
```

---

#### andThen
```hs
andThen :: RemoteData e a ~> (a -> RemoteData e b) -> RemoteData e b
```

Call a function that returns a `RemoteData` instance with the value stored in another `RemoteData`. The function will only be called if the last argument is a `Success`. Alias for `RemoteData#chain`.

```JavaScript
import {
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

const liftedDouble = (a) =>
  Success(a + a);

NotAsked.andThen(liftedDouble);
// NotAsked

Loading.andThen(liftedDouble);
// Loading

Failure(10).andThen(liftedDouble);
// Failure(10)

Success(10).andThen(liftedDouble);
// Success(20)
```

---

#### map
```hs
map :: RemoteData e a ~> (a -> b) -> RemoteData e b
```

Apply a regular function to the value stored in a `RemoteData`. The function will only be called for `Success` instances.

```JavaScript
import {
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

const double = (a) => a + a;

NotAsked.map(double);
// NotAsked

Loading.map(double);
// Loading

Failure(10).map(double);
// Failure(10)

Success(10).map(double);
// Success(20)
```

---

#### ap
```hs
ap :: RemoteData e a ~> Apply (a -> b) -> RemoteData e b
```

Apply a regular function stored in an `Apply` to the value stored in a `RemoteData`. The function will only be called for `Success` instances.

```JavaScript
import {
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

const double = (a) => a + a;

NotAsked.ap(Success(double));
// NotAsked

Loading.ap(Success(double));
// Loading

Failure(10).ap(Success(double));
// Failure(10)

Success(10).ap(Success(double));
// Success(20)
```

---

#### concat
```hs
concat :: RemoteData e a ~> RemoteData e a -> RemoteData e a
```

Combine two `RemoteData` instances into one. The priority runs in this order -

- If either value is `NotAsked`, then `NotAsked` will be returned
- If either value is `Loading`, then `Loading` will be returned
- If either value is `Failure`, then `Failure` will be returned
- If both values are `Failure`, then  the left `Failure` will be returned
- If both values are `Success`, their values will be combined with the `concat` method.

This requires the value stored in the `Success` instances to implement `concat`.

```JavaScript
import {
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

NotAsked.concat(Success('success!'));
// NotAsked

Loading.concat(Success('success!'));
// Loading

Failure('error!').concat(Success('success!'));
// Failure('error')

Success('woo! ').concat(Success('success!'));
// Success('woo! success!')
```

---

#### isNotAsked
`isNotAsked :: RemoteData e a ~> b -> Bool`

Determine if a `RemoteData` instance is `NotAsked`.

```JavaScript
import {
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

NotAsked.isNotAsked(); // true
Loading.isNotAsked(); // false
Failure(10).isNotAsked(); // false
Success(10).isNotAsked(); // false
```

---

#### isLoading
`isLoading :: RemoteData e a ~> b -> Bool`

Determine if a `RemoteData` instance is `Loading`.

```JavaScript
import {
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

NotAsked.isLoading(); // false
Loading.isLoading(); // true
Failure(10).isLoading(); // false
Success(10).isLoading(); // false
```

---

#### isFailure
`isFailure :: RemoteData e a ~> b -> Bool`

Determine if a `RemoteData` instance is an instance of `Failure`.

```JavaScript
import {
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

NotAsked.isFailure(); // false
Loading.isFailure(); // false
Failure(10).isFailure(); // true
Success(10).isFailure(); // false
```

---

#### isSuccess
`isSuccess :: RemoteData e a ~> b -> Bool`

Determine if a `RemoteData` instance is an instance of `Success`.

```JavaScript
import {
  NotAsked,
  Loading,
  Failure,
  Success,
} from 'zoomjs/remote-data';

NotAsked.isSuccess(); // false
Loading.isSuccess(); // false
Failure(10).isSuccess(); // false
Success(10).isSuccess(); // true
```
