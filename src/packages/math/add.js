import curry from '../core/curry';

/**
 * A curried wrapper around the addition computation.
 *
 * @param  {Number} left
 * @param  {Number} right
 * @return {Number}
 */
export default curry((left, right) => left + right);
