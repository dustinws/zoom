/* global describe, test, expect */

import Task from '../../src/task';

describe('Data.Task', () => {
  describe('Task.lift', () => {
    test('It should convert a regular function into a function that returns a task', () => {
      const add = (a, b) => a + b;
      const addTask = Task.lift(add);

      return Task
        .toPromise(addTask(1, 3))
        .then((value) => {
          expect(value).toBe(4);
        });
    });
  });
});
