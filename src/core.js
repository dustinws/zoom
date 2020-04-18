const { curry } = require('./_tools');


// liftA2 :: Monad m => (a -> b -> c) -> m a -> m b -> m c
exports.liftA2 = curry((callback, a1, a2) =>
  a1.chain(a =>
    a2.map(b =>
      callback(a, b))));

// liftA3 :: Monad m => (a -> b -> c -> d) -> m a -> m b -> m c -> m d
exports.liftA3 = curry((callback, a1, a2, a3) =>
  a1.chain(a =>
    a2.chain(b =>
      a3.map(c =>
        callback(a, b, c)))));

// liftA3 :: Monad m => (a -> b -> c -> d -> e) -> m a -> m b -> m c -> m d -> m e
exports.liftA4 = curry((callback, a1, a2, a3, a4) =>
  a1.chain(a =>
    a2.chain(b =>
      a3.chain(c =>
        a4.map(d =>
          callback(a, b, c, d))))));

exports.cata = curry((arg, object) =>
  object.cata(arg));

exports.caseOf = curry((arg, object) =>
  object.caseOf(arg));

exports.andThen = curry((arg, object) =>
  object.andThen(arg));
