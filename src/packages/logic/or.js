import curry from '../core/curry';

/**
 * A curried wrapper around the logical || operator.
 *
 * @param  {Any} left
 * @param  {Any} right
 * @return {Any}
 */
export default curry((left, right) => left || right);
