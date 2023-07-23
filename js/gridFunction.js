import { initGridItemEvent, preventButtonClick } from "./subscribe.js";
import { PAGE_SIZE, STATE } from "./const.js";
import { setDisplay, getJSON } from "./utils.js";

const shuffle = () => Math.random() - 0.5;
let presses;
let shuffled_presses;

function drawGridArrow() {
  // 그리드 상태에 따른 화살표 출력
  const total_grid_page = STATE.IS_SUB_VIEW ? parseInt(STATE.SUB_DATA.length / PAGE_SIZE) : parseInt(shuffled_presses.length / PAGE_SIZE);
  setDisplay("grid-next", "id", "block");
  setDisplay("grid-prev", "id", "block");
  const now_page = STATE.IS_SUB_VIEW ? STATE.SUB_GRID_PAGE : STATE.GRID_PAGE;
  if (total_grid_page === 0) {
    setDisplay("grid-prev", "id", "none");
    setDisplay("grid-next", "id", "none");
  } else if (now_page === 0) {
    setDisplay("grid-prev", "id", "none");
  } else if (now_page+1 >= total_grid_page) {
    setDisplay("grid-next", "id", "none");
  }
}

function appendPressInGrid(press) {
  // grid에 뉴스 기사 넣기
  const $list = document.createElement("li");
  $list.classList.add("press-item");
  initGridItemEvent($list, press);
  const $image = document.createElement("img");
  $image.src = STATE.IS_DARK ? `${press.path_dark}` : `${press.path_light}`;
  $image.classList.add("original");
  const $button = document.createElement("button");
  $button.classList.add("hidden");
  preventButtonClick($button, false);
  const $sub_img = document.createElement("img");
  if (STATE.IS_SUB_VIEW) {
    $sub_img.src = "../img/icons/unsubBtn.svg";
  } else {
    $sub_img.src = STATE.SUB_DATA.some(data => data.name === press.name) ? "../img/icons/unsubBtn.svg" : "../img/icons/Button.svg";
  }
  $button.append($sub_img);
  $list.append($image, $button);
  document.getElementById("press-list").appendChild($list);
}

function pressGridArrow(increment) {
  // grid 화살표 클릭
  STATE.IS_SUB_VIEW ? (STATE.SUB_GRID_PAGE = STATE.SUB_GRID_PAGE + increment) : (STATE.GRID_PAGE = STATE.GRID_PAGE + increment);
  drawGridView();
}

function addEventGridArrow() {
  // grid 화살표 이벤트 등록
  document.getElementById("grid-next").addEventListener("click", pressGridArrow.bind(1));
  document.getElementById("grid-prev").addEventListener("click", pressGridArrow.bind(-1));
}

async function initPressGrid() {
  // grid 초기화
  presses = await getJSON("../assets/media.json");
  presses = Object.values(presses).reduce((acc, cur) => {
    return acc.concat(cur);
  });
  shuffled_presses = [...presses].sort(shuffle);
  drawGridView();
  addEventGridArrow();
}

function drawGridView() {
  // 페이지에 따른 grid 그리기
  const $press_list = document.getElementById("press-list");
  $press_list.innerHTML = "";
  const press_data = STATE.IS_SUB_VIEW ? STATE.SUB_DATA : shuffled_presses;
  const PAGE_TYPE = STATE.IS_SUB_VIEW ? STATE.SUB_GRID_PAGE : STATE.GRID_PAGE;
  const sliced_data = press_data.slice(PAGE_TYPE * PAGE_SIZE, (PAGE_TYPE + 1) * PAGE_SIZE);
  const count = appendPress(sliced_data);
  if (count < PAGE_SIZE) {
    for (let i = 0; i < PAGE_SIZE - count + 1; i++) {
      const $li = document.createElement("li");
      $li.classList.add("press-item");
      $press_list.appendChild($li);
    }
  }
  drawGridArrow();
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
