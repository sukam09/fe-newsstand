import { initGridItemEvent, initSubGridItemEvent, preventButtonClick } from "./subscribe.js";
import { PAGE_SIZE, STATE } from "./const.js";
import { setDisplay, getJSON } from "./utils.js";
import { handleView } from "./viewHandler.js";
let grid_page_count = 0;
let sub_grid_page_count = 0;

const shuffle = () => Math.random() - 0.5;
let presses;
let shuffled_presses;

async function drawSubGridArrow() {
  const subscribed_presses = presses.filter(press => press.isSub === true);
  const total_sub_grid_page = parseInt(subscribed_presses.length / PAGE_SIZE);
  setDisplay("sub-grid-next", "id", "block");
  setDisplay("sub-grid-prev", "id", "block");
  if (sub_grid_page_count === 0) {
    setDisplay("sub-grid-prev", "id", "none");
  }
  if (sub_grid_page_count === total_sub_grid_page) {
    setDisplay("sub-grid-next", "id", "none");
  }
}

function appendPressInGrid(press) {
  const $list = document.createElement("li");
  $list.classList.add("press-item");
  initGridItemEvent($list);
  const $image = document.createElement("img");
  $image.src = `${press.path_light}`;
  $image.classList.add("original");
  const $button = document.createElement("button");
  $button.classList.add("hidden");
  preventButtonClick($button, false);
  const $sub_img = document.createElement("img");
  $sub_img.src = STATE.SUB_DATA.some(data => data.name === press.name) ? "../img/icons/unsubBtn.svg" : "../img/icons/Button.svg";
  $button.append($sub_img);

  $list.append($image, $button);
  document.getElementById("press-list").appendChild($list);
}

function appendSubPressInGrid(press) {
  const $list = document.createElement("li");
  $list.classList.add("press-item");
  initSubGridItemEvent($list);
  const $image = document.createElement("img");
  $image.src = `${press.path_light}`;
  $image.classList.add("original");
  const $button = document.createElement("button");
  $button.classList.add("hidden");
  preventButtonClick($button);
  const $sub_img = document.createElement("img");
  $sub_img.src = "../img/icons/unsubBtn.svg";
  $button.append($sub_img);
  $list.append($image, $button);
  document.getElementById("sub-press-list").appendChild($list);
}

function turnSubGridNextPage() {
  sub_grid_page_count += 1;
  drawSubGridView();
}

function turnSubGridPrevPage() {
  sub_grid_page_count -= 1;
  drawSubGridView();
}

async function turnGridNextPage() {
  let shuffled_presses = [...presses].sort(shuffle);

  if (grid_page_count + 1 === parseInt(presses.length / PAGE_SIZE) - 1) {
    setDisplay("grid-next", "id", "none");
  }
  if (grid_page_count + 1 < parseInt(presses.length / PAGE_SIZE)) {
    setDisplay("grid-prev", "id", "block");
    document.getElementById("press-list").innerHTML = "";
    grid_page_count += 1;
    const slice_shuffled_presses = shuffled_presses.slice(grid_page_count * PAGE_SIZE, (grid_page_count + 1) * PAGE_SIZE);
    slice_shuffled_presses.forEach(press => {
      appendPressInGrid(press);
    });
  }
}

async function turnGridPrevPage() {
  let shuffled_presses = [...presses].sort(shuffle);

  if (grid_page_count - 1 === 0) {
    setDisplay("grid-prev", "id", "none");
  }
  if (grid_page_count - 1 >= 0) {
    setDisplay("grid-next", "id", "block");
    document.getElementById("press-list").innerHTML = "";
    grid_page_count -= 1;
    const slice_shuffled_presses = shuffled_presses.slice(grid_page_count * PAGE_SIZE, (grid_page_count + 1) * PAGE_SIZE);
    slice_shuffled_presses.forEach(press => {
      appendPressInGrid(press);
    });
  }
}

function addEventGridArrow() {
  document.getElementById("grid-next").addEventListener("click", turnGridNextPage);
  document.getElementById("grid-prev").addEventListener("click", turnGridPrevPage);
  document.getElementById("sub-grid-next").addEventListener("click", turnSubGridNextPage);
  document.getElementById("sub-grid-prev").addEventListener("click", turnSubGridPrevPage);
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

async function drawGridView() {
  let count = 0;
  const $press_list = document.getElementById("press-list");
  $press_list.innerHTML = "";
  const slice_shuffled_presses = shuffled_presses.slice(grid_page_count * PAGE_SIZE, (grid_page_count + 1) * PAGE_SIZE);
  slice_shuffled_presses.forEach(press => {
    appendPressInGrid(press);
    count += 1;
  });
  if (count < PAGE_SIZE) {
    for (let i = 0; i < PAGE_SIZE - count + 1; i++) {
      const $li = document.createElement("li");
      $li.classList.add("press-item");
      $press_list.appendChild($li);
    }
  }
}

async function drawSubGridView() {
  let count = 0;
  const $sub_press_list = document.getElementById("sub-press-list");
  $sub_press_list.innerHTML = "";
  const sub_press = STATE.SUB_DATA;
  const subscribed_presses = sub_press.slice(sub_grid_page_count * PAGE_SIZE, (sub_grid_page_count + 1) * PAGE_SIZE);
  subscribed_presses.forEach(press => {
    appendSubPressInGrid(press);
    count += 1;
  });
  if (count < PAGE_SIZE) {
    for (let i = 0; i < PAGE_SIZE - count; i++) {
      const $li = document.createElement("li");
      $li.classList.add("press-item");
      $sub_press_list.appendChild($li);
    }
  }
  drawSubGridArrow();
}

export { appendPressInGrid, initPressGrid, drawSubGridView, drawGridView, drawSubGridArrow };
