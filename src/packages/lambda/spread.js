import curry from './curry';

/**
 * @memberof module:Zoom.Lambda
 * @description Given a function and an array of values, apply the
 * array of values as parameters to the function.
 * @since v2.0.0
 * @function spread
 * @example
 * import { spread } from '@dustinws/zoom/lambda';
 *
 * Promise
 *   .all([
 *     lookupFileOne('one.txt'),
 *     lookupFileTwo('two.txt'),
 *     lookupFileThree('three.txt'),
 *   ])
 *   .then(
 *      spread((bufferOne, bufferTwo, bufferThree) => {
 *        // Do stuff with the buffers
 *      })
 *     );
 *
 * @param  {Function} func The function to run
 * @param  {Array<Any>} args The array to spread out
 * @return {Any}
 */
function spread(func, args) {
  return func(...args);
}

export default curry(spread);
