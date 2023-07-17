function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function changeImageSrc(target, src) {
  target.src = `${src}`;
}

export { shuffle, changeImageSrc };
