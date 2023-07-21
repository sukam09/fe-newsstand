import { setDisplay } from "./util/utils.js";
import { subscribeState } from "./store/subscribeState.js";

function appendPressInSubGrid(press) {
  const sub_img = `./assets/others/unsubButton.svg`;
  const list = document.querySelector(".press-sub-grid .empty");
  list.classList.remove("empty");
  list.classList.add("full");
  list.innerHTML = `<img src=${press[1]} class="original"><img src=${sub_img} class="un-sub">`;
}

function removeFullClass(element) {
  element.classList.remove("full");
  element.classList.add("empty");
}

function setSubGrid() {
  const sub_press_list = subscribeState.getSubState();
  sub_press_list.forEach((press) => {
    appendPressInSubGrid(press);
  });
  const fullItems = document.querySelectorAll("#press-sub-list .full");
  fullItems.forEach((element) => {
    removeFullClass(element);
  });
}

/***** 24개의 그리드 채우기 *****/
function makePressItemli() {
  const $list = document.createElement("li");
  $list.classList.add("press-item", "empty");
  $list.classList.add("press-item");
  document.getElementById("press-sub-list").appendChild($list);
}

function appendPressItemli() {
  for (let i = 0; i < 24; i++) {
    makePressItemli();
  }
}

/***** 구독 해지 alert *****/
const unsub_btns = document.querySelector("#press-sub-list");
unsub_btns.addEventListener("click", () => {
  setDisplay(".sub-alert", "block");
});

const no = document.querySelector(".no");
no.addEventListener("click", () => {
  setDisplay(".sub-alert", "none");
});

const yes = document.querySelector(".yes");
yes.addEventListener("click", () => {
  setDisplay(".sub-alert", "none");
});

export { setSubGrid, appendPressItemli };
