'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _adt = require('../adt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class Task
 * @description
 * #### Fantasy Land Implementations
 * `Applicative`, `Functor`, `Apply`, `Chain`, `Monad`
 *
 * ---
 *
 * A `Task` represents an asynchronous action, and is very similar to a
 * javascript `Promise`. A good way to get an understanding of  how a `Task`
 * works is to find out how it is different from a `Promise`.
 *
 * The first, and most notable difference is that a `Task` does not run right
 * away, but a `Promise` is.
 * ```
 * const fetchUsers = () =>
 *   new Promise((resolve, reject) => {
 *     // ...
 *   });
 * ```
 * When `fetchUsers` is called, whatever logic is stored in the `Promise` will
 * be executed right away. That means that this is troublesome:
 * ```
 * fetchUsers();
 * fetchUsers();
 * fetchUsers();
 *
 * // Query executed 3 times.
 * ```
 * Of course, you wouldn't actually call a database query three times in a row
 * like that in real code. This example is meant to drill in the fact that
 * _creating a Promise will execute the closure that was given to it's constructor_.
 * There is no intermediate step.
 *
 * A `Task`, however, will not run right away. Here is the same code refactored
 * to use a `Task` instead of a `Promise`;
 * ```
 * const fetchUsers = () =>
 *   Task((reject, resolve) => {
 *     // ...
 *   });
 *
 * // NOTE: You do not need to use "new" when creating a Task
 * ```
 * Now, this is no trouble at all.
 * ```
 * fetchUsers();
 * fetchUsers();
 * fetchUsers();
 *
 * // Query executed 0 times.
 * ```
 * At this point, you're probably wondering, "Well, how _do_ you run this thing?".
 * That's a valid question. The answer is `.fork`
 * ```
 * fetchUsers().fork(
 *   error => console.log('Oh noes!', error),
 *   result => console.log('Aw yeaa -', result),
 * );
 * ```
 * There are a few things to note about `fork` <small>(and it's static equivalent
 * {@link Task.fork})</small>. First, notice how the error case is handled first.
 * With a `Promise`, adding a `.catch` handler is not *required, which means it's
 * possible for a developer to accidentally <small>(or intentionally)</small>
 * skip error handling. With a `Task`, the only way to skip error handling is to
 * explicitly do nothing in your error handler. This difference means that no
 * errors are forgotton.
 *
 * \* In new versions of node.js, unhandled rejections will throw a top level error
 *
 * Another difference is the lack of a `.then` method. `.then` is an overloaded
 * method that will check the return value of the function you pass it to
 * detect new `Promise` instances. If one is returned, then `.then` will wait
 * on it to resolve before it does. Otherwise, it will wrap the value up in a
 * new `Promise` and return that. `.then` ** does not require you to be explicit
 * about whether or not your function returns a new Promise ** and _this_ is how
 * it is different from a `Task`. With a `Task`, you will use `.andThen` for async
 * functions and `.map` for sync functions.
 * ```
 * // Let's define some helpers
 *
 * const log = msg => value =>
 *   console.log(msg, value);
 *
 * // A sync function
 * const toUpper = x => x.toUpperCase();
 *
 * // An async function
 * const delay = ms => value =>
 *   new Promise(r => setTimeout(r, ms, value));
 *
 * // An async function
 * const delayT = ms => value =>
 *   Task((_, r) => setTimeout(r, ms, value));
 *
 *
 * // With a Promise
 * Promise.resolve('ayo')
 *   .then(delay(1000))
 *   .then(toUpper)
 *   .then(log('Result:'))
 *   .catch(log('Error:'));
 *
 *
 * // With a Task
 * Task.of('ayo')
 *   .andThen(delayT(1000))
 *   .map(toUpper)
 *   .fork(log('Error:'), log('Result'));
 * ```
 * This makes it obvious to tell if a function is sync or async just by
 * looking at the method used to call it.
 *
 * The last major difference is the order of the `Promise(resolve, reject)`
 * arguments. In a `Task`, the `reject` function is provided as the first
 * parameter, and `resolve` is the second.
 * ```
 * new Promise((resolve, reject) => {
 *   resolve('Why, hello there.');
 * });
 *
 * Task((reject, resolve) => {
 *   resolve('Why, hello there.');
 * });
 * ```
 */
var Task = (0, _adt.tag)('Task', 'fork');

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Create a new Task with the given value.
 * @memberof Task
 * @since 1.0.0-beta
 * @function of
 * @static
 * @implements Applicative
 * @example
 * // of :: b -> Task a b
 * import { Task } from 'zoomjs';
 *
 * Task.of(1); // Task(null, 1)
 *
 * @param  {Any} value The value to put in the Task
 * @return {Task}
 */
Task.of = function (value) {
  return Task(function (_, resolve) {
    return resolve(value);
  });
};

/**
 * @description Create a rejected Task with the given value.
 * @memberof Task
 * @since 1.0.0-beta
 * @function reject
 * @static
 * @example
 * // reject :: a -> Task a b
 * import { Task } from 'zoomjs';
 *
 * Task.reject(1); // Task(1, null)
 *
 * @param  {Any} value The value to put in the Task
 * @return {Task}
 */
Task.reject = function (value) {
  return Task(function (reject) {
    return reject(value);
  });
};

/**
 * @description Fork a task. This is the only way to run the code contained
 * in the task.
 * @memberof Task
 * @since 1.0.0-beta
 * @function fork
 * @static
 * @example
 * // fork :: (a -> c) -> (b -> c) -> Task a b -> d
 * import { Task } from 'zoomjs';
 *
 * Task.fork(
 *   error => console.log('Task error:', error),
 *   result => console.log('Task result:', result),
 *   Task.of('Hello world!'),
 * );
 *
 * // 'Task result: Hello world!'
 *
 * @param  {Function} reject The error handler.
 * @param  {Function} resolve The success handler.
 * @param  {Task} task The function to run.
 * @return {void}
 */
Task.fork = (0, _curry2.default)(function (reject, resolve, task) {
  return task.fork(reject, resolve);
});

/**
 * @description Run a function that returns a nested task and flatten
 * the result into a single task. An alias for {@link Task.andThen}.
 * @memberof Task
 * @since 1.0.0-beta
 * @implements Chain
 * @see {@link Task.andThen}
 * @function chain
 * @static
 * @example
 * // chain :: (b -> Task a c) -> Task a b -> Task a c
 * import { Task } from 'zoomjs';
 *
 * Task.chain(Task.lift(n => n + 1), Task.of(1)); // Task(null, 2)
 *
 * @param  {Function} transform The function to run.
 * @param  {Task} task The task
 * @return {Task}
 */
Task.chain = (0, _curry2.default)(function (transform, task) {
  return Task(function (reject, resolve) {
    return task.fork(reject, function (value) {
      return transform(value).fork(reject, resolve);
    });
  });
});

/**
 * @description Run a function that returns a nested task and flatten
 * the result into a single task. An alias for {@link Task.chain}
 * @memberof Task
 * @since 1.0.0-beta
 * @see {@link Task.chain}
 * @function andThen
 * @static
 * @example
 * // andThen :: (b -> Task a c) -> Task a b -> Task a c
 * import { Task } from 'zoomjs';
 *
 * Task.andThen(Task.lift(n => n + 1), Task.of(1)); // Task(null, 2)
 *
 * @param  {Function} transform The function to run.
 * @param  {Task} task The task
 * @return {Task}
 */
Task.andThen = Task.chain;

/**
 * @description Run a function on a value contained in a Task.
 * @memberof Task
 * @since 1.0.0-beta
 * @function map
 * @static
 * @implements Functor
 * @example
 * // map :: (b -> c) -> Task a b -> Task a c
 * import { Task } from 'zoomjs';
 *
 * Task.map(x => x + x, Task.of(1)) // Task(null, 2)
 *
 * @param  {Function} transform The function to run.
 * @param  {Task} task The task
 * @return {Task}
 */
Task.map = (0, _curry2.default)(function (transform, task) {
  return Task.chain(function (x) {
    return Task.of(transform(x));
  }, task);
});

/**
 * @description Run a function contained in an Apply on a value
 * contained in a Task.
 * @memberof Task
 * @since 1.0.0-beta
 * @function ap
 * @static
 * @implements Apply
 * @example
 * // ap :: Apply (b -> c) -> Task a b -> Task a c
 * import { Task } from 'zoomjs';
 *
 * Task.ap(Task.of(x => x + x), Task.of(1)) // Task(null, 2)
 *
 * @param  {Apply<function>} apply The Apply containing a function
 * @param  {Task<A, B>} task The task
 * @return {Task<A, C>}
 */
Task.ap = (0, _curry2.default)(function (apply, task) {
  return Task.chain(function (transform) {
    return task.map(transform);
  }, apply);
});

/**
 * @description Convert a Task to a Promise. This implicitely calls "fork"
 * @memberof Task
 * @since 1.0.0-beta
 * @function toPromise
 * @static
 * @example
 * // toPromise :: Task a b -> Promise a b
 * import { Task } from 'zoomjs';
 * import Promise from 'bluebird';
 *
 * Task.toPromise(Task.of(1)); // Promise(1)
 * Task.toPromise(Task.of(1), Promise) // Bluebird(1)
 *
 * @param  {Task} task The task to convert
 * @param  {Function} [Promise=global.Promise] The promise constructor
 * @return {Promise}
 */
Task.toPromise = function (task) {
  var Promise = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : global.Promise;
  return new Promise(function (resolve, reject) {
    return task.fork(reject, resolve);
  });
};

/**
 * @description Define a function to run if the Task is rejected, which will
 * accept the error and return a new, valid Task.
 * @memberof Task
 * @since 1.0.0-beta
 * @function recover
 * @static
 * @example
 * // recover :: (a -> Task d c) -> Task a b -> Task d c
 * import { Task } from 'zoomjs';
 *
 * const rejected = Task.reject(1); // Task(1, null)
 * Task.recover(err => Task.of('Recovered!'), rejected); // Task(null, 'Recovered!')
 *
 * @param  {Function} transform The function to run.
 * @param  {Task} task The task
 * @return {Task}
 */
Task.recover = (0, _curry2.default)(function (transform, task) {
  return Task(function (reject, resolve) {
    return task.fork(function (error) {
      return transform(error).fork(reject, resolve);
    }, resolve);
  });
});

/**
 * @description Run many Tasks in parallel. If any Task rejects, it will
 * reject the top level Task immediately.
 * @memberof Task
 * @since 1.0.0-beta
 * @function parallel
 * @static
 * @example
 * // parallel :: [Task a b] -> Task a [b]
 * import { Task } from 'zoomjs';
 *
 * const tasks = Task
 *   .parallel([
 *     Task.of(1),
 *     Task.of(2),
 *   ])
 *   .map((results) => {
 *     results; // [1, 2]
 *   });
 *
 * @param  {Array<Task>} tasks The tasks to run.
 * @return {Task}
 */
Task.parallel = function (tasks) {
  return Task(function (reject, resolve) {
    // The number of pending tasks.
    var remaining = tasks.length;

    // Create the results array.
    var results = Array(tasks.length);

    // Fork each task
    tasks.forEach(function (task, idx) {
      task.fork(reject, function (value) {
        // Decrement the pending count
        remaining -= 1;

        // Store the value in the results array at the same
        // index the task was in.
        results[idx] = value;

        // Resolve if all tasks are done.
        if (remaining === 0) resolve(results);
      });
    });
  });
};

/**
 * @description Convert a regular function into a function that returns
 * a task.
 * @memberof Task
 * @since 1.0.0-beta
 * @function lift
 * @static
 * @example
 * // lift :: (a -> b) -> (a -> Task b)
 * import { Task } from 'zoomjs';
 *
 * const addTask = Task.lift((a, b) => a + b);
 *
 * addTask(1, 4); // Task(null, 5)
 *
 * @param  {Function} transform The function to convert.
 * @return {Function}
 */
Task.lift = function (func) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return Task(function (_, resolve) {
      return resolve(func.apply(undefined, args));
    });
  };
};

/**
 * @description Convert a node style callback into a function that returns
 * a task.
 * @memberof Task
 * @since 1.0.0-beta
 * @function liftNode
 * @static
 * @example
 * // liftNode :: (a, (b, c) -> d) -> (a -> Task b c)
 * import fs from 'fs';
 * import { Task } from 'zoomjs';
 *
 * const readFile = Task.liftNode(fs.readFile);
 *
 * readFile('foo.js'); // Task(Error, Buffer)
 *
 * @param  {Function} func The function to convert.
 * @return {Function}
 */
Task.liftNode = function (func) {
  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return Task(function (reject, resolve) {
      return func.apply(undefined, args.concat([function (error, data) {
        if (error) {
          return reject(error);
        }
        return resolve(data);
      }]));
    });
  };
};

/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

/**
* @description Run a function that returns a nested task and flatten
* the result into a single task. An alias for {@link Task#andThen}
* @memberof Task
* @since 1.0.0-beta
* @see {@link Task#andThen}
* @method
* @instance
* @implements Chain
* @example
* // chain Task a b :: (b -> Task a c) -> Task a c
* import { Task } from 'zoomjs';
*
* Task.of(1).chain(x => Task.of(x + x)); // Task(null, 2)
*
* @param  {Function} transform The function to run.
* @return {Task}
*/
Task.prototype.chain = function chain(transform) {
  return Task.chain(transform, this);
};

/**
* @description Run a function that returns a nested task and flatten
* the result into a single task. An alias for {@link Task#chain}
* @memberof Task
* @since 1.0.0-beta
* @see {@link Task#chain}
* @method
* @instance
* @example
* // andThen Task a b :: (b -> Task a c) -> Task a c
* import { Task } from 'zoomjs';
*
* Task.of(1).andThen(x => Task.of(x + x)); // Task(null, 2)
*
* @param  {Function} transform The function to run.
* @return {Task}
*/
Task.prototype.andThen = function andThen(transform) {
  return Task.chain(transform, this);
};

/**
* @description Run a function on a value contained in a Task.
* @memberof Task
* @since 1.0.0-beta
* @method
* @instance
* @implements Functor
* @example
* // map Task a b :: (b -> c) -> Task a c
* import { Task } from 'zoomjs';
*
* Task.of(1).map(x => x + x); // Task(null, 2)
*
* @param  {Function} transform The function to run.
* @return {Task}
*/
Task.prototype.map = function map(transform) {
  return Task.map(transform, this);
};

/**
 * @description Run a function contained in an Apply on a value
 * contained in a Task.
 * @memberof Task
 * @since 1.0.0-beta
 * @method
 * @instance
 * @implements Apply
 * @example
 * // ap Task a b :: Apply (b -> c) -> Task a c
 * import { Task } from 'zoomjs';
 *
 * Task.of(1).ap(Task.of(x => x + x));
 * // => Task(null, 2)
 *
 * @this Task
 * @param  {Apply<function>} apply The Apply containing a function
 * @return {Task<A, C>}
 */
Task.prototype.ap = function ap(apply) {
  return Task.ap(apply, this);
};

/**
* @description Convert a Task to a Promise. This implicitely calls "fork"
* @memberof Task
* @since 1.0.0-beta
* @method
* @instance
* @example
* // map Task a b :: c -> Promise a b
* import { Task } from 'zoomjs';
*
* Task.of(1).toPromise(); // Promise(1)
*
* @param  {Function} [Promise=global.Promise] The promise constructor
* @return {Promise}
*/
Task.prototype.toPromise = function toPromise() {
  var Promise = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : global.Promise;

  return Task.toPromise(this, Promise);
};

/**
* @description Define a function to run if the Task is rejected, which will
* accept the error and return a new, valid Task.
* @memberof Task
* @since 1.0.0-beta
* @method
* @instance
* @example
* // map Task a b :: (a -> Task c d) -> Task c d
* import { Task } from 'zoomjs';
*
* const rejected = Task.reject(1); // Task(1, null)
* rejected.recover(err => Task.of('Recovered!')); // Task(null, 'Recovered!')
*
* @param  {Function} transform The function to run.
* @return {Task}
*/
Task.prototype.recover = function recover(transform) {
  return Task.recover(transform, this);
};

exports.default = Task;
module.exports = exports['default'];