const curry = require('../lambda/curry');

/**
 * A curried wrapper around the logical && operator.
 *
 * @param  {Any} left
 * @param  {Any} right
 * @return {Any}
 */
module.exports = curry((left, right) =>
  left && right);
