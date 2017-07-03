import __ from './__';

/**
 * @memberof module:Zoom.Lambda
 * @description Convert a non-curried function with the given arity to
 * a curried function. This includes compatibility with "core.__".
 * @since v2.0.0
 * @function curryN
 * @example
 * import { curryN } from '@dustinws/zoom/packages/core';
 *
 * const add = curryN(2, (a, b) => a + b);
 *
 * add(1, 4); // 5
 * add(1)(4); // 5
 * add(1); // [Function]
 * add(1)(); // [Function]
 *
 * @param  {Number} arity The number of arguments the function expects
 * @param  {Function} func The function to curry
 * @return {Function}
 */
function curryN(arity, func) {
  return function curried(...as) {
    if (as.length >= arity && as.indexOf(__) < 0) {
      return func(...as);
    }
    return (...bs) =>
      // eslint-disable-next-line no-confusing-arrow
      curried(...as.map(x => x === __ ? bs.shift() : x).concat(bs));
  };
}

export default curryN(2, curryN);
