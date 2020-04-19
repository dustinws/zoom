/* global describe, test, expect */

const Task = require('../../src/task');

describe('Data.Task', () => {
  describe('Task.liftPromise', () => {
    test('It should convert a node style function into a function that returns a task', () => {
      const add = (a, b) =>
        Promise.resolve(a + b);

      const addTask = Task.liftPromise(add);

      return Task
        .toPromise(addTask(1, 4))
        .then((value) => {
          expect(value).toBe(5);
        });
    });

    test('It should reject with the error if there was one', () => {
      const add = () =>
        Promise.reject('error');

      const addTask = Task.liftPromise(add);

      return Task
        .toPromise(addTask(1, 4))
        .catch((error) => {
          expect(error).toBe('error');
        });
    });
  });
});
