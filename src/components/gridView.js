import { UNSUB_BTN_IMG, GRID_SUB_BTN_IMG } from "../util/path.js";
import { getPressObj } from "../api/api.js";
import { setState, getState, subscribe } from "../observer/observer.js";
import {
  isLight,
  gridPageIdx,
  isMySubView,
  subGridPageIdx,
  subscribedPress,
} from "../store/store.js";
import { setDisplay } from "../util/utils.js";

const PRESS_NUM_IN_GRID = 24;
const TOTAL_PRESS_NUM = 96;
let grid_page_count = 0;
let total_page_count = 0;

/***** 사진 셔플 *****/
let presses;
let shuffled_presses;
let presses_in_grid;

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

/***** 빈 아이템 채우기 *****/
function makePressItemli() {
  const $list = document.createElement("li");
  $list.classList.add("press-item", "empty");
  document.querySelector("#press-list").appendChild($list);
}

function appendPressItemli() {
  const appendedPressLength =
    document.querySelectorAll("#press-list li").length;
  for (let i = 0; i < PRESS_NUM_IN_GRID - appendedPressLength; i++) {
    makePressItemli();
  }
}

/***** grid에 언론사 & 구독 이미지 추가 *****/
function appendPressInGrid(press) {
  //언론사 이미지 추가
  const $image = document.createElement("img");
  $image.src = getState(isLight) ? `${press.lightSrc}` : `${press.darkSrc}`;
  $image.classList.add("original", `id${press.id}`);

  //구독 여부 확인 후 구독하기/해지하기 이미지 추가
  const $sub = document.createElement("img");
  const sub_press = getState(subscribedPress).filter(
    (item) => item.name === press.name
  );
  if (getState(isMySubView)) {
    // 내 구독 언론사 클릭 상태면
    $sub.src = UNSUB_BTN_IMG;
    $sub.classList.add("un-sub", `id${press.id}`);
  } else {
    if (sub_press.length === 0) {
      $sub.src = GRID_SUB_BTN_IMG;
      $sub.classList.add("sub", `id${press.id}`);
    } else {
      $sub.src = UNSUB_BTN_IMG;
      $sub.classList.add("un-sub", `id${press.id}`);
    }
  }

  //ul에 li 추가
  const $list = document.createElement("li");
  $list.classList.add("press-item", "full");
  $list.append($image, $sub);
  document.getElementById("press-list").appendChild($list);
}

//언론사 사진 append
function drawGrid() {
  const is_my_sub_view = getState(isMySubView);
  const page_idx = is_my_sub_view
    ? getState(subGridPageIdx)
    : getState(gridPageIdx);
  const $press_list = document.querySelector("#press-list");
  $press_list.innerHTML = "";
  const sliced_presses = presses_in_grid.slice(
    page_idx * PRESS_NUM_IN_GRID,
    PRESS_NUM_IN_GRID * (page_idx + 1)
  );
  sliced_presses.forEach((press) => {
    appendPressInGrid(press);
  });
  appendPressItemli();
}

async function initGrid() {
  presses = await getPressObj();
  shuffled_presses = shuffleArray(presses);
  setGrid();
  addEventToGridArrow();
}

function setGrid() {
  const is_my_sub_view = getState(isMySubView);
  presses_in_grid = is_my_sub_view
    ? getState(subscribedPress)
    : shuffled_presses;
  drawGrid();
  drawGridArrow();
}

/***** 그리드 이동 화살표 *****/
function drawGridArrow() {
  const is_my_sub_view = getState(isMySubView);
  grid_page_count = is_my_sub_view
    ? getState(subGridPageIdx)
    : getState(gridPageIdx);
  total_page_count = is_my_sub_view
    ? parseInt(getState(subscribedPress).length / PRESS_NUM_IN_GRID + 1)
    : parseInt(TOTAL_PRESS_NUM / PRESS_NUM_IN_GRID);
  setDisplay("#grid-next", "block");
  setDisplay("#grid-prev", "block");
  if (total_page_count === 0 || grid_page_count === 0) {
    setDisplay("#grid-prev", "none");
  }
  if (total_page_count === 0 || grid_page_count + 1 >= total_page_count) {
    setDisplay("#grid-next", "none");
  }
}

function movePageByArrow(increment) {
  const is_my_sub_view = getState(isMySubView);
  is_my_sub_view
    ? setState(subGridPageIdx, getState(subGridPageIdx) + increment)
    : setState(gridPageIdx, getState(gridPageIdx) + increment);
}

function addEventToGridArrow() {
  const grid_next = document.querySelector("#grid-next");
  const grid_prev = document.querySelector("#grid-prev");
  grid_next.addEventListener("click", movePageByArrow.bind(undefined, 1));
  grid_prev.addEventListener("click", movePageByArrow.bind(undefined, -1));
}

//id로 언론사 찾기
async function getPressItemById(id) {
  presses = await getPressObj();
  const subPress = await Promise.all(
    presses.filter((item) => item.id === parseInt(id))
  );
  return subPress;
}

//name으로 언론사 찾기
async function getPressItemByName(name) {
  presses = await getPressObj();
  const press = await Promise.all(presses.filter((item) => item.name === name));
  return press;
}

//구독 언론사 리스트에서 지우기
function removePressFromSubList(press) {
  let sub_press_list = getState(subscribedPress);
  sub_press_list = sub_press_list.filter((item) => item.name !== press.name);
  return sub_press_list;
}

/***** 구독하기 버튼 누르면 구독 *****/
//구독하기 버튼 이벤트 리스너
const sub_btns = document.querySelector("#press-list");
sub_btns.addEventListener("click", async (e) => {
  const target = e.target;
  const target_class = target.classList;
  const target_id = target_class[1].slice(2, target_class[1].length);
  if (target_class.contains("sub")) {
    const current_sub_list = getState(subscribedPress);
    const sub_press = await getPressItemById(target_id);
    setState(subscribedPress, [...current_sub_list, sub_press[0]]);
    target.src = UNSUB_BTN_IMG;
    target.className = `un-sub id${target_id}`;
  } else if (target_class.contains("un-sub")) {
    const press = await getPressItemById(target_id);
    setDisplay(".sub-alert", "block");
    document.querySelector(
      ".alert-message .bold-font-init"
    ).innerHTML = `${press[0].name}`;
  }
});

//구독 유지
const no = document.querySelector(".no");
no.addEventListener("click", () => {
  setDisplay(".sub-alert", "none");
});

//구독 해지하기
const yes = document.querySelector(".yes");
yes.addEventListener("click", async () => {
  setDisplay(".sub-alert", "none");
  //타겟 언론사 지우고
  const press_name = document.querySelector(
    ".alert-message .bold-font-init"
  ).innerHTML;
  let sub_press = await getPressItemByName(press_name);
  sub_press = removePressFromSubList(sub_press[0]);
  setState(subscribedPress, sub_press);
  //다시 렌더링
  setGrid();
});

//alert 창 바깥 누르면 꺼짐
window.addEventListener("click", (e) => {
  const parent = e.target.closest(".sub-alert");
  if (parent === null) {
    if (e.target.classList.contains("un-sub")) {
      setDisplay(".sub-alert", "block");
    } else {
      setDisplay(".sub-alert", "none");
    }
  }
});

export {
  PRESS_NUM_IN_GRID,
  initGrid,
  setGrid,
  drawGrid,
  drawGridArrow,
  getPressItemByName,
  removePressFromSubList,
};
