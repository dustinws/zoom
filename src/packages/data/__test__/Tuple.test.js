/* global describe, expect, test */
import Tuple from '../Tuple';

describe('data.Tuple', () => {
  test('It should implement static Applicative', () => {
    expect(Tuple.of(1, 2) instanceof Tuple).toBe(true);
  });

  test('Tuple.fst(tuple)', () => {
    const tuple = Tuple(1, 2);

    expect(Tuple.fst(tuple)).toBe(1);
  });

  test('Tuple.snd(tuple)', () => {
    const tuple = Tuple(1, 2);

    expect(Tuple.snd(tuple)).toBe(2);
  });

  test('Tuple#map(transform)', () => {
    const tuple = Tuple(1, 2).map(x => x + 1);

    expect(Tuple.snd(tuple)).toBe(3);
  });

  test('Tuple#mapLeft(transform)', () => {
    const tuple = Tuple(1, 2).mapLeft(x => x + 1);

    expect(Tuple.fst(tuple)).toBe(2);
  });

  test('Tuple#toString()', () => {
    const tuple = Tuple(1, 2);

    expect(tuple.toString()).toBe('(1, 2)');
  });
});
