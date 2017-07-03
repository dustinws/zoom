/* global describe, expect, test */
import filterWhere from '../filterWhere';

describe('Zoom.Data.List.filterWhere', () => {
  test('It should return all elements that match a query object', () => {
    const list = [{ a: 1 }, { a: 2 }, { a: 2 }, { a: 1 }];
    const query = { a: 1 };

    const results = filterWhere(query, list);

    expect(results.length).toBe(2);
    expect(results).toEqual([{ a: 1 }, { a: 1 }]);
  });

  test('It should return an empty array if there are no results', () => {
    const list = [{ a: 1 }, { a: 2 }, { a: 2 }, { a: 1 }];
    const query = { a: 3 };

    const results = filterWhere(query, list);

    expect(results.length).toBe(0);
    expect(results).toEqual([]);
  });
});
