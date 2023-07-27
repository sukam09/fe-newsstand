import Stores from "../js/core/Store.js";
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

function doBeforeRender(pageMode) {
  Stores.setPage(0);
  if (pageMode === "list") {
    document.getElementById("main-grid").style.display = "none";
    document.getElementById("main-list").style.display = "flex";
    changeImageSrc(document.getElementById("grid-image"), "./img/grid.svg");
    changeImageSrc(
      document.getElementById("card-list-image"),
      "./img/clicked_card_list.png"
    );
  } else {
    document.getElementById("main-grid").style.display = "grid";
    document.getElementById("main-list").style.display = "none";
    changeImageSrc(
      document.getElementById("card-list-image"),
      "./img/card_list.svg"
    );
    changeImageSrc(
      document.getElementById("grid-image"),
      "./img/clicked_grid.png"
    );
  }
  removeArrow();
}

export {
  shuffle,
  changeImageSrc,
  makeArrow,
  removeArrow,
  doBeforeRender,
};
