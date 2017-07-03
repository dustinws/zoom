/**
 * @namespace Data
 * @memberof module:Zoom
 * @description
 * This module contains common data structures and operations. Some structures
 * like `Record` and `List` just map to native javascript objects, while
 * others like `Tuple` and `Result` are custom types that expose their
 * own constructors.
 */

export { default as Either } from './Either';
export { default as List } from './list';
export { default as Maybe } from './Maybe';
export { default as Record } from './record';
export { default as Result } from './Result';
export { default as Task } from './Task';
export { default as Tuple } from './Tuple';
export { default as Validation } from './Validation';
