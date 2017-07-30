import FL from 'fantasy-land';
import Writer from './Writer';

// Writer Applicative
Writer[FL.of] = Writer.of;

// Writer Chain
Writer[FL.chain] = Writer.chain;
Writer.prototype[FL.chain] = Writer.prototype.chain;

// Writer Functor
Writer[FL.map] = Writer.map;
Writer.prototype[FL.map] = Writer.prototype.map;

// Writer Apply
Writer[FL.ap] = Writer.ap;
Writer.prototype[FL.ap] = Writer.prototype.ap;

export default Writer;
