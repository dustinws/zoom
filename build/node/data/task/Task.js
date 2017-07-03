'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adt = require('../../adt');

var _curry = require('../../lambda/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class Task
 * @memberof module:Zoom.Data
 */
var Task = (0, _adt.tag)('Task', 'fork');

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

/**
 * @description Create a new Task with the given value.
 * @memberof module:Zoom.Data.Task
 * @since v1.15.0
 * @function of
 * @example
 * import { Task } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Task
 * @since v1.15.0
 * @function reject
 * @example
 * import { Task } from '@dustinws/zoom/data';
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
 * @description Run a function that returns a nested task and flatten
 * the result into a single task.
 * @memberof module:Zoom.Data.Task
 * @since v1.15.0
 * @function chain
 * @example
 * import { Task } from '@dustinws/zoom/data';
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
 * @description Run a function on a value contained in a Task.
 * @memberof module:Zoom.Data.Task
 * @since v1.15.0
 * @function map
 * @example
 * import { Task } from '@dustinws/zoom/data';
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
 * @description Convert a Task to a Promise. This implicitely calls "fork"
 * @memberof module:Zoom.Data.Task
 * @since v1.15.0
 * @function toPromise
 * @example
 * import { Task } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Task
 * @since v1.15.0
 * @function recover
 * @example
 * import { Task } from '@dustinws/zoom/data';
 *
 * const rejected = Task.reject(1); // Task(1, null)
 * Task.recover(err => Task.of('Recovered!'), rejected); // Task(null, 'Recovered!')
 *
 * @param  {Function} transform The function to run.
 * @param  {Task} task The task
 * @return {Task}
 */
Task.recover = function (transform, task) {
  return Task(function (reject, resolve) {
    return task.fork(function (error) {
      return transform(error).fork(reject, resolve);
    }, resolve);
  });
};

/**
 * @description Run many Tasks in parallel. If any Task rejects, it will
 * reject the top level Task immediately.
 * @memberof module:Zoom.Data.Task
 * @since v1.15.0
 * @function parallel
 * @example
 * import { Task } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Task
 * @since v1.15.0
 * @function lift
 * @example
 * import { Task } from '@dustinws/zoom/data';
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
 * @memberof module:Zoom.Data.Task
 * @since v1.15.0
 * @function liftNode
 * @example
 * import fs from 'fs';
 * import { Task } from '@dustinws/zoom/data';
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
* the result into a single task.
* @memberof module:Zoom.Data.Task
* @since v1.15.0
* @example
* import { Task } from '@dustinws/zoom/data';
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
* @description Run a function on a value contained in a Task.
* @memberof module:Zoom.Data.Task
* @since v1.15.0
* @example
* import { Task } from '@dustinws/zoom/data';
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
* @description Convert a Task to a Promise. This implicitely calls "fork"
* @memberof module:Zoom.Data.Task
* @since v1.15.0
* @example
* import { Task } from '@dustinws/zoom/data';
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
* @memberof module:Zoom.Data.Task
* @since v1.15.0
* @example
* import { Task } from '@dustinws/zoom/data';
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