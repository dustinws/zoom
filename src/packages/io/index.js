import FL from 'fantasy-land';
import IO from './IO';

// IO Applicative
IO[FL.of] = IO.of;
IO.prototype[FL.of] = IO.prototype.of;

// IO Chain
IO[FL.chain] = IO.chain;
IO.prototype[FL.chain] = IO.prototype.chain;

// IO Functor
IO[FL.map] = IO.map;
IO.prototype[FL.map] = IO.prototype.map;

// IO Apply
IO[FL.ap] = IO.ap;
IO.prototype[FL.ap] = IO.prototype.ap;

export default IO;
