import curry from 'ramda/src/curry';
import invoker from 'ramda/src/invoker';

// liftA2 :: Monad m => (a -> b -> c) -> m a -> m b -> m c
export const liftA2 = curry((callback, a1, a2) =>
  a1.chain(a =>
    a2.map(b =>
      callback(a, b))));

// liftA3 :: Monad m => (a -> b -> c -> d) -> m a -> m b -> m c -> m d
export const liftA3 = curry((callback, a1, a2, a3) =>
  a1.chain(a =>
    a2.chain(b =>
      a3.map(c =>
        callback(a, b, c)))));

// liftA3 :: Monad m => (a -> b -> c -> d -> e) -> m a -> m b -> m c -> m d -> m e
export const liftA4 = curry((callback, a1, a2, a3, a4) =>
  a1.chain(a =>
    a2.chain(b =>
      a3.chain(c =>
        a4.map(d =>
          callback(a, b, c, d))))));

export const cata = invoker(1, 'cata');
export const caseOf = invoker(1, 'caseOf');
export const andThen = invoker(1, 'andThen');
