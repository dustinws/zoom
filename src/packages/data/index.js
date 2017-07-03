/**
 * @namespace Data
 * @memberof module:Zoom
 * @description
 * This module contains common data structures and operations. Some structures
 * like `Record` and `List` just map to native javascript objects, while
 * others like `Tuple` and `Result` are custom types that expose their
 * own constructors.
 */

export { default as Either } from './either';
export { default as List } from './list';
export { default as Maybe } from './maybe';
export { default as Record } from './record';
export { default as Result } from './result';
export { default as Task } from './task';
export { default as Tuple } from './tuple';
export { default as Validation } from './validation';
