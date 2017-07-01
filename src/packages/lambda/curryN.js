const __ = require('./__');

/**
 * Create a curried function with the given arity.
 *
 * @param  {Number} arity
 * @param  {Function} func
 * @return {Function}
 */
module.exports = (arity, func) =>
  function curried(...as) {
    if (as.length >= arity && as.indexOf(__) < 0) {
      return func(...as);
    }
    return (...bs) =>
      // eslint-disable-next-line no-confusing-arrow
      curried(...as.map(x => x === __ ? bs.shift() : x).concat(bs));
  };
