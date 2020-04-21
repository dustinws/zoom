# Validation

```hs
type Validation e a = Failure e | Success a
```

---

#### Fantasy Land Implementations
`Semigroup`, `Monoid`, `Applicative`, `Functor`, `Apply`, `Chain`, `Monad`

---

`Validation` is a lot like `Either` <small>(in most cases they are interchangeable)
</small> but with a few small differences.

`Either` is great when you want to fail quickly, at the first error
that occurs. However, what if you wanted to know _all_ possible errors that
could have occurred? `Either` can only store one error at a time, so you
can't use it to accumulate errors.

This is where `Validation` comes in. It acts as an accumulator for errors,
and it also supports parallel validation. This means that you can split up
validations across multiple processes <small>(if your use case needs it)
</small>. This works because of the `Validation.concat` function. It
knows how to combine multiple validation instances, and it has a bias towards
the `Failure` case.

Let's show this in action with a simple nightclub app. We need to validate
all guests that want to enter the club, and then charge them a cover fee.
There are a few reasons why someone would be denied, and if they are, we
want to tell them all of the reasons they were denied.

### Usage

```JavaScript
import { Failure, Success, concat, empty } from 'zoomjs/validation';

const checkAge = guest =>
  guest.age < 21
    ? Failure(['Too Young!'])
    : Success(guest);

const checkSobriety = guest =>
  guest.bac > 0.07
    ? Failure(['Too Drunk!'])
    : Success(guest);

// Our main validation function
const validateGuest = (guest) => {
  const validations = [
    checkAge(guest),
    checkSobriety(guest),
  ];

  // Here we reduce all validations down to a single validation.
  // It will either return a Failure with an array of errors,
  // or a Success with the guest.
  return validations.reduce(concat, empty());
};

// All valid
validateGuest({
  age: 21,
  bac: 0.04
});
// => Success({ age: 21, bac: 0.04 })

// Not old enough
validateGuest({
  age: 20,
  bac: 0.04
});
// => Failure(['Too Young!'])

// Not old enough and a little too tipsy
validateGuest({
  age: 20,
  bac: 0.08
});
// => Failure(['Too Young!', 'Too Drunk!'])
```

---

### Static

---

#### of
```hs
of :: a -> Validation b a
```

Lift a value into a successful 'Success' context.

```JavaScript
import { Validation } from 'zoomjs';

const valid = Validation.of(1);

valid.toString() // 'Success(1)'
```

---

#### Success.of
```hs
of :: a -> Validation b a
```

Lift a value into a successful 'Success' context.

```JavaScript
import { Validation } from 'zoomjs';

const valid = Validation.Success.of(1);

valid.toString() // 'Success(1)'
```

---

#### Failure.of
```hs
of :: a -> Validation a b
```

Lift a value into an unsuccessful 'Failure' context.

```JavaScript
import { Validation } from 'zoomjs';

const valid = Validation.Failure.of(1);

valid.toString() // 'Failure(1)'
```

---

#### chain
```hs
chain :: Validation v =>  (b -> v a c) -> v a b -> v a c
```

Apply a transformation to the Validation if it is an instance of "Success". Otherwise, ignore the transformation and return the instance.
This is how you can switch from a 'Success' to 'Failure' instance and stop subsequent transformations from being applied. An alias for `Validation.andThen`

```JavaScript
import { Validation } from 'zoomjs';

const valid = Validation.Success.of('yay!');
const invalid = Validation.Failure.of('nay!');

const toUpper = x => Validation.Success.of(x.toUpperCase());

Validation.chain(toUpper, valid); // Success('YAY!');
Validation.chain(toUpper, invalid); // Failure('nay!');
```

---

#### andThen
```hs
andThen :: Validation v =>  (b -> v a c) -> v a b -> v a c
```

Apply a transformation to the Validation if it is an instance of "Success". Otherwise, ignore the transformation and return the instance.
This is how you can switch from a 'Success' to 'Failure' instance and stop subsequent transformations from being applied. An alias for `Validation.chain`

```JavaScript
import { Validation } from 'zoomjs';

const valid = Validation.Success.of('yay!');
const invalid = Validation.Failure.of('nay!');

const toUpper = x => Validation.Success.of(x.toUpperCase());

Validation.andThen(toUpper, valid); // Success('YAY!');
Validation.andThen(toUpper, invalid); // Failure('nay!');
```

---

#### map
```hs
map :: Validation v => (b -> c) -> v a b -> v a c
```

Apply a transformation to the Validation if it is an instance of "Success". Otherwise, ignore the transformation and return the instance.

```JavaScript
import { Validation } from 'zoomjs';

const valid = Validation.Success.of('yay!');
const failure = Validation.Failure.of('nay!');

const toUpper = x => x.toUpperCase();

Validation.map(toUpper, valid); // Success('YAY!');
Validation.map(toUpper, invalid); // Failure('nay!');
```

---

#### ap
```hs
ap :: Validation v => Apply (b -> c) -> v a b -> v a c
```

Apply a transformation to the Validation if it is an instance of "Success". Otherwise, ignore the transformation and return the instance.

```JavaScript
import { Validation } from 'zoomjs';

const valid = Validation.Success.of('yay!');
const failure = Validation.Failure.of('nay!');

const toUpper = Validation.of(x => x.toUpperCase());

Validation.ap(toUpper, valid); // Success('YAY!');
Validation.ap(toUpper, invalid); // Failure('nay!');
```

---

#### isFailure
```hs
isFailure :: Validation a b -> Bool
```

Determine if an Validation is an instance of Failure

```JavaScript
import { Validation } from 'zoomjs';

Validation.isFailure(Validation.Failure.of(1)); // true
Validation.isFailure(Validation.Success.of(1)); // false
```

---

#### isSuccess
```hs
isSuccess :: Validation a b -> Bool
```

Determine if an Validation is an instance of Success

```JavaScript
import { Validation } from 'zoomjs';

Validation.isSuccess(Validation.Success.of(1)); // true
Validation.isSuccess(Validation.Failure.of(1)); // false
```

---

#### concat
```hs
concat :: Validation v => v a b -> v a b -> v a b
```

Combine two validations into one with a bias towards Failures.
If both values are the same type (both Failures, etc..) then their values will be concatenated and a single instance of that type will be returned.

```JavaScript
import { Validation } from 'zoomjs';

const failure = Validation.Failure.of(['fail!']);
const success = Validation.Success.of(['win!']);

Validation.concat(failure, success); // failure
Validation.concat(success, failure); // failure
Validation.concat(failure, failure); // Failure(['fail!', 'fail!'])
Validation.concat(success, success); // Success(['win!', 'win!'])
```

---

#### empty
```hs
empty :: a -> Validation b [c]
```

Create an empty Validation. Used as the "identity" element for the Validation monoid.

```JavaScript
import { Validation } from 'zoomjs';

Validation.empty(); // Success([])
```

---

#### toEither
```hs
toEither :: Validation a b -> Either a b
```

Convert a Validation into an [Either](https://github.com/dustinws/zoom/blob/master/docs/Either.md).

```JavaScript
import { toEither, Success, Failure } from 'zoomjs/validation';


toEither(Failure.of(1)); // Either.Left(1)
toEither(Success.of('Success!')); // Either.Right('Success!')
```

---

#### toMaybe
```hs
toMaybe :: Validation a b -> Maybe b
```

Convert a Validation into a [Maybe](https://github.com/dustinws/zoom/blob/master/docs/Maybe.md).

```JavaScript
import { toMaybe, Success, Failure } from 'zoomjs/validation';


toMaybe(Failure.of()); // Maybe.Nothing
toMaybe(Success.of('Success!')); // Maybe.Just('Success!')
```

---

#### toResult
```hs
toResult :: Validation a b -> Result a b
```

Convert a Validation into a [Result](https://github.com/dustinws/zoom/blob/master/docs/Result.md).

```JavaScript
import { toResult, Success, Failure } from 'zoomjs/validation';


toResult(Failure.of(1)); // Result.Err(1)
toResult(Success.of('Success!')); // Result.Ok('Success!')
```

---

#### toTask
```hs
toTask :: Validation a b -> Task a b
```

Convert a Validation into a [Task](https://github.com/dustinws/zoom/blob/master/docs/Task.md).

```JavaScript
import { toTask, Success, Failure } from 'zoomjs/maybe';


toTask(Failure.of()); // Task(null, null) [rejected]
toTask(Success.of('Success!')); // Task(null, 'Success!')
```

---

### Instance

---

#### cata
```hs
cata :: Validation a b ~> { Failure: a -> c, Success: b -> c } -> c
```

A function that accepts an object with two functions, one to run if the either is an instance of `Success`, and one to run if the either is an instance of `Failure`. The return value will be returned directly, with no wrapper instance. This name is short for `catamorphism`.
An alias for `Validation#caseOf`

```JavaScript
import { Validation } from 'zoomjs';

Validation.of('foobar').cata({
  Success(foobar) {
    // Do something with foobar
  },

  Failure(error) {
    // Handle the error
  },
});
```

---

#### caseOf
```hs
caseOf :: Validation a b ~> { Failure: a -> c, Success: b -> c } -> c
```

A function that accepts an object with two functions, one to run if the either is an instance of `Success`, and one to run if the either is an instance of `Failure`. The return value will be returned directly, with no wrapper instance.
An alias for `Either#cata`.

```JavaScript
import { Validation } from 'zoomjs';

Validation.of('foobar').caseOf({
  Success(foobar) {
    // Do something with foobar
  },

  Failure(error) {
    // Handle the error
  },
});
```

---

#### Success#of
```hs
of :: Validation a b ~> d -> Validation c d
```

Lift a value into a successful 'Success' context.

```JavaScript
import { Validation } from 'zoomjs';

const valid = Validation.();

valid.of(1); // Success(1)
```

---

#### Failure#of
```hs
of :: Validation a b ~> c -> Validation c d
```

Lift a value into an unsuccessful 'Failure' context.

```JavaScript
import { Validation } from 'zoomjs';

const invalid = Validation.();

invalid.of(1); // Failure(1)
```

---

#### chain
```hs
chain :: Validation a b ~> (b -> Validation a c) -> Validation a c
```

Apply a transformation to the Validation if it is an instance of "Success". Otherwise, ignore the transformation and return the instance.
This is how you can switch from a 'Success' to 'Failure' instance and stop subsequent transformations from being applied. An alias for `Validation#andThen`.

```JavaScript
import { Validation } from 'zoomjs';

const valid = Validation.Success.of('yay!');
const invalid = Validation.Failure.of('nay!');

const toUpper = x => Validation.Success.of(x.toUpperCase());

valid.chain(toUpper); // Success('YAY!');
invalid.chain(toUpper); // Failure('nay!');
```

---

#### andThen
```hs
andThen :: Validation a b ~> (b -> Validation a c) -> Validation a c
```

Apply a transformation to the Validation if it is an instance of "Success". Otherwise, ignore the transformation and return the instance.
This is how you can switch from a 'Success' to 'Failure' instance and stop subsequent transformations from being applied. An alias for `Validation#chain`.

```JavaScript
import { Validation } from 'zoomjs';

const valid = Validation.Success.of('yay!');
const invalid = Validation.Failure.of('nay!');

const toUpper = x => Validation.Success.of(x.toUpperCase());

valid.andThen(toUpper); // Success('YAY!');
invalid.andThen(toUpper); // Failure('nay!');
```

---

#### map
```hs
map :: Validation a b ~> (b -> c) -> Validation a c
```

Apply a transformation to the Validation if it is an instance of "Success". Otherwise, ignore the transformation and return the instance.

```JavaScript
import { Validation } from 'zoomjs';

const valid = Validation.Success.of('yay!');
const failure = Validation.Failure.of('nay!');

const toUpper = x => x.toUpperCase();

valid.map(toUpper); // Success('YAY!');
invalid.map(toUpper); // Failure('nay!');
```

---

#### ap
```hs
ap :: Validation a b ~> Apply (b -> c) -> Validation a c
```

Apply a transformation to the Validation in the Apply if it is an instance of "Success". Otherwise, ignore the transformation and return the instance.

```JavaScript
import { Validation } from 'zoomjs';

const valid = Validation.Success.of('yay!');
const failure = Validation.Failure.of('nay!');

const toUpper = Validation.of(x => x.toUpperCase());

valid.ap(toUpper); // Success('YAY!');
invalid.ap(toUpper); // Failure('nay!');
```

---

#### isFailure
```hs
isFailure :: Validation a b ~> c -> Bool
```

Determine if an Validation is an instance of Failure

```JavaScript
import { Validation } from 'zoomjs';

Validation.Failure.of(1).isFailure(); // true
Validation.Success.of(1).isFailure(); // false
```

---

#### isSuccess
```hs
isSuccess :: Validation a b ~> c -> Bool
```

Determine if an Validation is an instance of Success

```JavaScript
import { Validation } from 'zoomjs';

Validation.Success.of(1).isSuccess(); // true
Validation.Failure.of(1).isSuccess(); // false
```

---

#### concat
```hs
concat :: Validation a b ~> Validation a b -> Validation a b
```

Combine two validations into one with a bias towards Failures.
If both values are the same type (both Failures, etc..) then their values will be concatenated and a single instance of that type will be returned.

```JavaScript
import { Validation } from 'zoomjs';

const failure = Validation.Failure.of(['fail!']);
const success = Validation.Success.of(['win!']);

success.concat(failure); // failure
failure.concat(success); // failure
failure.concat(failure); // Failure(['fail!', 'fail!'])
success.concat(success); // Success(['win!', 'win!'])
```

---

#### toEither
```hs
toEither :: Validation a b ~> Either a b
```

Convert a Validation into an [Either](https://github.com/dustinws/zoom/blob/master/docs/Either.md).

```JavaScript
import { Success, Failure } from 'zoomjs/validation';


Failure.of(1).toEither(); // Either.Left(1)
Success.of('Success!').toEither(); // Either.Right('Success!')
```

---

#### toMaybe
```hs
toMaybe :: Validation a b ~> Maybe b
```

Convert a Validation into a [Maybe](https://github.com/dustinws/zoom/blob/master/docs/Maybe.md).

```JavaScript
import { Success, Failure } from 'zoomjs/validation';


Failure.of().toMaybe(); // Maybe.Nothing
Success.of('Success!').toMaybe(); // Maybe.Just('Success!')
```

---

#### toResult
```hs
toResult :: Validation a b ~> Result a b
```

Convert a Validation into a [Result](https://github.com/dustinws/zoom/blob/master/docs/Result.md).

```JavaScript
import { Success, Failure } from 'zoomjs/validation';


Failure.of(1).toResult(); // Result.Err(1)
Success.of('Success!').toResult(); // Result.Ok('Success!')
```

---

#### toTask
```hs
toTask :: Validation a b ~> Task a b
```

Convert a Validation into a [Task](https://github.com/dustinws/zoom/blob/master/docs/Task.md).

```JavaScript
import { Success, Failure } from 'zoomjs/maybe';


Failure.of().toTask(); // Task(null, null) [rejected]
Success.of('Success!').toTask(); // Task(null, 'Success!')
```
