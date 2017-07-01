/* global describe, expect, test */
import { tag } from '..';

describe('ADT#tag(type, ...params)', () => {
  test('It should return a constructor function', () => {
    const T = tag('T');
    expect(new T() instanceof T).toBe(true);
  });

  test('It should not require the "new" keyworkd', () => {
    const T = tag('T');
    expect(T() instanceof T).toBe(true);
  });

  test('It should create a custom toString method', () => {
    const Point2D = tag('Point2D', 'x', 'y');
    expect(Point2D(0, 0).toString()).toEqual('Point2D(0, 0)');

    const Singleton = tag('Singleton');
    expect(Singleton().toString()).toEqual('Singleton');
  });
});
