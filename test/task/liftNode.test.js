/* global describe, test, expect */

const Task = require('../../src/task');

describe('Data.Task', () => {
  describe('Task.liftNode', () => {
    test('It should convert a node style function into a function that returns a task', () => {
      const add = (a, b, cb) => cb(null, a + b);
      const addTask = Task.liftNode(add);

      return Task
        .toPromise(addTask(1, 4))
        .then((value) => {
          expect(value).toBe(5);
        });
    });

    test('It should reject with the error if there was one', () => {
      const add = (a, b, cb) => cb('error');
      const addTask = Task.liftNode(add);

      return Task
        .toPromise(addTask(1, 4))
        .catch((error) => {
          expect(error).toBe('error');
        });
    });
  });
});
