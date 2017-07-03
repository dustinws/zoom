import includes from '../data/list/includes';

/**
 * @memberof module:Zoom.Lambda
 * @description Create a function that only runs for arguments it hasn't
 * computed yet.
 * @since v1.0.0
 * @function memoize
 * @example
 * // memoize :: (a -> b) -> (a -> b)
 * import { memoize } from '@dustinws/zoom/packages/core';
 *
 * let count = 0;
 *
 * function someExpensiveOperation() {
 *   count += 1;
 *
 *   return count;
 * }
 *
 * const memoized = memoize(someExpensiveOperation);
 *
 * memoized(1); // 1
 * memoized(1); // 1
 * memoized(1); // 1
 * memoized(1); // 1
 *
 * count; // 1
 *
 * memoized(2); // 2
 * memoized(2); // 2
 * memoized(2); // 2
 * memoized(2); // 2
 *
 * count; // 2
 *
 * @param  {Any} value The value the memoize will return.
 * @return {Function}
 */
function memoize(func) {
  const memoized = (firstArg, ...rest) => {
    const [keys, vals] = memoized.cache;

    // If we've seen this argument before, just return the
    // cached result.
    if (includes(firstArg, keys)) {
      return vals[keys.indexOf(firstArg)];
    }

    // Otherwise, call the function and save the results.
    const result = func(firstArg, ...rest);
    memoized.cache[0].push(firstArg);
    memoized.cache[1].push(result);
    return result;
  };

  // Create the cache
  memoized.cache = [[], []];

  return memoized;
}

export default memoize;
