/* global describe, expect, test */
import rejectWhere from '../rejectWhere';

describe('Zoom.Data.List.rejectWhere', () => {
  test('It remove all elements that match the query', () => {
    const list = [{ a: 1 }, { a: 2 }, { a: 2 }, { a: 1 }];

    const results = rejectWhere({ a: 1 }, list);

    expect(results).toEqual([{ a: 2 }, { a: 2 }]);
  });
});
