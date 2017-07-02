import { tag } from '../adt';

/**
 * The Task data type.
 */
const Task = tag('Task', 'fork');

/**
 * Implement Static Applicative
 *
 * @param  {B} value
 * @return {Task<A, B>}
 */
Task.of = value =>
  Task((_, resolve) => resolve(value));

/**
 * Implement Static Applicative for rejections
 *
 * @param  {B} value
 * @return {Task<A, B>}
 */
Task.reject = value =>
  Task(reject => reject(value));

/**
 * Implement Applicative
 *
 * @param  {B} value
 * @return {Task<A, B>}
 */
Task.prototype.of = function of(value) {
  return Task.of(value);
};

/**
 * Implement Chain
 *
 * @param  {Function} transform
 * @return {Task<A, C>}
 */
Task.prototype.chain = function chain(transform) {
  return Task((reject, resolve) =>
    this.fork(reject, value =>
      transform(value).fork(reject, resolve)));
};

/**
 * Implement Functor
 *
 * @param  {Function} transform
 * @return {Task<A, C>}
 */
Task.prototype.map = function map(transform) {
  return this.chain(x => Task.of(transform(x)));
};

/**
 * Convert a Task instance to a Promise. This will fork the Task.
 *
 * @param  {Function}
 * @return {Promise}
 */
Task.prototype.toPromise = function toPromise(Promise = global.Promise) {
  return new Promise((resolve, reject) =>
    this.fork(reject, resolve));
};

/**
 * Allow the consumer to handle a potential rejection and return
 * a new valid Task.
 *
 * @param  {Function} transform
 * @return {Task}
 */
Task.prototype.recover = function recover(transform) {
  return Task((reject, resolve) =>
    this.fork(error =>
      transform(error).fork(reject, resolve), resolve));
};

/**
 * Run multiple tasks at the same time. Resolve with an array of the
 * resolved values, or reject with the first error to occurr.
 *
 * @param  {Task<A, B>[]} tasks
 * @return {Task<A, B>}
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
 * Lift a regular function into a Task
 *
 * @param  {Function} func
 * @return {Function}
 */
Task.lift = func => (...args) =>
  Task((_, resolve) => resolve(func(...args)));

/**
 * Lift a node style function into a Task
 *
 * @param  {Function} func
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

export default Task;
