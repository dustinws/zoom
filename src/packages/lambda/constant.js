/**
 * Create a function that always returns the initial value.
 *
 * @param  {Any} constantValue
 * @return {Function}
 */
export default function constant(value) {
  return () => value;
}
