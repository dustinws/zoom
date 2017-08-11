# Task

#### Fantasy Land Implementations
`Applicative`, `Functor`, `Apply`, `Chain`, `Monad`

---

A `Task` represents an asynchronous action, and is very similar to a
javascript `Promise`. A good way to get an understanding of  how a `Task`
works is to find out how it is different from a `Promise`.

The first, and most notable difference is that a `Task` does not run right
away, but a `Promise` is.

```JavaScript
const fetchUsers = () =>
  new Promise((resolve, reject) => {
    // ...
  });
```

When `fetchUsers` is called, whatever logic is stored in the `Promise` will
be executed right away. That means that this is troublesome:

```JavaScript
fetchUsers();
fetchUsers();
fetchUsers();

// Query executed 3 times.
```

Of course, you wouldn't actually call a database query three times in a row
like that in real code. This example is meant to drill in the fact that
_creating a Promise will execute the closure that was given to it's constructor_.
There is no intermediate step.

A `Task`, however, will not run right away. Here is the same code refactored
to use a `Task` instead of a `Promise`

```JavaScript
const fetchUsers = () =>
  Task((reject, resolve) => {
    // ...
  });

// NOTE: You do not need to use "new" when creating a Task
```

Now, this is no trouble at all.

```JavaScript
fetchUsers();
fetchUsers();
fetchUsers();

// Query executed 0 times.
```

At this point, you're probably wondering, "Well, how _do_ you run this thing?".
That's a valid question. The answer is `.fork`

```JavaScript
fetchUsers().fork(
  error => console.log('Oh noes!', error),
  result => console.log('Aw yeaa -', result),
);
```

There are a few things to note about `fork` <small>(and it's static equivalent
`Task.fork`)</small>. First, notice how the error case is handled first.
With a `Promise`, adding a `.catch` handler is not\* required, which means it's
possible for a developer to accidentally <small>(or intentionally)</small>
skip error handling. With a `Task`, the only way to skip error handling is to
explicitly do nothing in your error handler. This difference means that no
errors are forgotton.

\* In new versions of node.js, unhandled rejections will throw a top level error

Another difference is the lack of a `.then` method. `.then` is an overloaded
method that will check the return value of the function you pass it to
detect new `Promise` instances. If one is returned, then `.then` will wait
on it to resolve before it does. Otherwise, it will wrap the value up in a
new `Promise` and return that. `.then`does not require you to be explicit
about whether or not your function returns a new Promise and _this_ is how
it is different from a `Task`. With a `Task`, you will use `.andThen` for async
functions and `.map` for sync functions.

```JavaScript
// Let's define some helpers

const log = msg => value =>
  console.log(msg, value);

// A sync function
const toUpper = x => x.toUpperCase();

// An async function
const delay = ms => value =>
  new Promise(r => setTimeout(r, ms, value));

// An async function
const delayT = ms => value =>
  Task((_, r) => setTimeout(r, ms, value));


// With a Promise
Promise.resolve('ayo')
  .then(delay(1000))
  .then(toUpper)
  .then(log('Result:'))
  .catch(log('Error:'));


// With a Task
Task.of('ayo')
  .andThen(delayT(1000))
  .map(toUpper)
  .fork(log('Error:'), log('Result'));
```

This makes it obvious to tell if a function is sync or async just by
looking at the method used to call it.

The last major difference is the order of the `Promise(resolve, reject)`
arguments. In a `Task`, the `reject` function is provided as the first
parameter, and `resolve` is the second.

```JavaScript
new Promise((resolve, reject) => {
  resolve('Why, hello there.');
});

Task((reject, resolve) => {
  resolve('Why, hello there.');
});
```

---

### Static

---

#### of
`of :: b -> Task a b`

Create a new Task with the given value.

```JavaScript
import { Task } from 'zoomjs';

Task.of(1); // Task(null, 1)
```

---

#### reject
`reject :: a -> Task a b`

Create a rejected Task with the given value.

```JavaScript
import { Task } from 'zoomjs';

Task.reject(1); // Task(1, null)
```

---

#### fork
`fork :: (a -> c) -> (b -> c) -> Task a b -> d`

Fork a task. This is the only way to run the code contained in the task.

```JavaScript
import { Task } from 'zoomjs';

Task.fork(
  error => console.log('Task error:', error),
  result => console.log('Task result:', result),
  Task.of('Hello world!'),
);

// 'Task result: Hello world!'
```

---

#### chain
`chain :: (b -> Task a c) -> Task a b -> Task a c`

Run a function that returns a nested task and flatten the result into a single task. An alias for `Task.andThen`.

```JavaScript
import { Task } from 'zoomjs';

Task.chain(Task.lift(n => n + 1), Task.of(1)); // Task(null, 2)
```

---

#### andThen
`andThen :: (b -> Task a c) -> Task a b -> Task a c`

Run a function that returns a nested task and flatten the result into a single task. An alias for `Task.chain`.

```JavaScript
import { Task } from 'zoomjs';

Task.andThen(Task.lift(n => n + 1), Task.of(1)); // Task(null, 2)
```

---

#### map
`map :: (b -> c) -> Task a b -> Task a c`

Run a function on a value contained in a Task.

```JavaScript
import { Task } from 'zoomjs';

Task.map(x => x + x, Task.of(1)) // Task(null, 2)
```

---

#### ap
`ap :: Apply (b -> c) -> Task a b -> Task a c`

Run a function contained in an Apply on a value contained in a Task.

```JavaScript
import { Task } from 'zoomjs';

Task.ap(Task.of(x => x + x), Task.of(1)) // Task(null, 2)
```
---

#### toPromise
`toPromise :: Task a b -> Promise b`

Convert a Task to a Promise. This implicitly calls "fork"

```JavaScript
import { Task } from 'zoomjs';
import Promise from 'bluebird';

Task.toPromise(Task.of(1)); // Promise(1)
Task.toPromise(Task.of(1), Promise) // Bluebird(1)
```

---

#### recover
`recover :: (a -> Task d c) -> Task a b -> Task d c`

Define a function to run if the Task is rejected, which will accept the error and return a new, valid Task.

```JavaScript
import { Task } from 'zoomjs';

const rejected = Task.reject(1); // Task(1, null)
Task.recover(err => Task.of('Recovered!'), rejected); // Task(null, 'Recovered!')
```

---

#### parallel
// parallel :: [Task a b] -> Task a [b]

Run many Tasks in parallel. If any Task rejects, it will reject the top level Task immediately.

```JavaScript
import { Task } from 'zoomjs';

const tasks = Task
  .parallel([
    Task.of(1),
    Task.of(2),
  ])
  .map((results) => {
    results; // [1, 2]
  });
```

---

#### lift
`lift :: (a -> b) -> (a -> Task b)`

Convert a regular function into a function that returns a task.

```JavaScript
import { Task } from 'zoomjs';

const addTask = Task.lift((a, b) => a + b);

addTask(1, 4); // Task(null, 5)
```

---

#### liftNode
`liftNode :: (a, (b, c) -> d) -> (a -> Task b c)`

Convert a node style callback into a function that returns a task.

```JavaScript
import fs from 'fs';
import { Task } from 'zoomjs';

const readFile = Task.liftNode(fs.readFile);

readFile('foo.js'); // Task(Error, Buffer)
```

---

### Instance

---

#### chain
`chain :: Task a b ~> (b -> Task a c) -> Task a c`

Run a function that returns a nested task and flatten the result into a single task. An alias for `Task#andThen`.

```JavaScript
import { Task } from 'zoomjs';

Task.of(1).chain(x => Task.of(x + x)); // Task(null, 2)
```

---

#### andThen
`andThen :: Task a b ~> (b -> Task a c) -> Task a c`

Run a function that returns a nested task and flatten the result into a single task. An alias for `Task#chain`.

```JavaScript
import { Task } from 'zoomjs';

Task.of(1).andThen(x => Task.of(x + x)); // Task(null, 2)
```

---

#### map
`map :: Task a b ~> (b -> c) -> Task a c`

Run a function on a value contained in a Task.

```JavaScript
import { Task } from 'zoomjs';

Task.of(1).map(x => x + x); // Task(null, 2)
```

---

#### ap
`ap :: Task a b ~> Apply (b -> c) -> Task a c`

Run a function contained in an Apply on a value contained in a Task.

```JavaScript
import { Task } from 'zoomjs';

Task.of(1).ap(Task.of(x => x + x));
// => Task(null, 2)
```

---

#### toPromise
`toPromise :: Task a b ~> Task a b -> Promise b`

Convert a Task to a Promise. This implicitly calls "fork"

```JavaScript
import { Task } from 'zoomjs';

Task.of(1).toPromise(); // Promise(1)
```

---

#### recover
`recover :: Task a b ~> (a -> Task c d) -> Task c d`

Define a function to run if the Task is rejected, which will accept the error and return a new, valid Task.

```JavaScript
import { Task } from 'zoomjs';

const rejected = Task.reject(1);
// Task(1, null)

rejected.recover(err => Task.of('Recovered!'));
// Task(null, 'Recovered!')
```
