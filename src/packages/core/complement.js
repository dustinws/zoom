export default function complement(func) {
  return (...args) => !func(...args);
}
