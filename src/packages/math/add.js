const curry = require('../lambda/curry');

/**
 * A curried wrapper around the addition computation.
 *
 * @param  {Number} left
 * @param  {Number} right
 * @return {Number}
 */
module.exports = curry((left, right) =>
  left + right);
