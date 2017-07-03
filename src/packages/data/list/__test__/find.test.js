/* global describe, expect, test */
import find from '../find';

describe('Zoom.Data.List.find', () => {
  test('It should return the first element that satisfies the predicate in a Just', () => {
    const list = [{ a: 1 }, { a: 2 }, { a: 2 }, { a: 1 }];
    const result = find(x => x.a === 1, list);

    expect(result.isJust()).toBe(true);
    expect(result.value).toBe(list[0]);
  });

  test('It should return the first element that satisfies the predicate', () => {
    const list = [{ a: 1 }, { a: 2 }, { a: 2 }, { a: 1 }];
    const result = find(x => x.a === 3, list);

    expect(result.isNothing()).toBe(true);
  });
});
