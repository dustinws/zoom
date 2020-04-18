const FL = require('fantasy-land');

const Tuple = require('./tuple');
const { tag } = require('./adt');
const { __, curry } = require('./_tools');


const Writer = tag('Writer', 'value');


/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// of :: a -> Writer w a
Writer.of = value =>
  Writer(Tuple(value, []));

// tell :: w -> Writer w a -> Writer w a
Writer.tell = curry((value, writer) =>
  Writer(Tuple(Tuple.fst(writer.value), Tuple.snd(writer.value).concat(value))));

// chain :: (a -> Writer w b) -> Writer w a -> Writer w b
Writer.chain = curry((transform, writer) => {
  const [value, currentLogs] = writer.value;
  const [newVal, newLogs] = transform(value).value;

  return Writer(Tuple(newVal, currentLogs.concat(newLogs)));
});

// andThen :: (a -> Writer w b) -> Writer w a -> Writer w b
Writer.andThen = Writer.chain;

// map :: (a -> b) -> Writer w a -> Writer w b
Writer.map = curry((transform, writer) =>
  Writer.chain(x => Writer.of(transform(x)), writer));

// ap :: Apply (a -> b) -> Writer w a -> Writer w b
Writer.ap = curry((apply, writer) =>
  Writer.chain(Writer.map(__, writer), apply));


/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

// of :: Writer w a ~> b -> Writer w b
Writer.prototype.of = function of(value) {
  return Writer.of(value);
};

// chain :: Writer w a ~> (a -> Writer w b) -> Writer w b
Writer.prototype.chain = function chain(transform) {
  return Writer.chain(transform, this);
};

// andThen :: Writer w a ~> (a -> Writer w b) -> Writer w b
Writer.prototype.andThen = Writer.prototype.chain;

// tell :: Writer w a ~> w -> Writer w a
Writer.prototype.tell = function tell(log) {
  return Writer.tell(log, this);
};

// map :: Writer w a ~> (a -> b) -> Writer w b
Writer.prototype.map = function map(transform) {
  return Writer.map(transform, this);
};

// ap :: Writer w a ~> Apply (a -> b) -> Writer w b
Writer.prototype.ap = function ap(apply) {
  return Writer.ap(apply, this);
};

/*
|------------------------------------------------------------------------------
| Fantasy Land
|------------------------------------------------------------------------------
*/

// Static Monad
Writer[FL.of] = Writer.of;
Writer[FL.chain] = Writer.chain;
Writer[FL.map] = Writer.map;
Writer[FL.ap] = Writer.ap;

// Instance Monad
Writer.prototype[FL.of] = Writer.prototype.of;
Writer.prototype[FL.chain] = Writer.prototype.chain;
Writer.prototype[FL.map] = Writer.prototype.map;
Writer.prototype[FL.ap] = Writer.prototype.ap;


module.exports = Writer;
