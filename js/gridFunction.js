import { initGridItemEvent, initSubGridItemEvent, preventButtonClick } from "./subscribe.js";
import { PAGE_SIZE, STATE, DATA } from "./const.js";
import { setDisplay, getJSON } from "./utils.js";
import { handleView } from "./viewHandler.js";

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

// async function drawSubGridArrow() {
//   const total_sub_grid_page = parseInt(STATE.SUB_DATA.length / PAGE_SIZE);
//   setDisplay("sub-grid-next", "id", "block");
//   setDisplay("sub-grid-prev", "id", "block");
//   if (STATE.SUB_GRID_PAGE === 0) {
//     setDisplay("sub-grid-prev", "id", "none");
//   }
//   if (STATE.SUB_GRID_PAGE === total_sub_grid_page) {
//     setDisplay("sub-grid-next", "id", "none");
//   }
// }

function appendPressInGrid(press) {
  //   html`
  //   <li class="press-item">
  //     <img class="original "src=${STATE.IS_DARK ? shuffled_presses.path_dark : shuffled_presses.path_light} />
  //     <button class="hidden">
  // </button>
  //   `
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

// function appendSubPressInGrid(press) {
//   const $list = document.createElement("li");
//   $list.classList.add("press-item");
//   initSubGridItemEvent($list);
//   const $image = document.createElement("img");
//   $image.src = STATE.IS_DARK ? `${press.path_dark}` : `${press.path_light}`;
//   $image.classList.add("original");
//   const $button = document.createElement("button");
//   $button.classList.add("hidden");
//   preventButtonClick($button);
//   const $sub_img = document.createElement("img");
//   $sub_img.src = "../img/icons/unsubBtn.svg";
//   $button.append($sub_img);
//   $list.append($image, $button);
//   document.getElementById("sub-press-list").appendChild($list);
// }

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
  const $press_list = STATE.IS_SUB_VIEW ? document.getElementById("sub-press-list") : document.getElementById("press-list");
  $press_list.innerHTML = "";
  const press_data = STATE.IS_SUB_VIEW ? STATE.SUB_DATA : shuffled_presses;
  const PAGE_TYPE = STATE.IS_SUB_VIEW ? STATE.SUB_GRID_PAGE : STATE.GRID_PAGE;
  const sliced_data = press_data.slice(PAGE_TYPE * PAGE_SIZE, (PAGE_TYPE + 1) * PAGE_SIZE);
  sliced_data.forEach(press => {
    appendPressInGrid(press); // 이 부분이 문제 !
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
