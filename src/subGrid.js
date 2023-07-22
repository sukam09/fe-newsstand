import { setDisplay, removeAddClass } from "./util/utils.js";
import { subscribeState } from "./store/subscribeState.js";

/***** 구독 언론사 로고 채우기 *****/
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

/***** 미리 24개의 li 채우기 *****/
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
    const press = subscribeState.getSubInfoById(target_class[1]);
    setDisplay(".sub-alert", "block");
    document.querySelector(
      ".alert-message .bold-font-init"
    ).innerHTML = `${press[0][1]}`;
  }
});

//구독 유지
const no = document.querySelector(".no");
no.addEventListener("click", () => {
  setDisplay(".sub-alert", "none");
});

//구독 헤지하기
const yes = document.querySelector(".yes");
yes.addEventListener("click", () => {
  setDisplay(".sub-alert", "none");
  //타겟 언론사 지우고
  const press_name = document.querySelector(
    ".alert-message .bold-font-init"
  ).innerHTML;
  const target_press = subscribeState.getSubInfoByName(press_name)[0];
  subscribeState.removePressFromSubList(target_press);
  //다시 렌더링
  const $list = document.querySelectorAll(".press-sub-grid .full");
  $list.forEach((element) => {
    element.innerHTML = "";
    removeAddClass(element, "full", "empty");
  });
  setSubGrid();
});

export { setSubGrid, appendPressItemli };
