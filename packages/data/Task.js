'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adt = require('../adt');

/**
 * The Task data type.
 */
var Task = (0, _adt.tag)('Task', 'fork');

/**
 * Implement Static Applicative
 *
 * @param  {B} value
 * @return {Task<A, B>}
 */
Task.of = function (value) {
  return Task(function (_, resolve) {
    return resolve(value);
  });
};

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
  var _this = this;

  return Task(function (reject, resolve) {
    return _this.fork(reject, function (value) {
      return transform(value).fork(reject, resolve);
    });
  });
};

/**
 * Implement Functor
 *
 * @param  {Function} transform
 * @return {Task<A, C>}
 */
Task.prototype.map = function map(transform) {
  return this.chain(function (x) {
    return Task.of(transform(x));
  });
};

/**
 * Convert a Task instance to a Promise. This will fork the Task.
 */
Task.prototype.toPromise = function toPromise() {
  var _this2 = this;

  return new Promise(function (resolve, reject) {
    return _this2.fork(reject, resolve);
  });
};

/**
 * Run multiple tasks at the same time. Resolve with an array of the
 * resolved values, or reject with the first error to occurr.
 *
 * @param  {Task<A, B>[]} tasks
 * @return {Task<A, B>}
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
 * Lift a regular function into a Task
 *
 * @param  {Function} func
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
 * Lift a node style function into a Task
 *
 * @param  {Function} func
 * @return {Function}
 */
Task.liftNode = function (func) {
  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return Task(function (reject, resolve) {
      return func.apply(undefined, args.concat([function (error, data) {
        if (error) return reject(error);
        return resolve(data);
      }]));
    });
  };
};

exports.default = Task;
module.exports = exports['default'];