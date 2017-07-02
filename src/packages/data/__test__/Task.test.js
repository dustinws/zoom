/* eslint arrow-body-style: 0 */
/* global describe, test, expect */
import Task from '../Task';

describe('data.Task', () => {
  test('Static Applicative', () => {
    expect(Task.of() instanceof Task).toBe(true);
  });

  test('Applicative', () => {
    expect(Task.of().of() instanceof Task).toBe(true);
  });

  test('Functor', () => {
    return Task
      .of('boom')
      .map(x => x.toUpperCase())
      .map((value) => {
        return expect(value).toBe('BOOM');
      })
      .toPromise();
  });

  test('Chain', () => {
    return Task
      .of('boom')
      .chain(x => Task.of(x.toUpperCase()))
      .map((value) => { // eslint-disable-line array-callback-return
        expect(value).toBe('BOOM');
      })
      .toPromise();
  });

  test('Task#toPromise()', () => {
    return Task
      .of('foo')
      .toPromise()
      .then((foo) => {
        expect(foo).toBe('foo');
      });
  });

  test('Task.parallel(tasks) success', () => {
    const tasks = [
      Task.of('foo'),
      Task.of('bar'),
      Task.of('baz'),
    ];

    return Task
      .parallel(tasks)
      .toPromise()
      .then((value) => {
        expect(value).toEqual(['foo', 'bar', 'baz']);
      });
  });

  test('Task.parallel(tasks) fail', () => {
    const tasks = [
      Task.of('foo'),
      Task.of('bar'),
      Task(reject => reject('error')),
    ];

    return Task
      .parallel(tasks)
      .toPromise()
      .catch((error) => {
        expect(error).toBe('error');
      });
  });

  test('Task.lift(function)', () => {
    const add = (a, b) => a + b;
    const addTask = Task.lift(add);

    return addTask(1, 3)
      .toPromise()
      .then((value) => {
        expect(value).toBe(4);
      });
  });

  test('Task.liftNode(function) success', () => {
    const add = (a, b, cb) => cb(null, a + b);
    const addTask = Task.liftNode(add);

    return addTask(1, 3)
      .toPromise()
      .then((value) => {
        expect(value).toBe(4);
      });
  });

  test('Task.liftNode(function) failure', () => {
    const add = (a, b, cb) => cb('error');
    const addTask = Task.liftNode(add);

    return addTask(1, 3)
      .toPromise()
      .catch((error) => {
        expect(error).toBe('error');
      });
  });

  test('Task#reject', () => {
    return Task
      .reject('some-error')
      .toPromise()
      .catch((error) => {
        expect(error).toBe('some-error');
      });
  });

  test('Task#recover', () => {
    return Task
      .reject('some-value')
      .recover(Task.of)
      .toPromise()
      .then((value) => {
        expect(value).toBe('some-value');
      });
  });
});
