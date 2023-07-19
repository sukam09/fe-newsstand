function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function changeImageSrc(target, src) {
  target.src = `${src}`;
}

function makeArrow() {
  const direction = ["left", "right"];

  direction.forEach((value) => {
    document.getElementById(
      `aside-${value}`
    ).innerHTML = `<img id="${value}-arrow" src="./img/${value}_button.png">`;
  });
}

function removeArrow() {
  const direction = ["left", "right"];

  direction.forEach((value) => {
    document.getElementById(`aside-${value}`).innerHTML = "";
  });
}

export { shuffle, changeImageSrc, makeArrow, removeArrow };
