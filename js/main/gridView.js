// 랜덤 그리드 && 버튼
import { press } from "../../assets/press.js";

const GRID_NUM = 24;
const MIN_PAGE = 1;
const MAX_PAGE = 4;

let main_list_page = MIN_PAGE;
const main_list_ul = document.querySelector(".grid-view-ul");
const left_btn = document.getElementById("left-btn");
const right_btn = document.getElementById("right-btn");

const imgIndex = Array(press.length)
  .fill()
  .map((arr, i) => i);

function shuffleImgIndex() {
  return [...imgIndex].sort(() => Math.random() - 0.5);
}

const shuffledPress = shuffleImgIndex();

function showMainList() {
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

function changePage(e) {
  if (e.target.id === "left") {
    main_list_page--;
  } else {
    main_list_page++;
  }
  showMainList();
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

function initGridView() {
  right_btn.addEventListener("click", (e) => changePage(e));
  left_btn.addEventListener("click", (e) => changePage(e));
  showMainList();
  checkPage();
}
export { initGridView };
