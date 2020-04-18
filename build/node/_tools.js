// A functional placeholder.
const __ = { '@@functional/placeholder': true };

// Determine if an object is the placeholder.
// Don't rely on === so we can maintain compatibility with other libraries.
const _isPlaceholder = value =>
  value['@@functional/placeholder'];

// Determine if a list contains the placeholder.
const _hasPlaceholder = list =>
  !!list.find(_isPlaceholder);

// Create a curried function
const curry = fn =>
  function curried(...a) {
    if (a.length === fn.length && !_hasPlaceholder(a))
      return fn(...a);

    return (...b) =>
      // eslint-disable-next-line no-confusing-arrow
      curried(...a.map(x => _isPlaceholder(x) ? b.shift() : x).concat(b));
  };

// Create a function that always returns the given value.
const always = value => () => value;

// Create a left to right composition.
const pipe = (...fns) => initialValue =>
  fns.reduce((a, b) => b(a), initialValue);

// Create a right to left composition.
const compose = (...fns) =>
  pipe(...fns.reverse());

// Add two numbers together.
const add = curry((a, b) => a + b);

// Multiply two numbers together.
const multiply = curry((a, b) => a * b);


module.exports = {
  __,
  always,
  curry,
  compose,
  pipe,
  add,
  multiply,
};
