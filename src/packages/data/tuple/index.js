import FL from 'fantasy-land';
import Tuple from './Tuple';

// Tuple Applicative
Tuple[FL.of] = Tuple.of;
Tuple.prototype[FL.of] = Tuple.prototype.of;

// Tuple Functor
Tuple[FL.map] = Tuple.map;
Tuple.prototype[FL.map] = Tuple.prototype.map;


export default Tuple;
