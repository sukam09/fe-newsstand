import { initGridItemEvent, preventButtonClick } from "./subscribe.js";
import { PAGE_SIZE, STATE, DATA } from "./const.js";
import { setDisplay, getJSON } from "./utils.js";

const shuffle = () => Math.random() - 0.5;
let presses;
let shuffled_presses;

function drawGridArrow() {
  const total_grid_page = STATE.IS_SUB_VIEW ? parseInt(STATE.SUB_DATA.length / PAGE_SIZE) : parseInt(shuffled_presses.length / PAGE_SIZE);
  setDisplay("grid-next", "id", "block");
  setDisplay("grid-prev", "id", "block");
  const now_page = STATE.IS_SUB_VIEW ? STATE.SUB_GRID_PAGE : STATE.GRID_PAGE;
  if (now_page === 0) {
    setDisplay("grid-prev", "id", "none");
  }
  if (now_page === total_grid_page) {
    setDisplay("grid-next", "id", "none");
  }
}

function appendPressInGrid(press) {
  const $list = document.createElement("li");
  $list.classList.add("press-item");
  initGridItemEvent($list);
  const $image = document.createElement("img");
  $image.src = STATE.IS_DARK ? `${press.path_dark}` : `${press.path_light}`;
  $image.classList.add("original");
  const $button = document.createElement("button");
  $button.classList.add("hidden");
  preventButtonClick($button, false);
  const $sub_img = document.createElement("img");
  if (STATE.IS_GRID_VIEW) {
    $sub_img.src = "../img/icons/unsubBtn.svg";
  } else {
    $sub_img.src = STATE.SUB_DATA.some(data => data.name === press.name) ? "../img/icons/unsubBtn.svg" : "../img/icons/Button.svg";
  }
  $button.append($sub_img);

  $list.append($image, $button);
  document.getElementById("press-list").appendChild($list);
}

function pressGridArrow(increment) {
  STATE.IS_SUB_VIEW ? STATE.SUB_GRID_PAGE + increment : STATE.GRID_PAGE + increment;
  drawGridView();
}

function addEventGridArrow() {
  document.getElementById("grid-next").addEventListener("click", () => pressGridArrow(1));
  document.getElementById("grid-prev").addEventListener("click", () => pressGridArrow(-1));
}

async function initPressGrid() {
  presses = await getJSON("../assets/media.json");
  presses = Object.values(presses).reduce((acc, cur) => {
    return acc.concat(cur);
  });
  shuffled_presses = [...presses].sort(shuffle);
  const slice_shuffled_presses = shuffled_presses.slice(0, PAGE_SIZE);
  slice_shuffled_presses.forEach(press => {
    appendPressInGrid(press);
  });
  addEventGridArrow();
}

function drawGridView() {
  let count = 0;
  const $press_list = document.getElementById("press-list");
  $press_list.innerHTML = "";
  const press_data = STATE.IS_SUB_VIEW ? STATE.SUB_DATA : shuffled_presses;
  const PAGE_TYPE = STATE.IS_SUB_VIEW ? STATE.SUB_GRID_PAGE : STATE.GRID_PAGE;
  const sliced_data = press_data.slice(PAGE_TYPE * PAGE_SIZE, (PAGE_TYPE + 1) * PAGE_SIZE);
  sliced_data.forEach(press => {
    appendPressInGrid(press); 
    count++;
  });
  if (count < PAGE_SIZE) {
    for (let i = 0; i < PAGE_SIZE - count + 1; i++) {
      const $li = document.createElement("li");
      $li.classList.add("press-item");
      $press_list.appendChild($li);
    }
  }
  drawGridArrow();
}

export { appendPressInGrid, initPressGrid, drawGridView };
