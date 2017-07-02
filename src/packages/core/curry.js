import curryN from './curryN';

/**
 * Create a curried function from a regular function.
 *
 * @param  {Function} func
 * @return {Function}
 */
export default function curry(func) {
  return curryN(func.length, func);
}
