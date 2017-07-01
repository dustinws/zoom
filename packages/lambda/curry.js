'use strict';

var curryN = require('./curryN');

/**
 * Create a curried function from a regular function.
 *
 * @param  {Function} func
 * @return {Function}
 */
module.exports = function (func) {
  return curryN(func.length, func);
};