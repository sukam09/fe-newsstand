import { setDisplay } from "./util/utils.js";
import { subscribeState } from "./store/subscribeState.js";

/***** 구독한 언론사 로고 채우기 *****/
function appendPressInSubGrid(press) {
  //언론사 이미지 추가
  const $image = document.createElement("img");
  $image.src = press[1];
  $image.classList.add("original");

  //구독하기 이미지 추가
  const $sub = document.createElement("img");
  $sub.src = `./assets/others/unsubButton.svg`;
  $sub.classList.add("un-sub");

  const $list = document.querySelector(".press-sub-grid .empty");
  $list.classList.remove("empty");
  $list.classList.add("full");
  $list.append($image, $sub);
}

function setSubGrid() {
  const sub_press_list = subscribeState.getSubState();
  sub_press_list.forEach((press) => {
    appendPressInSubGrid(press);
  });
}

/***** 24개의 그리드 채우기 *****/
function makePressItemli() {
  const $list = document.createElement("li");
  $list.classList.add("press-item", "empty");
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
