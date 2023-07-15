export function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export function removeChildElement(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}
