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

function boldSubscribed() {
  document.getElementById("allNews").style.color = "#879298";
  document.getElementById("subscribedNews").style.fontWeight = "700";
  document.getElementById("subscribedNews").style.color = "#14212B";
}

function boldAll() {
  document.getElementById("allNews").style.fontWeight = "";
  document.getElementById("allNews").style.color = "#14212B";
  document.getElementById("subscribedNews").style.color = "#879298";
}

export {
  shuffle,
  changeImageSrc,
  makeArrow,
  removeArrow,
  boldSubscribed,
  boldAll,
};
