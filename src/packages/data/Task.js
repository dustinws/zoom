import { tag } from '../adt';
import curry from '../lambda/curry';

/**
 * @class Task
 * @memberof module:Zoom.Data
 */
const Task = tag('Task', 'fork');


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
Task.of = value =>
  Task((_, resolve) => resolve(value));

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
Task.reject = value =>
  Task(reject => reject(value));

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
Task.chain = curry((transform, task) =>
  Task((reject, resolve) =>
    task.fork(reject, value =>
      transform(value).fork(reject, resolve))));

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
Task.map = curry((transform, task) =>
  Task.chain(x => Task.of(transform(x)), task));

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
Task.toPromise = (task, Promise = global.Promise) =>
  new Promise((resolve, reject) =>
    task.fork(reject, resolve));

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
Task.recover = ((transform, task) =>
  Task((reject, resolve) =>
    task.fork(error =>
      transform(error).fork(reject, resolve), resolve)));

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
Task.parallel = tasks =>
  Task((reject, resolve) => {
    // The number of pending tasks.
    let remaining = tasks.length;

    // Create the results array.
    const results = Array(tasks.length);

    // Fork each task
    tasks.forEach((task, idx) => {
      task.fork(reject, (value) => {
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
Task.lift = func => (...args) =>
  Task((_, resolve) => resolve(func(...args)));

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
Task.liftNode = func => (...args) =>
  Task((reject, resolve) =>
    func(...args, (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data);
    }));


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
Task.prototype.toPromise = function toPromise(Promise = global.Promise) {
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

export default Task;
