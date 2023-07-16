// 랜덤 그리드 && 버튼

import { fetchData } from "../../utils/fetchData.js";

function initGridView() {
  fetchData(".././assets/press.json").then((press) => makeGridView(press));
}

const GRID_NUM = 24;
const MIN_PAGE = 1;
const MAX_PAGE = 4;
const PRESS_NUM = 96;

let main_list_page = MIN_PAGE;

const main_list_ul = document.querySelector(".grid-view-ul");
const left_btn = document.getElementById("grid-left-btn");
const right_btn = document.getElementById("grid-right-btn");

const imgIndex = Array(PRESS_NUM)
  .fill()
  .map((arr, i) => i);

function shuffleImgIndex() {
  return [...imgIndex].sort(() => Math.random() - 0.5);
}

const shuffledPress = shuffleImgIndex();

function showMainList(press) {
  main_list_ul.innerHTML = "";
  for (
    let i = GRID_NUM * (main_list_page - 1);
    i < GRID_NUM * main_list_page;
    i++
  ) {
    const li = document.createElement("li");
    const img = document.createElement("img");

    img.setAttribute("src", `${press[shuffledPress[i]].lightSrc}`);
    main_list_ul.appendChild(li);
    li.appendChild(img);
  }
}

function changePage(e, press) {
  if (e.target.id === "grid-left") {
    main_list_page--;
  } else {
    main_list_page++;
  }
  showMainList(press);
  checkPage();
}

function checkPage() {
  if (main_list_page === MIN_PAGE) left_btn.style.visibility = "hidden";
  else if (main_list_page === MAX_PAGE) right_btn.style.visibility = "hidden";
  else {
    left_btn.style.visibility = "visible";
    right_btn.style.visibility = "visible";
  }
}

function makeGridView(press) {
  right_btn.addEventListener("click", (e) => changePage(e, press));
  left_btn.addEventListener("click", (e) => changePage(e, press));
  showMainList(press);
  checkPage();
}
export { initGridView, main_list_page, MIN_PAGE, MAX_PAGE };
