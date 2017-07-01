const curryN = require('./curryN');

/**
 * Create a curried function from a regular function.
 *
 * @param  {Function} func
 * @return {Function}
 */
module.exports = func =>
  curryN(func.length, func);
