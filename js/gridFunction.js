import presses from "../assets/light-media.js";
import { initGridItemEvent, preventButtonClick } from "./subscribe.js";
let grid_page_count = 0;
let grid_view_selected = true;

const PAGE_SIZE = 24;

const shuffle = () => Math.random() - 0.5;
let shuffled_presses = [...presses].sort(shuffle);

function appendPressInGrid(press) {
  const list = document.createElement("li");
  list.classList.add("press-item");
  initGridItemEvent(list);
  const image = document.createElement("img");
  image.src = `${press.src}`;
  image.classList.add("original");
  const button = document.createElement("button");
  button.classList.add("hidden");
  preventButtonClick(button);
  const sub_img = document.createElement("img");
  sub_img.src = press.isSub ? "../img/icons/unsubBtn.svg" : "../img/icons/Button.svg";
  button.append(sub_img);

  list.append(image, button);
  document.getElementById("press-list").appendChild(list);
}

function changeToGrid() {
  document.getElementsByClassName("grid-selected")[0].style.display = "flex";
  document.getElementsByClassName("list-selected")[0].style.display = "none";
  document.getElementsByClassName("press-list-section")[0].style.display = "none";
  document.getElementsByClassName("press-grid")[0].style.display = "block";
  grid_view_selected = true;
}

function changeToList() {
  document.getElementsByClassName("grid-selected")[0].style.display = "none";
  document.getElementsByClassName("list-selected")[0].style.display = "flex";
  document.getElementsByClassName("press-list-section")[0].style.display = "block";
  document.getElementsByClassName("press-grid")[0].style.display = "none";
  grid_view_selected = false;
}

document.getElementById("grid-next").addEventListener("click", () => {
  if (grid_page_count + 1 === parseInt(presses.length / PAGE_SIZE) - 1) {
    document.getElementById("grid-next").style.display = "none";
  }
  if (grid_page_count + 1 < parseInt(presses.length / PAGE_SIZE)) {
    document.getElementById("grid-prev").style.display = "block";
    document.getElementById("press-list").innerHTML = "";
    grid_page_count += 1;
    const slice_shuffled_presses = shuffled_presses.slice(grid_page_count * PAGE_SIZE, (grid_page_count + 1) * PAGE_SIZE);
    slice_shuffled_presses.forEach(press => {
      appendPressInGrid(press);
    });
  }
});

document.getElementById("grid-prev").addEventListener("click", () => {
  if (grid_page_count - 1 === 0) {
    document.getElementById("grid-prev").style.display = "none";
  }
  if (grid_page_count - 1 >= 0) {
    document.getElementById("grid-next").style.display = "block";
    document.getElementById("press-list").innerHTML = "";
    grid_page_count -= 1;
    const slice_shuffled_presses = shuffled_presses.slice(grid_page_count * PAGE_SIZE, (grid_page_count + 1) * PAGE_SIZE);
    slice_shuffled_presses.forEach(press => {
      appendPressInGrid(press);
    });
  }
});

function initPressGrid() {
  let shuffled_presses = [...presses].sort(shuffle);
  const slice_shuffled_presses = shuffled_presses.slice(0, PAGE_SIZE);
  slice_shuffled_presses.forEach(press => {
    appendPressInGrid(press);
  });
}

let list_symbol = document.querySelectorAll(".list-symbol");
list_symbol.forEach(symbol => {
  symbol.addEventListener("click", () => {
    if (grid_view_selected) {
      // grid 상태이면
      changeToList();
    }
  });
});

let grid_symbol = document.querySelectorAll(".grid-symbol");
grid_symbol.forEach(symbol => {
  symbol.addEventListener("click", () => {
    if (!grid_view_selected) {
      // grid 상태 아니면
      changeToGrid();
    }
  });
});

export { appendPressInGrid, changeToGrid, changeToList, initPressGrid };
