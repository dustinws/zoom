/* global describe, expect, test */
import branch from '../branch';
import constant from '../../core/constant';

describe('core.branch', () => {
  test('It call the second function if the predicate returns truthy', () => {
    const main = branch(
      n => n < 5,
      constant('True'),
      constant('False'),
    );

    expect(main(3)).toBe('True');
  });

  test('It call the third function if the predicate returns falsy', () => {
    const main = branch(
      n => n < 5,
      constant('True'),
      constant('False'),
    );

    expect(main(5)).toBe('False');
  });
});
