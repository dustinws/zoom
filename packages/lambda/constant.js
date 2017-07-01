"use strict";

/**
 * Create a function that always returns the initial value.
 *
 * @param  {Any} constantValue
 * @return {Function}
 */
module.exports = function (constantValue) {
  return function () {
    return constantValue;
  };
};