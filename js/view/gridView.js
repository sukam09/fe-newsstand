import { initGridItemEvent, preventButtonClick } from "../subscribe/subscribe.js";
import { LIST_ELEMENT, PAGE_SIZE } from "../store/const.js";
import { setDisplay, getJSON } from "../util/utils.js";
import { setState, getState } from "../observer/observer.js";
import { gridPageCount, isDark, isSubView, subGridPageCount, subscribedPress } from "../store/store.js";

const shuffle = () => Math.random() - 0.5;
let presses = null;

function drawGridArrow() {
  // 그리드 상태에 따른 화살표 출력
  const is_sub_view = getState(isSubView);
  const sub_presses_length = getState(subscribedPress).length;
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
  const btn_image_src = getPressImageSrc(press);
  const $press_list = document.getElementById("press-list");
  const image_src = getState(isDark) ? press.path_dark : press.path_light;
  const htmls = LIST_ELEMENT(image_src, btn_image_src);
  $press_list.insertAdjacentHTML("beforeend", htmls);
  const $li_element = $press_list.lastElementChild;
  const $li_btn = $li_element.querySelector("button");
  initGridItemEvent($li_element, press);
  preventButtonClick($li_btn, false);
}

function getPressImageSrc(press) {
  if (getState(isSubView)) {
    return "../img/icons/unsubBtn.svg";
  } else {
    return getState(subscribedPress).some(data => data.name === press.name) ? "../img/icons/unsubBtn.svg" : "../img/icons/Button.svg";
  }
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
  document.getElementById("grid-next").addEventListener("click", pressGridArrow.bind(undefined, 1));
  document.getElementById("grid-prev").addEventListener("click", pressGridArrow.bind(undefined, -1));
}

async function initPressGrid() {
  // grid 초기화
  presses = await getJSON("../assets/media.json");
  presses = Object.values(presses).reduce((acc, cur) => {
    return acc.concat(cur);
  });
  presses = [...presses].sort(shuffle);
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

export { appendPressInGrid, initPressGrid, drawGridView, drawGridArrow };
