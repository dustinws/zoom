/* global describe, test, expect */

const Task = require('../../src/task');

describe('Data.Task', () => {
  describe('Task.fork', () => {
    test('Successful forks', () =>
      new Promise((resolve, reject) => {
        Task.fork(reject, resolve, Task.of('Wassup?'));
      })
        .then((result) => {
          expect(result).toBe('Wassup?');
        }));

    test('Unsuccessful forks', () =>
      new Promise((resolve, reject) => {
        Task.fork(reject, resolve, Task.reject('Wassup?'));
      })
        .catch((result) => {
          expect(result).toBe('Wassup?');
        }));
  });
});
