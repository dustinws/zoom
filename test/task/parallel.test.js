/* global describe, test, expect */

const Task = require('../../src/task');

describe('Data.Task', () => {
  describe('Task.parallel', () => {
    test('It should resolve with an array of the resolved values', () => {
      const tasks = [
        Task.of('foo'),
        Task.of('bar'),
        Task.of('baz'),
      ];

      return Task
        .toPromise(Task.parallel(tasks))
        .then((value) => {
          expect(value).toEqual(['foo', 'bar', 'baz']);
        });
    });

    test('It should reject with the first error to occur', () => {
      const tasks = [
        Task.of('foo'),
        Task.of('bar'),
        Task.reject('baz'),
      ];

      return Task
        .toPromise(Task.parallel(tasks))
        .catch((value) => {
          expect(value).toEqual('baz');
        });
    });

    test('it should only call "reject" once', () => {
      let calls = 0;
      const rejectHandler = () => {
        calls += 1;

        if (calls > 1) {
          throw new Error('Called too many times.');
        }
      };
      const fail = () =>
        Task(reject => reject('bar'));

      const tasks = [
        Task.of('foo'),
        fail(),
        fail(),
      ];

      return Task
        .parallel(tasks)
        .fork(rejectHandler, () => {});
    });
  });
});
