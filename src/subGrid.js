import { getPressObj } from "./api/api.js";
import { setDisplay } from "./util/utils.js";

let subscribed_press = [];
let presses;

function appendPressInSubGrid(press) {
  //언론사 이미지 추가
  const $image = document.createElement("img");
  $image.src = `${press.lightSrc}`;
  $image.classList.add("original");

  //구독하기 이미지 추가
  const $sub = document.createElement("img");
  $sub.src = `./assets/others/unsubButton.svg`;
  $sub.classList.add("un-sub");

  //ul에 li 추가
  const $list = document.createElement("li");
  $list.classList.add("press-item", "full");
  $list.append($image, $sub);
  document.getElementById("press-sub-list").appendChild($list);
}

export async function setSubGrid() {
  presses = await getPressObj();
  const sliced_presses = presses.slice(0, 23);
  //24개가 안되면 아예 칸이 지워져버림

  sliced_presses.forEach((press) => {
    appendPressInSubGrid(press);
  });

  const $list = document.createElement("li");
  $list.classList.add("press-item");
  document.getElementById("press-sub-list").appendChild($list);
}

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
