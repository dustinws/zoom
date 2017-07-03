/* eslint arrow-body-style: 0 */
/* global describe, test, expect */
import Task from '../Task';

describe('Zoom.Data.Task', () => {
  describe('Task.of', () => {
    test('It should create a new Task instance', () => {
      expect(Task.of() instanceof Task).toBe(true);
    });
  });

  describe('Task.reject', () => {
    test('It should create a new Task instance', () => {
      expect(Task.reject() instanceof Task).toBe(true);
    });
  });

  describe('Task.map', () => {
    test('It should call the function with the inner value.', () => {
      const task = Task.of('boom');
      const toUpper = x => x.toUpperCase();

      const result = Task.map(toUpper, task);

      return Task
        .toPromise(result)
        .then((value) => {
          expect(value).toBe('BOOM');
        });
    });
  });

  describe('Task.chain', () => {
    test('It should call the function and wait on the returned task.', () => {
      const task = Task.of('boom');
      const toUpper = Task.lift(x => x.toUpperCase());

      const result = Task.chain(toUpper, task);

      return Task
        .toPromise(result)
        .then((value) => {
          expect(value).toBe('BOOM');
        });
    });
  });

  describe('Task.andThen', () => {
    test('It should call the function and wait on the returned task.', () => {
      const task = Task.of('boom');
      const toUpper = Task.lift(x => x.toUpperCase());

      const result = Task.andThen(toUpper, task);

      return Task
        .toPromise(result)
        .then((value) => {
          expect(value).toBe('BOOM');
        });
    });
  });

  describe('Task.toPromise', () => {
    test('It should return a valid Promise', () => {
      expect(Task.toPromise(Task.of()) instanceof Promise).toBe(true);
    });
  });

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
  });

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

  describe('Task.recover', () => {
    test('It should allow you to convert a rejected Task into a resolved Task', () => {
      const task = Task.reject('some-value');

      return Task
        .toPromise(Task.recover(Task.of, task))
        .then((value) => {
          expect(value).toBe('some-value');
        });
    });
  });

  describe('Task#map', () => {
    test('It should call the function with the inner value.', () => {
      return Task
        .of('boom')
        .map(x => x.toUpperCase())
        .toPromise()
        .then((value) => {
          expect(value).toBe('BOOM');
        });
    });
  });

  describe('Task#chain', () => {
    test('It should call the function and wait on the returned task.', () => {
      return Task
        .of('boom')
        .chain(Task.lift(x => x.toUpperCase()))
        .toPromise()
        .then((value) => {
          expect(value).toBe('BOOM');
        });
    });
  });

  describe('Task#andThen', () => {
    test('It should call the function and wait on the returned task.', () => {
      return Task
        .of('boom')
        .andThen(Task.lift(x => x.toUpperCase()))
        .toPromise()
        .then((value) => {
          expect(value).toBe('BOOM');
        });
    });
  });

  describe('Task#toPromise', () => {
    test('It should return a valid Promise', () => {
      expect(Task.of().toPromise() instanceof Promise).toBe(true);
    });
  });

  describe('Task#recover', () => {
    test('It should allow you to convert a rejected Task into a resolved Task', () => {
      return Task
        .reject('some-value')
        .recover(Task.of)
        .toPromise()
        .then((value) => {
          expect(value).toBe('some-value');
        });
    });
  });
});
