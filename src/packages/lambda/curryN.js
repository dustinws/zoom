import __ from './__';

/**
 * Create a curried function with the given arity.
 *
 * @param  {Number} arity
 * @param  {Function} func
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
