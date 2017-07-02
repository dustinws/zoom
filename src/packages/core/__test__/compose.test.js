/* global describe, expect, test */
import compose from '../compose';

const add = a => b => a + b;
const sq = a => a * a;

describe('core.compose(value)', () => {
  test('It should return a function', () => {
    expect(typeof compose(() => {})).toBe('function');
  });

  test('It create a left to right composition', () => {
    const main = compose(add(1), sq);

    expect(main(4)).toBe(17);
  });
});
