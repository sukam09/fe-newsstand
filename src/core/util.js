export function $(value, base = document) {
  return base.querySelector(value);
}

export function $All(value, base = document) {
  return base.querySelectorAll(value);
}

export function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}
