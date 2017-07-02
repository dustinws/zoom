import List from '../data/List';

export default function pipe(...fns) {
  return (...args) => {
    const [head, ...tail] = fns;

    return List.fold((a, b) =>
      b(a), head(...args), tail);
  };
}
