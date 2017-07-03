/* global describe, expect, test */
import memoize from '../memoize';

describe('Zoom.Lambda.memoize', () => {
  test('It should only call the function once for a given argument', () => {
    let callCount = 0;
    const expensiveOp = memoize((value) => {
      callCount += 1;

      return value;
    });

    const aa = expensiveOp(1);
    const ab = expensiveOp(1);
    const ac = expensiveOp(1);

    expect(callCount).toBe(1);
    expect(aa).toBe(1);
    expect(ab).toBe(1);
    expect(ac).toBe(1);

    const ba = expensiveOp(2);
    const bb = expensiveOp(2);
    const bc = expensiveOp(2);

    expect(callCount).toBe(2);
    expect(ba).toBe(2);
    expect(bb).toBe(2);
    expect(bc).toBe(2);

    const ca = expensiveOp(3);
    const cb = expensiveOp(3);
    const cc = expensiveOp(3);

    expect(callCount).toBe(3);
    expect(ca).toBe(3);
    expect(cb).toBe(3);
    expect(cc).toBe(3);
  });
});
