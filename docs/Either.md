# Either

`Either` is an abstraction around error handling that allows the user to return their errors instead of throw them. `Either` is a super class with two constructors, `Left` and `Right`. The `Right` constructor represents a successful operation, and the `Left` constructor represents an unsuccessful operation with an embedded error message. You can chain functions that return `Either` instances by using `.chain` or `.andThen`.

```hs
type Either a b = Left a | Right b
```

---

#### Fantasy Land Implementations
`Applicative`, `Functor`, `Apply`, `Chain`, `Monad`

---

```JavaScript
import { Either } from 'zoomjs';

// Expose the constructors
const { Left, Right } = Either;

// `Either.try` is a convenience function that wraps functions
// that can potentially throw in an Either.
const parseJson = Either.try(JSON.parse);

// Ensure a user is an admin before going any further
const enforeAdminAccess = (user) => {
  if (!user.admin) {
    return Left('Must be an admin to continue');
  }

  return Right(user);
};

parseJson('{ "admin": false }')
  .andThen(enforceAdminAccess)
  .cata({
    Right(adminUser) {
      // Do something with the admin
    },

    Left(error) {
      // Handle the error
    },
  });
```

---

### Static

---

#### of
```hs
of :: b -> Either a b
```

Lift a value into a successful 'Right' context.

```JavaScript
import Either from 'zoomjs/either';

Either.of(1).toString();
// => 'Right(1)'
```

---

#### Right.of
```hs
of :: b -> Either a b
```

Lift a value into a successful 'Right' context.

```JavaScript
import { Right } from 'zoomjs/either';

Right.of(1).toString();
// => 'Right(1)'
```

---

#### Left.of
```hs
of :: a -> Either a b
```

Lift a value into an unsuccessful 'Left' context.

```JavaScript
import { Left } from 'zoomjs/either';

Left.of(1).toString();
// => 'Left(1)'
```

---

#### chain
```hs
chain :: (b -> Either a c) -> Either a b -> Either a c
```

Apply a transformation to the Either if it is an instance of "Right". Otherwise, ignore the transformation and return the instance. This is how you can switch from a 'Right' to 'Left' instance and stop subsequent transformations from being applied. An alias for `Either.andThen`.

```JavaScript
import { chain, Left, Right } from 'zoomjs/either';

// toUpper :: String -> Either String String
const toUpper = x =>
  typeof x !== 'string'
    ? Left.of('toUpper() recieved a non string.')
    : Right.of(x.toUpperCase());

// A "Right" will apply the next operation
chain(toUpper, Right.of('boom'));
// => Right(BOOM)

// A "Left" will ignore the next operation
chain(toUpper, Left.of('yea right'));
// => Left(yea right)
```

---

#### andThen
```hs
andThen :: (b -> Either a c) -> Either a b -> Either a c
```

Apply a transformation to the Either if it is an instance of "Right". Otherwise, ignore the transformation and return the instance. This is how you can switch from a 'Right' to 'Left' instance and stop subsequent transformations from being applied. An alias for `Either.chain`.

```JavaScript
import { andThen, Left, Right } from 'zoomjs/either';

// toUpper :: String -> Either String String
const toUpper = x =>
  typeof x !== 'string'
    ? Left.of('toUpper() recieved a non string.')
    : Right.of(x.toUpperCase());

// A "Right" will apply the next operation
andThen(toUpper, Right.of('boom'));
// => Right(BOOM)

// A "Left" will ignore the next operation
andThen(toUpper, Left.of('yea right'));
// => Left(yea right)
```

---

#### map
```hs
map :: (b -> c) -> Either a b -> Either a c
```

`map` is very similar to `Either.andThen` and `Either.chain` in that it only runs the function if the either is an instance of `Just`. The main difference is that `Either.andThen` and `Either.chain` expect the functions you give them to return new `Either` instances, and map let's you use plain old functions.

```JavaScript
import { map, Left, Right } from 'zoomjs/either';

// toUpper :: String -> String
const toUpper = x => x.toUpperCase();

// A "Right" will run the next operation
map(toUpper, Right.of('yay'));
// => Right('YAY!');

// A "Left" will ignore the next operation
map(toUpper, Left.of('nay!'));
// => Left('nay!');
```

---

#### ap
```hs
ap :: Apply (b -> c) -> Either a b -> Either a c
```

`ap` is just like `map`, allowing a user to use plain old functions to transform values hidden away in `Either`s. The only difference is that instead of giving it the function, you give it an `Either` of the function. This is known as the `Apply` type in fantasy land JS.

```JavaScript
import { ap, Left, Right } from 'zoomjs/either';

// toUpperE :: Either a (String -> String)
const toUpperE = Right(x => x.toUpperCase());

// A "Right" will apply the next operation
ap(toUpperE, Right.of('boom'));
// => Right(BOOM)

// A "Left" will ignore the next operation
ap(toUpperE, Left.of('yea right'));
// => Left(yea right)
```

---

#### isLeft
```hs
isLeft :: Either a b -> Bool
```

Determine if an Either is an instance of Left.

```JavaScript
import { isLeft, Left, Right } from 'zoomjs/either';

isLeft(Left.of());
// => true

isLeft(Right.of());
// => false
```

---

#### isRight
```hs
isRight :: Either a b -> Bool
```

Determine if an Either is an instance of Right.

```JavaScript
import { isRight, Left, Right } from 'zoomjs/either';

isRight(Right.of());
// => true

isRight(Left.of());
// => false
```

---

#### toMaybe
```hs
toMaybe :: Either a b -> Maybe b
```

Convert an Either into a [Maybe](https://github.com/dustinws/zoom/blob/master/docs/Maybe.md).

```JavaScript
import { toMaybe, Left, Right } from 'zoomjs/either';


toMaybe(Left('ouch!')); // Maybe.Nothing
toMaybe(Right('Success!')); // Maybe.Just('Success!')
```

---

#### toResult
```hs
toResult :: Either a b -> Result a b
```

Convert an Either into a [Result](https://github.com/dustinws/zoom/blob/master/docs/Result.md).

```JavaScript
import { toResult, Left, Right } from 'zoomjs/either';


toResult(Left('ouch!')); // Result.Err('ouch!')
toResult(Right('Success!')); // Result.Ok('Success!')
```

---

#### toValidation
```hs
toValidation :: Either a b -> Validation a b
```

Convert an Either into a [Validation](https://github.com/dustinws/zoom/blob/master/docs/Validation.md).

```JavaScript
import { toValidation, Left, Right } from 'zoomjs/either';


toValidation(Left('ouch!')); // Validation.Failure('ouch!')
toValidation(Right('Success!')); // Validation.Success('Success!')
```

---

#### toTask
```hs
toTask :: Either a b -> Task a b
```

Convert an Either into a [Task](https://github.com/dustinws/zoom/blob/master/docs/Task.md).

```JavaScript
import { toTask, Left, Right } from 'zoomjs/either';


toTask(Left('ouch!')); // Task('ouch!', null)
toTask(Right('Success!')); // Task(null, 'Success!')
```

---

#### try

Wraps a function in a try / catch block. If the function is successful, a `Right` will be returned with the result. Otherwise, a `Left` will be returned with the error.

```JavaScript
import { Either } from 'zoomjs';

const parseJson = Either.try(JSON.parse);

parseJson('...'); // Left(SyntaxError)
parseJson('{ "a": 1 }'); // Right({ a: 1 })
```

---

### Instance

---

#### cata
```hs
cata :: Either a b ~> { Left: a -> c, Right: b -> c } -> c
```

A function that accepts an object with two functions, one to run if the either is an instance of `Right`, and one to run if the either is an instance of `Left`. The return value will be returned directly, with no wrapper instance. This name is short for `catamorphism`. An alias for `Either#caseOf`

```JavaScript
import { Right } from 'zoomjs/either';

Right.of(1).cata({
  Right(one) {
    // Do something with one
  },

  Left(error) {
    // Handle the error
  },
});
```

---

#### caseOf
```hs
caseOf :: Either a b ~> { Left: a -> c, Right: b -> c } -> c
```

A function that accepts an object with two functions, one to run if the either is an instance of `Right`, and one to run if the either is an instance of `Left`. The return value will be returned directly, with no wrapper instance. An alias for An alias for `Either#cata`

```JavaScript
import { Right } from 'zoomjs';

Right.of(1).caseOf({
  Right(one) {
    // Do something with one
  },

  Left(error) {
    // Handle the error
  },
});
```

---

#### Right#of
```hs
of :: Either a b ~> c -> Either d c
```

Lift a value into a successful 'Right' context.

```JavaScript
// of Either a b :: c -> Either d c
import { Right } from 'zoomjs/either';

Right.of(1);
// => Right(1)
```

---

#### Left#of
```hs
of :: Either a b ~> c -> Either d c
```

Lift a value into a unsuccessful 'Left' context.

```JavaScript
// of Either a b :: d -> Either d c
import { Left } from 'zoomjs/either';

Left.of(1);
// => Left(1)
```

---

#### chain
```hs
chain :: Either a b ~> (b -> Either a c) -> Either a c
```

Apply a transformation to the Either if it is an instance of "Right". Otherwise, ignore the transformation and return the instance. This is how you can switch from a 'Right' to 'Left' instance and stop subsequent transformations from being applied. An alias for `Either#andThen`

```JavaScript
import { Left, Right } from 'zoomjs/either';

// toUpper :: String -> Either String String
const toUpper = x =>
  typeof x !== 'string'
    ? Left.of('toUpper() recieved a non string.')
    : Right.of(x.toUpperCase());

// A "Right" will apply the next operation
Right.of('boom').chain(toUpper);
// => Right(BOOM)

// A "Left" will ignore the next operation
Left.of('yea right').chain(toUpper);
// => Left(yea right)
```

---

#### andThen
```hs
andThen :: Either a b ~> (b -> Either a c) -> Either a c
```

Apply a transformation to the Either if it is an instance of "Right". Otherwise, ignore the transformation and return the instance. This is how you can switch from a 'Right' to 'Left' instance and stop subsequent transformations from being applied. An alias for `Either#chain`

```JavaScript
import { Left, Right } from 'zoomjs/either';

// toUpper :: String -> Either String String
const toUpper = x =>
  typeof x !== 'string'
    ? Left.of('toUpper() recieved a non string.')
    : Right.of(x.toUpperCase());

// A "Right" will apply the next operation
Right.of('boom').andThen(toUpper);
// => Right(BOOM)

// A "Left" will ignore the next operation
Left.of('yea right').andThen(toUpper);
// => Left(yea right)
```

---

#### map
```hs
map :: Either a b ~> (b -> c) -> Either a c
```

`map` is very similar to `Either.andThen` and `Either.chain` in that it only runs the function if the either is an instance of `Just`. The main difference is that `Either.andThen` and `Either.chain` expect the functions you give them to return new `Either` instances, and map let's you use plain old functions.

```JavaScript
import { Left, Right } from 'zoomjs/either';

// toUpper :: String -> String
const toUpper = x => x.toUpperCase();

// A "Right" will run the next operation
Right.of('yay').map(toUpper);
// => Right('YAY!');

// A "Left" will ignore the next operation
Left.of('nay!').map(toUpper);
// => Left('nay!');
```

---

#### ap
```hs
ap :: Either a b ~> Apply (b -> c) -> Either a c
```

`ap` is just like `map`, allowing a user to use plain old functions to transform values hidden away in `Either`s. The only difference is that instead of giving it the function, you give it an `Either` of the function. This is known as the `Apply` type in fantasy land JS.

```JavaScript
import { ap, Left, Right } from 'zoomjs';

// toUpperE :: Either a (String -> String)
const toUpperE = Right(x => x.toUpperCase());

// A "Right" will apply the next operation
Right.of('boom').ap(toUpperE);
// => Right(BOOM)

// A "Left" will ignore the next operation
Left.of('yea right').ap(toUpperE);
// => Left(yea right)
```

---

### isLeft
```hs
isLeft :: Either a b ~> c -> Bool
```

Determine if an Either is an instance of Left

```JavaScript
import { Left, Right } from 'zoomjs/either';

Left.of(1).isLeft(); // true
Right.of(1).isLeft(); // false
```

---

### isRight
```hs
isRight :: Either a b ~> c -> Bool
```

Determine if an Either is an instance of Right

```JavaScript
import { Left, Right } from 'zoomjs/either';

Right.of(1).isRight(); // true
Left.of(1).isRight(); // false
```

---

#### toMaybe
```hs
toMaybe :: Either a b ~> Maybe b
```

Convert an Either into a [Maybe](https://github.com/dustinws/zoom/blob/master/docs/Maybe.md).

```JavaScript
import { Left, Right } from 'zoomjs/either';


Left.of('ouch!').toMaybe(); // Maybe.Nothing
Right.of('Success!').toMaybe(); // Maybe.Just('Success!')
```

---

#### toResult
```hs
toResult :: Either a b ~> Result a b
```

Convert an Either into a [Result](https://github.com/dustinws/zoom/blob/master/docs/Result.md).

```JavaScript
import { Left, Right } from 'zoomjs/either';


Left.of('ouch!').toResult(); // Result.Err('ouch!')
Right.of('Success!').toResult(); // Result.Ok('Success!')
```

---

#### toTask
```hs
toTask :: Either a b ~> Task a b
```

Convert an Either into a [Task](https://github.com/dustinws/zoom/blob/master/docs/Task.md).

```JavaScript
import { Left, Right } from 'zoomjs/either';


Left.of('ouch!').toTask(); // Task('ouch!', null)
Right.of('Success!').toTask(); // Task(null, 'Success!')
```

---

#### toValidation
```hs
toValidation :: Either a b ~> Validation a b
```

Convert an Either into a [Validation](https://github.com/dustinws/zoom/blob/master/docs/Validation.md).

```JavaScript
import { Left, Right } from 'zoomjs/either';


Left.of('ouch!').toValidation(); // Validation.Failure('ouch!')
Right.of('Success!').toValidation(); // Validation.Success('Success!')
```
