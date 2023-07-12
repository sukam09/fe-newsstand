function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function changeImageSrc(e, src) {
  e.src = `${src}`;
}

export { shuffle, changeImageSrc };
