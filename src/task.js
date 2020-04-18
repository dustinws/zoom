const FL = require('fantasy-land');

const { tag } = require('./adt');
const { curry } = require('./_tools');


const Task = tag('Task', 'fork');


/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// of :: b -> Task a b
Task.of = value =>
  Task((_, resolve) => resolve(value));

// of :: a -> Task a b
Task.reject = value =>
  Task(reject => reject(value));

// fork :: (a -> c) -> (b -> c) -> Task a b -> d
Task.fork = curry((reject, resolve, task) =>
  task.fork(reject, resolve));

// chain :: (b -> Task a c) -> Task a b -> Task a c
Task.chain = curry((transform, task) =>
  Task((reject, resolve) =>
    task.fork(reject, value =>
      transform(value).fork(reject, resolve))));

// andThen :: (b -> Task a c) -> Task a b -> Task a c
Task.andThen = Task.chain;

// map :: (b -> c) -> Task a b -> Task a c
Task.map = curry((transform, task) =>
  Task.chain(x => Task.of(transform(x)), task));

// ap :: Apply (b -> c) -> Task a b -> Task a c
Task.ap = curry((apply, task) =>
  Task.chain(transform => task.map(transform), apply));

// toPromise :: Task a b -> Promise a b
Task.toPromise = (task, Promise = global.Promise) =>
  new Promise((resolve, reject) =>
    task.fork(reject, resolve));

// recover :: (a -> Task d c) -> Task a b -> Task d c
Task.recover = curry((transform, task) =>
  Task((reject, resolve) =>
    task.fork(error =>
      transform(error).fork(reject, resolve), resolve)));

// parallel :: [Task a b] -> Task a [b]
Task.parallel = tasks =>
  Task((reject, resolve) => {
    let remaining = tasks.length;
    let rejected = false;
    let rejectedError;

    // Create the results array.
    const results = Array(tasks.length);

    // Fork each task
    tasks.forEach((task, idx) => {
      task.fork((error) => {
        if (!rejected) {
          rejected = true;
          rejectedError = error;
          return reject(error);
        }

        return rejectedError;
      }, (value) => {
        // Decrement the pending count
        remaining -= 1;

        // Store the value in the results array at the same
        // index the task was in.
        results[idx] = value;

        // Resolve if all tasks are done.
        if (remaining === 0) resolve(results);
      });
    });
  });

// lift :: (a -> b) -> (a -> Task b)
Task.lift = func => (...args) =>
  Task((_, resolve) => resolve(func(...args)));

// liftNode :: (a, (b, c) -> d) -> (a -> Task b c)
Task.liftNode = func => (...args) =>
  Task((reject, resolve) =>
    func(...args, (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data);
    }));


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

// of :: Task a b ~> c -> Task f c
Task.prototype.of = function of(value) {
  return Task.of(value);
};

// chain :: Task a b ~> (b -> Task a c) -> Task a c
Task.prototype.chain = function chain(transform) {
  return Task.chain(transform, this);
};

// andThen :: Task a b ~> (b -> Task a c) -> Task a c
Task.prototype.andThen = Task.prototype.chain;

// map :: Task a b ~> (b -> c) -> Task a c
Task.prototype.map = function map(transform) {
  return Task.map(transform, this);
};

// ap :: Task a b ~> Apply (b -> c) -> Task a c
Task.prototype.ap = function ap(apply) {
  return Task.ap(apply, this);
};

// toPromise :: Task a b -> c -> Promise b
Task.prototype.toPromise = function toPromise(Promise = global.Promise) {
  return Task.toPromise(this, Promise);
};

// recover :: Task a b ~> (a -> Task d c) -> Task d c
Task.prototype.recover = function recover(transform) {
  return Task.recover(transform, this);
};

/*
 |------------------------------------------------------------------------------
 | Fantasy Land
 |------------------------------------------------------------------------------
 */

// Static Monad
Task[FL.of] = Task.of;
Task[FL.chain] = Task.chain;
Task[FL.map] = Task.map;
Task[FL.ap] = Task.ap;

// Instance Monad
Task.prototype[FL.of] = Task.prototype.of;
Task.prototype[FL.chain] = Task.prototype.chain;
Task.prototype[FL.map] = Task.prototype.map;
Task.prototype[FL.ap] = Task.prototype.ap;


module.exports = Task;
