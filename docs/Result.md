# Result

`Result` is an abstraction around error handling that allows the user
to return their errors instead of throw them. `Result` is a super class
with two constructors, `Err` and `Ok`. The `Ok` constructor
represents a successful operation, and the `Err` constructor represents
an unsuccessful operation with an embedded error message. You can chain
functions that return `Result` instances by using `.chain` or `.andThen`.

```hs
type Result e a = Err e | Ok a
```

---

#### Fantasy Land Implementations
`Applicative`, `Functor`, `Apply`, `Chain`, `Monad`


### Usage

```JavaScript
import { Result } from 'zoomjs';

// Expose the constructors
const { Err, Ok } = Result;

const toInteger = (number) => {
  const integer = parseInt(number, 10);

  if (isNaN(integer)) {
    return Err('Not a number!');
  }

  return Ok(number);
};

toInteger('32') // Ok(32)
toInteger(null) // Err(Not a number!)
```

---

### Static

---

#### of
```hs
of :: b -> Result a b
```

Lift a value into a successful 'Ok' context.

```JavaScript
import { Result } from 'zoomjs';

Result.of(1).toString();
// => 'Ok(1)'
```

---

#### Ok.of
```hs
of :: b -> Result a b
```

Lift a value into a successful 'Ok' context.

```JavaScript
import { Ok } from 'zoomjs/result';

Ok.of(1).toString();
// => 'Ok(1)'
```

---

#### Err.of
```hs
of :: a -> Result a b
```

Lift a value into an unsuccessful 'Err' context.

```JavaScript
import { Err } from 'zoomjs/result';

Err.of(1).toString();
// => 'Err(1)'
```

---

#### chain
```hs
chain :: (b -> Result a c) -> Result a b -> Result a c
```

Apply a transformation to the Result if it is an instance of "Ok". Otherwise, ignore the transformation and return the instance.
This is how you can switch from a 'Ok' to 'Err' instance and stop subsequent transformations from being applied. An alias for `Result.andThen`

```JavaScript
import { chain, Err, Ok } from 'zoomjs/result';

// toUpper :: String -> Result String String
const toUpper = x =>
  typeof x !== 'string'
    ? Err.of('toUpper() recieved a non string.')
    : Ok.of(x.toUpperCase());

// A "Ok" will apply the next operation
chain(toUpper, Ok.of('boom'));
// => Ok(BOOM)

// A "Err" will ignore the next operation
chain(toUpper, Err.of('yea right'));
// => Err(yea right)
```

---

#### andThen
```hs
andThen :: (b -> Result a c) -> Result a b -> Result a c
```

Apply a transformation to the Result if it is an instance of "Ok". Otherwise, ignore the transformation and return the instance.
This is how you can switch from a 'Ok' to 'Err' instance and stop subsequent transformations from being applied. An alias for `Result.chain`

```JavaScript
import { andThen, Err, Ok } from 'zoomjs/result';

// toUpper :: String -> Result String String
const toUpper = x =>
  typeof x !== 'string'
    ? Err.of('toUpper() recieved a non string.')
    : Ok.of(x.toUpperCase());

// A "Ok" will apply the next operation
andThen(toUpper, Ok.of('boom'));
// => Ok(BOOM)

// A "Err" will ignore the next operation
andThen(toUpper, Err.of('yea right'));
// => Err(yea right)
```

---

#### map
```hs
map :: (b -> c) -> Result a b -> Result a c
```

`map` is very similar to `Result.andThen` and `Result.chain` in that it only runs the function if the result is an instance of `Just`. The main difference is that `Result.andThen` and `Result.chain` expect the functions you give them to return new `Result` instances, and map let's you use plain old functions.

```JavaScript
import { map, Err, Ok } from 'zoomjs/result';

// toUpper :: String -> String
const toUpper = x => x.toUpperCase();

// A "Ok" will run the next operation
map(toUpper, Ok.of('yay'));
// => Ok('YAY!');

// A "Err" will ignore the next operation
map(toUpper, Err.of('nay!'));
// => Err('nay!');
```

---

#### ap
```hs
ap :: Apply (b -> c) -> Result a b -> Result a c
```

`ap` is just like `map`, allowing a user to use plain old functions to transform values hidden away in `Result`s. The only difference is that instead of giving it the function, you give it an `Result` of the function.
This is known as the `Apply` type in fantasy land JS.

```JavaScript
import { ap, Err, Ok } from 'zoomjs/result';

// toUpperE :: Result a (String -> String)
const toUpperE = Ok(x => x.toUpperCase());

// A "Ok" will apply the next operation
ap(toUpperE, Ok.of('boom'));
// => Ok(BOOM)

// A "Err" will ignore the next operation
ap(toUpperE, Err.of('yea right'));
// => Err(yea right)
```

---

#### isErr
```hs
isErr :: Result a b -> Bool
```

Determine if an Result is an instance of Err

```JavaScript
import { isErr, Err, Ok } from 'zoomjs/result';

isErr(Err.of());
// => true

isErr(Ok.of());
// => false
```

---

#### isOk
```hs
isOk :: Result a b -> Bool
```

Determine if an Result is an instance of Ok

```JavaScript
import { isOk, Err, Ok } from 'zoomjs/result';

isOk(Ok.of());
// => true

isOk(Err.of());
// => false
```

---

#### toEither
```hs
toEither :: Result a b -> Either a b
```

Convert a Result into an [Either](https://github.com/dustinws/zoom/blob/master/docs/Either.md).

```JavaScript
import { toEither, Ok, Err } from 'zoomjs/result';


toEither(Err.of(1)); // Either.Left(1)
toEither(Ok.of('Success!')); // Either.Right('Success!')
```

---

#### toMaybe
```hs
toMaybe :: Result a b -> Maybe b
```

Convert a Result into a [Maybe](https://github.com/dustinws/zoom/blob/master/docs/Maybe.md).

```JavaScript
import { toMaybe, Ok, Err } from 'zoomjs/maybe';


toMaybe(Err.of()); // Maybe.Nothing
toMaybe(Ok.of('Success!')); // Maybe.Just('Success!')
```

---

#### toValidation
```hs
toValidation :: Result a b -> Validation a b
```

Convert a Result into a [Validation](https://github.com/dustinws/zoom/blob/master/docs/Validation.md).

```JavaScript
import { toValidation, Ok, Err } from 'zoomjs/maybe';


toValidation(Err.of(1)); // Validation.Failure(1)
toValidation(Ok.of('Success!')); // Validation.Success('Success!')
```

---

#### toTask
```hs
toTask :: Result a b -> Task a b
```

Convert a Result into a [Task](https://github.com/dustinws/zoom/blob/master/docs/Task.md).

```JavaScript
import { toTask, Ok, Err } from 'zoomjs/maybe';


toTask(Err.of()); // Task(null, null) [rejected]
toTask(Ok.of('Success!')); // Task(null, 'Success!')
```

---

### Instance

---

#### cata
```hs
cata :: Result a b ~> { Err: a -> c, Ok: b -> c } -> c
```

A function that accepts an object with two functions, one to run if the result is an instance of `Ok`, and one to run if the result is an instance of `Err`. The return value will be returned directly, with no wrapper instance. This name is short for `catamorphism`.
An alias for `Result#caseOf`

```JavaScript
import { Result } from 'zoomjs';

Result.of(1).cata({
  Ok(one) {
    // Do something with one
  },

  Err(error) {
    // Handle the error
  },
});
```

---

#### caseOf
```hs
caseOf :: Result a b ~> { Err: a -> c, Ok: b -> c } -> c
```

A function that accepts an object with two functions, one to run if the result is an instance of `Ok`, and one to run if the result is an instance of `Err`. The return value will be returned directly, with no wrapper instance.
An alias for `Result#cata`

```JavaScript
import { Result } from 'zoomjs';

Result.of(1).caseOf({
  Ok(one) {
    // Do something with one
  },

  Err(error) {
    // Handle the error
  },
});
```

---

#### Ok#of
```hs
of :: Result a b ~> c -> Result d c
```

Lift a value into a successful 'Ok' context.

```JavaScript
import { Ok } from 'zoomjs/result';

Ok.of(1);
// => Ok(1)
```

---

#### Left#of
```hs
of :: Result a b ~> c -> Result c d
```

Lift a value into an unsuccessful 'Err' context.

```JavaScript
import { Err } from 'zoomjs/result';

Err.of(1);
// => Err(1)
```

---

#### chain
```hs
chain :: Result a b ~> (b -> Result a c) -> Result a c
```

Apply a transformation to the Result if it is an instance of "Ok". Otherwise, ignore the transformation and return the instance.
This is how you can switch from a 'Ok' to 'Err' instance and stop subsequent transformations from being applied. An alias for `Result#andThen`

```JavaScript
import { Err, Ok } from 'zoomjs/result';

// toUpper :: String -> Result String String
const toUpper = x =>
typeof x !== 'string'
? Err.of('toUpper() recieved a non string.')
: Ok.of(x.toUpperCase());

// A "Ok" will apply the next operation
Ok.of('boom').chain(toUpper);
// => Ok(BOOM)

// A "Err" will ignore the next operation
Err.of('yea right').chain(toUpper);
// => Err(yea right)
```

---

#### andThen
```hs
andThen :: Result a b ~> (b -> Result a c) -> Result a c
```

Apply a transformation to the Result if it is an instance of "Ok". Otherwise, ignore the transformation and return the instance.
This is how you can switch from a 'Ok' to 'Err' instance and stop subsequent transformations from being applied. An alias for `Result#chain`

```JavaScript
import { Err, Ok } from 'zoomjs/result';

// toUpper :: String -> Result String String
const toUpper = x =>
typeof x !== 'string'
? Err.of('toUpper() recieved a non string.')
: Ok.of(x.toUpperCase());

// A "Ok" will apply the next operation
Ok.of('boom').andThen(toUpper);
// => Ok(BOOM)

// A "Err" will ignore the next operation
Err.of('yea right').andThen(toUpper);
// => Err(yea right)
```

---

#### map
```hs
map :: Result a b ~> (b -> c) -> Result a c
```

`map` is very similar to `Result.andThen` and `Result.chain` in that it only runs the function if the result is an instance of `Just`. The main difference is that `Result.andThen` and `Result.chain` expect the functions you give them to return new `Result` instances, and map let's you use plain old functions.

```JavaScript
import { Err, Ok } from 'zoomjs/result';

// toUpper :: String -> String
const toUpper = x => x.toUpperCase();

// A "Ok" will run the next operation
Ok.of('yay').map(toUpper);
// => Ok('YAY!');

// A "Err" will ignore the next operation
Err.of('nay!').map(toUpper);
// => Err('nay!');
```

---

#### ap
```hs
ap :: Result a b ~> Apply (b -> c) -> Result a c
```

`ap` is just like `map`, allowing a user to use plain old functions to transform values hidden away in `Result`s. The only difference is that instead of giving it the function, you give it an `Result` of the function.
This is known as the `Apply` type in fantasy land JS.

```JavaScript
import { ap, Err, Ok } from 'zoomjs';

// toUpperE :: Result a (String -> String)
const toUpperE = Ok(x => x.toUpperCase());

// A "Ok" will apply the next operation
Ok.of('boom').ap(toUpperE);
// => Ok(BOOM)

// A "Err" will ignore the next operation
Err.of('yea right').ap(toUpperE);
// => Err(yea right)
```

---

#### isErr
```hs
isErr :: Result a b ~> c -> Bool
```

Determine if an Result is an instance of Err

```JavaScript
import { Err, Ok } from 'zoomjs/result';

Err.of(1).isErr(); // true
Ok.of(1).isErr(); // false
```

---

#### isOk
```hs
isOk :: Result a b ~> c -> Bool
```

Determine if an Result is an instance of Ok

```JavaScript
import { Err, Ok } from 'zoomjs/result';

Ok.of(1).isOk(); // true
Err.of(1).isOk(); // false
```

---

#### toEither
```hs
toEither :: Result a b ~> Either a b
```

Convert a Result into an [Either](https://github.com/dustinws/zoom/blob/master/docs/Either.md).

```JavaScript
import { Ok, Err } from 'zoomjs/result';


Err.of(1).toEither(); // Either.Left(1)
Ok.of('Success!').toEither(); // Either.Right('Success!')
```

---

#### toMaybe
```hs
toMaybe :: Result a b ~> Maybe b
```

Convert a Result into a [Maybe](https://github.com/dustinws/zoom/blob/master/docs/Maybe.md).

```JavaScript
import { Ok, Err } from 'zoomjs/maybe';


Err.of().toMaybe(); // Maybe.Nothing
Ok.of('Success!').toMaybe(); // Maybe.Just('Success!')
```

---

#### toValidation
```hs
toValidation :: Result a b ~> Validation a b
```

Convert a Result into a [Validation](https://github.com/dustinws/zoom/blob/master/docs/Validation.md).

```JavaScript
import { Ok, Err } from 'zoomjs/maybe';


Err.of(1).toValidation(); // Validation.Failure(1)
Ok.of('Success!').toValidation(); // Validation.Success('Success!')
```

---

#### toTask
```hs
toTask :: Result a b ~> Task a b
```

Convert a Result into a [Task](https://github.com/dustinws/zoom/blob/master/docs/Task.md).

```JavaScript
import { Ok, Err } from 'zoomjs/maybe';


Err.of().toTask(); // Task(null, null) [rejected]
Ok.of('Success!').toTask(); // Task(null, 'Success!')
```
