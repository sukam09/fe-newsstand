import { initGridItemEvent, preventButtonClick } from "./subscribe.js";
import { PAGE_SIZE } from "./const.js";
import { setDisplay, getJSON } from "./utils.js";
import { setState, getState, subscribe } from "./observer/observer.js";
import { gridPageCount, isDark, isSubView, subGridPageCount, subscribedPress } from "./store/store.js";

const shuffle = () => Math.random() - 0.5;
let presses = null;

function drawGridArrow() {
  // 그리드 상태에 따른 화살표 출력
  const is_sub_view = getState(isSubView);
  const sub_presses_length = getState(subscribedPress).length
  const total_grid_page = is_sub_view ? parseInt(sub_presses_length / PAGE_SIZE) : parseInt(presses.length / PAGE_SIZE);
  setDisplay("grid-next", "id", "block");
  setDisplay("grid-prev", "id", "block");
  const now_page = is_sub_view ? getState(subGridPageCount) : getState(gridPageCount);
  if (total_grid_page === 0) {
    setDisplay("grid-prev", "id", "none");
    setDisplay("grid-next", "id", "none");
  } else if (now_page === 0) {
    setDisplay("grid-prev", "id", "none");
  } else if (now_page + 1 >= total_grid_page) {
    setDisplay("grid-next", "id", "none");
  }
}

function appendPressInGrid(press) {
  // grid에 뉴스 기사 넣기
  const $list = document.createElement("li");
  $list.classList.add("press-item");
  initGridItemEvent($list, press);
  const $image = document.createElement("img");
  $image.src = getState(isDark) ? `${press.path_dark}` : `${press.path_light}`;
  $image.classList.add("original");
  const $button = document.createElement("button");
  $button.classList.add("hidden");
  preventButtonClick($button, false);
  const $sub_img = document.createElement("img");
  if (getState(isSubView)) {
    $sub_img.src = "../img/icons/unsubBtn.svg";
  } else {
    $sub_img.src = getState(subscribedPress).some(data => data.name === press.name) ? "../img/icons/unsubBtn.svg" : "../img/icons/Button.svg";
  }
  $button.append($sub_img);
  $list.append($image, $button);
  document.getElementById("press-list").appendChild($list);
}

function pressGridArrow(increment) {
  // grid 화살표 클릭
  const is_sub_view = getState(isSubView);
  is_sub_view
    ? setState(subGridPageCount, getState(subGridPageCount) + increment)
    : setState(gridPageCount, getState(gridPageCount) + increment);
}

function addEventGridArrow() {
  // grid 화살표 이벤트 등록
  document.getElementById("grid-next").addEventListener("click", pressGridArrow.bind("null", 1));
  document.getElementById("grid-prev").addEventListener("click", pressGridArrow.bind("null", -1));
}

async function initPressGrid() {
  // grid 초기화
  presses = await getJSON("../assets/media.json");
  presses = Object.values(presses).reduce((acc, cur) => {
    return acc.concat(cur);
  });
  presses = [...presses].sort(shuffle);
  subscribe(subGridPageCount, drawGridView);
  subscribe(gridPageCount, drawGridView);
  subscribe(subGridPageCount, drawGridArrow);
  subscribe(gridPageCount, drawGridArrow);
  drawGridView();
  addEventGridArrow();
}

function drawGridView() {
  // 페이지에 따른 grid 그리기
  const is_sub_view = getState(isSubView);
  const $press_list = document.getElementById("press-list");
  $press_list.innerHTML = "";
  const press_data = is_sub_view ? getState(subscribedPress) : presses;
  const page_count = is_sub_view ? getState(subGridPageCount) : getState(gridPageCount);
  const sliced_data = press_data.slice(page_count * PAGE_SIZE, (page_count + 1) * PAGE_SIZE);
  const count = appendPress(sliced_data);
  if (count < PAGE_SIZE) {
    for (let i = 0; i < PAGE_SIZE - count + 1; i++) {
      const $li = document.createElement("li");
      $li.classList.add("press-item");
      $press_list.appendChild($li);
    }
  }
}

function appendPress(presses) {
  let count = 0;
  presses.forEach(press => {
    appendPressInGrid(press);
    count++;
  });
  return count;
}

export { appendPressInGrid, initPressGrid, drawGridView };
