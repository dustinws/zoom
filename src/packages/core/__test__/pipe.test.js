/* global describe, expect, test */
import pipe from '../pipe';

const add = a => b => a + b;
const sq = a => a * a;

describe('core.pipe(value)', () => {
  test('It should return a function', () => {
    expect(typeof pipe(() => {})).toBe('function');
  });

  test('It create a left to right composition', () => {
    const main = pipe(add(1), sq);

    expect(main(4)).toBe(25);
  });
});
