export function $(value) {
  return document.querySelector(value);
}

export function $All(value) {
  return document.querySelectorAll(value);
}

export function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}
