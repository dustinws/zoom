import FL from 'fantasy-land';
import Result from './Result';

// Result Applicative
Result[FL.of] = Result.of;

// Result Chain
Result[FL.chain] = Result.chain;
Result.prototype[FL.chain] = Result.prototype.chain;

// Result Functor
Result[FL.map] = Result.map;
Result.prototype[FL.map] = Result.prototype.map;

// Result Apply
Result[FL.ap] = Result.ap;
Result.prototype[FL.ap] = Result.prototype.ap;


// Ok Applicative
Result.Ok[FL.of] = Result.Ok.of;
Result.Ok.prototype[FL.of] = Result.Ok.prototype.of;

// Result.Ok Chain
Result.Ok[FL.chain] = Result.Ok.chain;
Result.Ok.prototype[FL.chain] = Result.Ok.prototype.chain;

// Result.Ok Functor
Result.Ok[FL.map] = Result.Ok.map;
Result.Ok.prototype[FL.map] = Result.Ok.prototype.map;

// Result.Ok Apply
Result.Ok[FL.ap] = Result.Ok.ap;
Result.Ok.prototype[FL.ap] = Result.Ok.prototype.ap;


// Err Applicative
Result.Err[FL.of] = Result.Err.of;
Result.Err.prototype[FL.of] = Result.Err.prototype.of;

// Result.Err Chain
Result.Err[FL.chain] = Result.Err.chain;
Result.Err.prototype[FL.chain] = Result.Err.prototype.chain;

// Result.Err Functor
Result.Err[FL.map] = Result.Err.map;
Result.Err.prototype[FL.map] = Result.Err.prototype.map;

// Result.Err Apply
Result.Err[FL.ap] = Result.Err.ap;
Result.Err.prototype[FL.ap] = Result.Err.prototype.ap;


export default Result;
