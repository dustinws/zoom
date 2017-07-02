import pipe from './pipe';

export default function compose(...fns) {
  return pipe(...fns.reverse());
}
