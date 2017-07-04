import FL from 'fantasy-land';
import Task from './Task';

// Task Applicative
Task[FL.of] = Task.of;
Task.prototype[FL.of] = Task.prototype.of;

// Task Chain
Task[FL.chain] = Task.chain;
Task.prototype[FL.chain] = Task.prototype.chain;

// Task Functor
Task[FL.map] = Task.map;
Task.prototype[FL.map] = Task.prototype.map;


export default Task;
