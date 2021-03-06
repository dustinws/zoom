# Maybe

```hs
type Maybe a = Just a | Nothing
```

---

#### Fantasy Land Implementations
`Applicative`, `Functor`, `Apply`, `Chain`, `Monad`

---
In Javascript, we ususally represent the absence of a value by using the
`null` primitive. `null` is troubled though, and can do much more harm than
good if used incorrectly. For some interesting history on what the creators
of `null` think about their invention, check out
[this stackoverflow thread](https://softwareengineering.stackexchange.com/questions/237697/if-null-is-bad-why-do-modern-languages-implement-it).

Languages like `haskell`, `elm`, and `scala` trade in the concept of null
for an abstract data type called `Maybe` <small>(Or `Option` for scala)</small>.

The `Maybe` type is very similar to the [null object pattern](https://en.wikipedia.org/wiki/Null_Object_pattern),
but in a much more generic way that isn't bound to any single type.

Using `Maybe` allows users to give up null checks entirely, and instead
be explicit about existence _on the type level_. `Maybe` is a union type
for the `Just` and `Nothing` constructors. `Just` is used to represent a
value that exists, while `Nothing` represents a value that does not. `Just`
and `Nothing` have the exact same api, the magic is in how each one is
implemented. When you send operations to `Just`, it'll run them on whatever
value it's holding. Since `Nothing` doesn't store a value, it'll ignore
the operations you send it.

If you're familiar with the `Promise` type, then you probably love how you
can call `.then` all day long and then handle your errors at the end in a
single `.catch` statement. `Maybe` works in the exact same way, except it
deals with null values instead of async operations.

### Usage

```JavaScript
// Some deeply nested api response where any key could be null.
const data = {
  location: {
    address: {
      streetNumber: '43',
    },
  },
};

// With regular null checking
function getStreetNumber(data, defaultValue) {
  if (data.location != null) {
    if (data.location.address != null) {
      if (data.location.address.streetNumber != null) {
        return data.location.address.streetNumber;
      }
      return defaultValue;
    }
    return defaultValue;
  }
  return defaultValue;
}

getStreetNumber(data, 'No Address'); // '43'
getStreetNumber({}, 'No Address') // 'No Address'



// With Maybe
import { Maybe } from 'zoomjs';

// A curried helper for null safe property lookups
const get = key => obj =>
  Maybe.fromNullable(obj[key]);

function getStreetNumber(data, defaultValue) {
  return Maybe.of(data)
    .andThen(get('location'))
    .andThen(get('address'))
    .andThen(get('streetNumber'))
    .withDefault(defaultValue);
}

getStreetNumber(data, 'No Address'); // '43'
getStreetNumber({}, 'No Address'); // 'No Address'
```

---

### Static

---

#### of
```hs
of :: a -> Maybe a
```

Lift a value into a successful 'Just' context.

```JavaScript
import { Maybe } from 'zoomjs';

const val = Maybe.of(1);

val.toString() // 'Just(1)'
```

---

#### Just.of
```hs
of :: a -> Maybe a
```

Lift a value into a successful 'Just' context.

```JavaScript
import { Just } from 'zoomjs/maybe';

const val = Just.of(1);

val.toString() // 'Just(1)'
```

---

#### Nothing.of
```hs
of :: a -> Maybe a
```

Return a reference to the `Nothing` singleton. This function only exists to maintain a consistent interface with `Just`.

```JavaScript
import { Nothing } from 'zoomjs/maybe';

const val = Nothing.of();

val.toString() // 'Nothing'
Nothing === Nothing.of(); // true
```

---

#### chain
```hs
chain :: (a -> Maybe b) -> Maybe a -> Maybe b
```

Apply a transformation to the Maybe if it is an instance of "Just". Otherwise, ignore the transformation and return the instance.
This is how you can switch from a 'Just' to 'Nothing' instance and stop subsequent transformations from being applied. An alias for `Maybe.andThen`

```Javascript
import { chain, Just, Nothing } from 'zoomjs/maybe';

const toUpper = x =>
  Just.of(x.toUpperCase());

chain(toUpper, Just.of('yay!')); // Just('YAY!')
chain(toUpper, Nothing); // Nothing
```

---

#### andThen
```hs
andThen :: (a -> Maybe b) -> Maybe a -> Maybe b
```

Apply a transformation to the Maybe if it is an instance of "Just". Otherwise, ignore the transformation and return the instance.
This is how you can switch from a 'Just' to 'Nothing' instance and stop subsequent transformations from being applied. An alias for `Maybe.chain`

```JavaScript
import { andThen, Just, Nothing } from 'zoomjs/maybe';

const toUpper = x =>
  Just.of(x.toUpperCase());

andThen(toUpper, Just.of('yay!')); // Just('YAY!')
andThen(toUpper, Nothing); // Nothing
```

#### map
```hs
map :: (a -> b) -> Maybe a -> Maybe b
```

Apply a transformation to the Maybe if it is an instance
of "Just". Otherwise, ignore the transformation and return the instance.

```JavaScript
import { map, Just, Nothing } from 'zoomjs/maybe';

const valid = Just.of('yay!');
const failure = Nothing;

const toUpper = x => x.toUpperCase();

map(toUpper, valid); // Just('YAY!')
map(toUpper, invalid); // Nothing
```

#### ap
```hs
ap :: Apply (a -> b) -> Maybe a -> Maybe b
```

Apply a transformation to the Maybe if it is an instance of "Just". Otherwise, ignore the transformation and return the instance.

```JavaScript
import { ap, Just, Nothing } from 'zoomjs/maybe';

const valid = Just.of('yay!');
const failure = Nothing;

const toUpper = Just.of(x => x.toUpperCase());

ap(toUpper, valid); // Just('YAY!')
ap(toUpper, invalid); // Nothing
```

---

#### isNothing
```hs
isNothing :: Maybe a -> Bool
```

Determine if an Maybe is an instance of Nothing

```JavaScript
import { Just, Nothing, isNothing } from 'zoomjs/maybe';

isNothing(Nothing); // true
isNothing(Just.of(1)); // false
```

---

#### isJust
```hs
isJust :: Maybe a -> Bool
```

Determine if an Maybe is an instance of Just

```JavaScript
import { Just, Nothing, isJust } from 'zoomjs/maybe';

isJust(Just.of(1)); // true
isJust(Nothing); // false
```

---

#### fromNullable
```hs
fromNullable :: a -> Maybe a
```

Create a maybe from a potentially null or undefined value.

```JavaScript
import { fromNullable } from 'zoomjs/maybe';

fromNullable(''); // Just('')
fromNullable(null); // Nothing
fromNullable(); // Nothing
```

---

#### withDefault
```hs
withDefault :: a -> Maybe a -> a
```

Extract the value from a Maybe, with a default value in
case it is `Nothing`.

```JavaScript
import { withDefault } from 'zoomjs/maybe';

withDefault('bar', Nothing); // 'bar'
withDefault('bar', Just('foo')); // 'foo'
```

---

#### toEither
```hs
toEither :: Maybe b -> Either a b
```

Convert a Maybe into an [Either](https://github.com/dustinws/zoom/blob/master/docs/Either.md).

```JavaScript
import { toEither, Nothing, Just } from 'zoomjs/maybe';


toEither(Nothing.of()); // Either.Left(null)
toEither(Just.of('Success!')); // Either.Right('Success!')
```

---

#### toResult
```hs
toResult :: Maybe b -> Result a b
```

Convert a Maybe into a [Result](https://github.com/dustinws/zoom/blob/master/docs/Result.md).

```JavaScript
import { toResult, Nothing, Just } from 'zoomjs/maybe';


toResult(Nothing.of()); // Result.Err(null)
toResult(Just.of('Success!')); // Result.Ok('Success!')
```

---

#### toValidation
```hs
toValidation :: Maybe b -> Validation a b
```

Convert a Maybe into a [Validation](https://github.com/dustinws/zoom/blob/master/docs/Validation.md).

```JavaScript
import { toValidation, Nothing, Just } from 'zoomjs/maybe';


toValidation(Nothing.of()); // Validation.Failure(null)
toValidation(Just.of('Success!')); // Validation.Success('Success!')
```

---

#### toTask
```hs
toTask :: Maybe b -> Task a b
```

Convert a Maybe into a [Task](https://github.com/dustinws/zoom/blob/master/docs/Task.md).

```JavaScript
import { toTask, Nothing, Just } from 'zoomjs/maybe';


toTask(Nothing.of()); // Task(null, null) [rejected]
toTask(Just.of('Success!')); // Task(null, 'Success!')
```

---

### Instance

---

#### cata
```hs
cata :: Maybe a ~> { Nothing: a -> b, Just: a -> b } -> b
```

A function that accepts an object with two functions, one to run if the either is an instance of `Just`, and one to run if the either is an instance of `Nothing`. The return value will be returned directly, with no wrapper instance. This name is short for `catamorphism`.

```JavaScript
import { Just } from 'zoomjs/maybe';

Just.of('foobar').cata({
  Just(foobar) {
    // Do stuff with foobar
  },

  Nothing() {
    // Do stuff
  },
});
```

---

#### caseOf
```hs
caseOf :: Maybe a ~> { Nothing: a -> b, Just: a -> b } -> b
```

A function that accepts an object with two functions, one to run if the either is an instance of `Just`, and one to run if the either is an instance of `Nothing`. The return value will be returned directly, with no wrapper instance. Alias for `Maybe#cata`.

```JavaScript
import { Just } from 'zoomjs/maybe';

Just.of('foobar').caseOf({
  Just(foobar) {
    // Do stuff with foobar
  },

  Nothing() {
    // Do stuff
  },
});
```

---

#### Just.of
```hs
of :: Maybe a ~> b -> Maybe b
```

Lift a value into a successful 'Just' context.

```JavaScript
import { Just } from 'zoomjs/maybe';

const val = Just.of(1);

val.toString() // 'Just(1)'
```

---

#### chain
```hs
chain :: Maybe a ~> (a -> Maybe b) -> Maybe b
```

Apply a transformation to the Maybe if it is an instance
of "Just". Otherwise, ignore the transformation and return the instance.
This is how you can switch from a 'Just' to 'Nothing' instance and stop subsequent transformations from being applied. An alias for `Maybe#andThen`

```JavaScript
import { Just, Nothing } from 'zoomjs/maybe';

const toUpper = x =>
  Just.of(x.toUpperCase());

Just.of('yay!').chain(toUpper); // Just('YAY!')
Nothing.chain(toUpper); // Nothing
```

---

#### andThen
```hs
andThen :: Maybe a ~> (a -> Maybe b) -> Maybe b
```

Apply a transformation to the Maybe if it is an instance
of "Just". Otherwise, ignore the transformation and return the instance.
This is how you can switch from a 'Just' to 'Nothing' instance and stop subsequent transformations from being applied. An alias for `Maybe#chain`

```JavaScript
import { Just, Nothing } from 'zoomjs/maybe';

const toUpper = x =>
  Just.of(x.toUpperCase());

Just.of('yay!').andThen(toUpper); // Just('YAY!')
Nothing.andThen(toUpper); // Nothing
```

---

#### map
```hs
map :: Maybe a ~> (a -> b) -> Maybe b
```

Apply a transformation to the Maybe if it is an instance of "Just". Otherwise, ignore the transformation and return the instance.
This is how you can switch from a 'Just' to 'Nothing' instance and stop subsequent transformations from being applied. An alias for `Maybe#chain`

```JavaScript
import { Just, Nothing } from 'zoomjs/maybe';

const toUpper = x =>
  x.toUpperCase();

Just.of('yay!').map(toUpper); // Just('YAY!')
Nothing.map(toUpper); // Nothing
```

---

#### ap
```hs
ap :: Maybe a ~> Apply (a -> b) -> Maybe b
```

Apply a transformation to the Maybe if it is an instance of "Just". Otherwise, ignore the transformation and return the instance.

```JavaScript
import { Just, Nothing } from 'zoomjs/maybe';

const toUpper = Just.of(x => x.toUpperCase());

Just.of('yay!').ap(toUpper); // Just('YAY!')
Nothing.ap(toUpper); // Nothing
```

---

#### isNothing
```hs
isNothing :: Maybe a ~> b -> Bool
```

Determine if an Maybe is an instance of Nothing

```JavaScript
import { Just, Nothing } from 'zoomjs/maybe';

Nothing.isNothing(); // true
Just.of().isNothing(); // false
```

---

#### isJust
```hs
isJust :: Maybe a ~> b -> Bool
```

Determine if an Maybe is an instance of Just

```JavaScript
import { Just, Nothing } from 'zoomjs/maybe';

Just.of().isNothing(); // true
Nothing.isNothing(); // false
```

---

#### withDefault
```hs
withDefault :: Maybe a ~> a -> a
```

Extract the value from a Maybe, with a default value in case it is `Nothing`.

```JavaScript
import { Just, Nothing } from 'zoomjs';

Nothing.withDefault('bar'); // 'bar'
Just('foo').withDefault('bar'); // 'foo'
```

---

#### toEither
```hs
toEither :: Maybe b ~> Either a b
```

Convert a Maybe into an [Either](https://github.com/dustinws/zoom/blob/master/docs/Either.md).

```JavaScript
import { Nothing, Just } from 'zoomjs/maybe';


Nothing.of().toEither(); // Either.Left(null)
Just.of('Success!').toEither(); // Either.Right('Success!')
```

---

#### toResult
```hs
toResult :: Maybe b ~> Result a b
```

Convert a Maybe into a [Result](https://github.com/dustinws/zoom/blob/master/docs/Result.md).

```JavaScript
import { Nothing, Just } from 'zoomjs/maybe';


Nothing.of().toResult(); // Result.Err(null)
Just.of('Success!').toResult(); // Result.Ok('Success!')
```

---

#### toValidation
```hs
toValidation :: Maybe b ~> Validation a b
```

Convert a Maybe into a [Validation](https://github.com/dustinws/zoom/blob/master/docs/Validation.md).

```JavaScript
import { Nothing, Just } from 'zoomjs/maybe';


Nothing.of().toValidation(); // Validation.Failure(null)
Just.of('Success!').toValidation(); // Validation.Success('Success!')
```

---

#### toTask
```hs
toTask :: Maybe b ~> Task a b
```

Convert a Maybe into a [Task](https://github.com/dustinws/zoom/blob/master/docs/Task.md).

```JavaScript
import { Nothing, Just } from 'zoomjs/maybe';


Nothing.of().toTask(); // Task(null, null) [rejected]
Just.of('Success!').toTask(); // Task(null, 'Success!')
```
