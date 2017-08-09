import fl from 'fantasy-land';
import __ from 'ramda/src/__';
import curry from 'ramda/src/curry';

import Tuple from './tuple';
import { tag } from './adt';


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

// Writer Applicative
Writer[fl.of] = Writer.of;

// Writer Chain
Writer[fl.chain] = Writer.chain;
Writer.prototype[fl.chain] = Writer.prototype.chain;

// Writer Functor
Writer[fl.map] = Writer.map;
Writer.prototype[fl.map] = Writer.prototype.map;

// Writer Apply
Writer[fl.ap] = Writer.ap;
Writer.prototype[fl.ap] = Writer.prototype.ap;


module.exports = Writer;
