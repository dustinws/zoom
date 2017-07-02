import tupleOf from './tupleOf';
import curryN from '../core/curryN';

/**
 * @memberof module:Zoom.Check
 * @description Guard a function's input / output types. Acts as a no-op,
 * but will log the TypeError to the console in development.
 * @since v1.14.0
 * @function guard
 * @example
 * import { guard, number } from '@dustinws/zoom/packages/check';
 *
 * const add = guard([number, number, number], (a, b) => a + b);
 *
 * add(1, 3) // 4
 * add(1, '3') // 13 (logs TypeError outside of production)
 *
 * @param {Array<Function>} contracts  Input / output contracts
 * @param {Function} func The function to validate
 * @param {...Any} args Arguments to apply the func with
 * @return {Any}
 */
const guard = (contracts, func, ...args) => {
  const returnType = contracts[contracts.length - 1];

  return tupleOf(contracts.slice(0, -1), args)
    .chain(() => returnType(func(...args)))
    .cata({
      Failure(error) {
        /* istanbul ignore next */
        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'testing') {
          console.log('[CheckError]', error); // eslint-disable-line no-console
        }
        return func(...args);
      },
      Success(value) {
        return value;
      },
    });
};

export default curryN(3, guard);
