const { curry } = require('./_tools');


// liftA2 :: Monad m => (a -> b -> c) -> m a -> m b -> m c
const liftA2 = curry((callback, a1, a2) =>
  a1.chain(a =>
    a2.map(b =>
      callback(a, b))));

// liftA3 :: Monad m => (a -> b -> c -> d) -> m a -> m b -> m c -> m d
const liftA3 = curry((callback, a1, a2, a3) =>
  a1.chain(a =>
    a2.chain(b =>
      a3.map(c =>
        callback(a, b, c)))));

// liftA3 :: Monad m => (a -> b -> c -> d -> e) -> m a -> m b -> m c -> m d -> m e
const liftA4 = curry((callback, a1, a2, a3, a4) =>
  a1.chain(a =>
    a2.chain(b =>
      a3.chain(c =>
        a4.map(d =>
          callback(a, b, c, d))))));

const cata = curry((arg, object) =>
  object.cata(arg));

const caseOf = curry((arg, object) =>
  object.caseOf(arg));

// andThen :: Chain m => (a -> m b) -> m a -> m b
const andThen = curry((arg, object) =>
  object.andThen(arg));

// pipeC :: Chain m => ((a -> m b), (b -> m c), …, (y -> m z)) -> (a -> m z)
const pipeC = (...[first, ...rest]) => v =>
  rest.reduce((a, b) => a.chain(b), first(v));

// composeC :: Chain m => ((y -> m z), (x -> m y), …, (a -> m b)) -> (a -> m z)
const composeC = (...ms) =>
  pipeC(...ms.reverse());


module.exports = {
  liftA2,
  liftA3,
  liftA4,
  cata,
  caseOf,
  andThen,
  pipeC,
  composeC,
};
