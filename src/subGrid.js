import { setDisplay, removeAddClass } from "./util/utils.js";
import { subscribeState } from "./store/subscribeState.js";

function appendPressInSubGrid(press, idx) {
  const sub_img = `./assets/others/unsubButton.svg`;
  const $list = document.querySelectorAll(".press-sub-grid .press-item");
  removeAddClass($list[idx], "empty", "full");
  $list[idx].innerHTML = `<img src=${press[2]} class="original">
  <img src=${sub_img} class="un-sub ${press[0]}">`;
}

function setSubGrid() {
  let idx = 0;
  const sub_press_list = subscribeState.getSubState();
  sub_press_list.forEach((press) => {
    appendPressInSubGrid(press, idx);
    idx++;
  });
}

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

/***** 해지하기 버튼 클릭 시 alert 창 pop up *****/
const un_sub_btns = document.querySelector("#press-sub-list");
un_sub_btns.addEventListener("click", (e) => {
  const target_class = e.target.classList;
  if (target_class.contains("un-sub")) {
    const press = subscribeState.getSubInfoByid(target_class[1]);
    setDisplay(".sub-alert", "block");
    document.querySelector(
      ".alert-message .bold-font-init"
    ).innerHTML = `${press[0][1]}`;
  }
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
