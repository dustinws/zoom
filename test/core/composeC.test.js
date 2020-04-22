/* global describe, expect, test, jest */

const { composeC } = require('../../src/core');
const Task = require('../../src/task');


describe('Core.composeC', () => {
  test('It should call each function in sequence and provide the return value of the last as the input to the next.', () => {
    const resolveHandler = jest.fn();
    const rejectHandler = jest.fn();

    const add = a => b => Task.of(a + b);
    const multiply = a => b => Task.of(a * b);

    const computation = composeC(multiply(10), add(5));

    computation(1).fork(rejectHandler, resolveHandler);

    expect(rejectHandler).not.toHaveBeenCalled();
    expect(resolveHandler).toHaveBeenCalledWith(60);
  });

  test('If the type has unions that short circuit chaining, that instance should be propagated.', () => {
    const resolveHandler = jest.fn();
    const rejectHandler = jest.fn();

    const error = Task.reject('Error');
    const errorCreator = () => error;

    const funcA = jest.fn(Task.of);
    const funcB = jest.fn(Task.of);

    const computation = composeC(funcA, funcB, errorCreator);

    computation(1).fork(rejectHandler, resolveHandler);

    expect(resolveHandler).not.toHaveBeenCalled();
    expect(rejectHandler).toHaveBeenCalledWith('Error');

    expect(funcA).not.toHaveBeenCalled();
    expect(funcB).not.toHaveBeenCalled();
  });
});
