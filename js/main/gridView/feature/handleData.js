import { clickSubscribe } from "../../../clickSubscribe.js";
import { store, MIN_PAGE, MAX_PAGE } from "../../../store.js";
import { handleMouseOver, handleMouseOut } from "./handleEvent.js";

const GRID_NUM = 24;
const PRESS_NUM = 96;

const imgIndex = Array(PRESS_NUM)
  .fill()
  .map((arr, i) => i);

function shuffleImgIndex() {
  return [...imgIndex].sort(() => Math.random() - 0.5);
}
const shuffledPress = shuffleImgIndex(imgIndex);

function showMainList(press) {
  const main_list_ul = document.querySelector(".grid-view-ul");

  main_list_ul.innerHTML = "";
  for (
    let i = GRID_NUM * (store.state.grid_page - 1);
    i < GRID_NUM * store.state.grid_page;
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

    //구독하기 && 해제하기 클릭 시
    _img.addEventListener("click", (e) =>
      clickSubscribe(e.target.parentElement.dataset.press, "grid", _img)
    );

    main_list_ul.appendChild(_li);
    _li.appendChild(_img);
  }
}

function changePage(e, press) {
  if (e.target.id === "grid-left") {
    store.setGridPage(store.state.grid_page - 1);
  } else {
    store.setGridPage(store.state.grid_page + 1);
  }
  showMainList(press);
  checkPage();
}

function checkPage() {
  const left_btn = document.getElementById("grid-left-btn");
  const right_btn = document.getElementById("grid-right-btn");

  if (store.state.grid_page === MIN_PAGE) left_btn.style.visibility = "hidden";
  else if (store.state.grid_page === MAX_PAGE)
    right_btn.style.visibility = "hidden";
  else {
    left_btn.style.visibility = "visible";
    right_btn.style.visibility = "visible";
  }
}

export { changePage, showMainList, checkPage };
