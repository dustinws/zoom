/**
 * Create a function that always returns the initial value.
 *
 * @param  {Any} constantValue
 * @return {Function}
 */
module.exports = constantValue => () =>
  constantValue;
