import FL from 'fantasy-land';
import Tuple from './Tuple';

// Tuple Applicative
Tuple[FL.equals] = Tuple.equals;
Tuple.prototype[FL.equals] = Tuple.prototype.equals;

// Tuple Functor
Tuple[FL.map] = Tuple.map;
Tuple.prototype[FL.map] = Tuple.prototype.map;


export default Tuple;
