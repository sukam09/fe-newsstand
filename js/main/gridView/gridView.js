// 랜덤 그리드 && 버튼
import { clickSubscribe } from "../../utils/clickSubscribe.js";
import { fetchData } from "../../utils/fetchData.js";
import { checkPressInLocal } from "../../utils/checkPressInLocal.js";

function initGridView() {
  fetchData(".././assets/news.json").then((press) => makeGridView(press));
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
    const _li = document.createElement("li");
    const _img = document.createElement("img");

    _li.setAttribute("data-press", `${press[shuffledPress[i]].name}`);
    _img.setAttribute("src", `${press[shuffledPress[i]].lightSrc}`);

    /* li hover 이벤트 리스너 */
    _li.addEventListener("mouseover", () =>
      handleMouseOver(_img, _li.dataset.press)
    );
    _li.addEventListener("mouseout", () =>
      handleMouseOut(_img, ` ${press[shuffledPress[i]].lightSrc}`)
    );

    _img.addEventListener("click", (e) =>
      clickSubscribe(e.target.parentElement.dataset.press)
    );

    main_list_ul.appendChild(_li);
    _li.appendChild(_img);
  }
}

function handleMouseOver(_img, press) {
  if (checkPressInLocal(press)) {
    _img.setAttribute("src", `../images/icon/Unsubscribe.svg`);
  } else {
    _img.setAttribute("src", "../images/icon/Subscribe.svg");
  }
}

function handleMouseOut(_img, originImg) {
  _img.setAttribute("src", originImg);
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
