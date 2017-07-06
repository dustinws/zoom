import FL from 'fantasy-land';
import Reader from './Reader';

// Reader Applicative
Reader[FL.of] = Reader.of;

// Reader Chain
Reader[FL.chain] = Reader.chain;
Reader.prototype[FL.chain] = Reader.prototype.chain;

// Reader Functor
Reader[FL.map] = Reader.map;
Reader.prototype[FL.map] = Reader.prototype.map;

// Reader Apply
Reader[FL.ap] = Reader.ap;
Reader.prototype[FL.ap] = Reader.prototype.ap;

export default Reader;
