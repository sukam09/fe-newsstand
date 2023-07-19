//뷰 타입 변경
import { store, MIN_PAGE, MAX_PAGE } from "../../store.js";
import { renderGridView } from "../gridView/core/renderGridView.js";
import { checkPage } from "../gridView/feature/handleData.js";
import { renderListView } from "../listView/core/renderListView.js";

function getById(id) {
  return document.getElementById(id);
}

function changeBtnAndView(view) {
  const grid_view = document.querySelector(".grid-view");
  const list_view = document.querySelector(".list-view");

  const grid_left_btn = getById("grid-left-btn");
  const grid_right_btn = getById("grid-right-btn");
  const list_left_btn = getById("list-left-btn");
  const list_right_btn = getById("list-right-btn");

  if (view === "list") {
    grid_view.style.display = "none";
    list_view.style.display = "block";

    //button 교체
    grid_left_btn.style.visibility = "hidden";
    grid_right_btn.style.visibility = "hidden";
    list_left_btn.style.visibility = "visible";
    list_right_btn.style.visibility = "visible";
  } else {
    list_view.style.display = "none";
    grid_view.style.display = "flex";

    if (store.state.main_grid_page !== MIN_PAGE)
      grid_left_btn.style.visibility = "visible";
    if (store.state.main_grid_page !== MAX_PAGE)
      grid_right_btn.style.visibility = "visible";
    list_left_btn.style.visibility = "hidden";
    list_right_btn.style.visibility = "hidden";
  }
}

function initViewChange() {
  changePressState();
  const view_type = document.querySelectorAll(".viewer-btn button");
  //view_type[0] : listview, view_type[1] : gridview

  view_type[0].addEventListener("click", () => {
    view_type[0].innerHTML = `<img
    src="../images/icon/List-view-checked.svg"
    alt="images"
  />`;
    view_type[1].innerHTML = `<img
    src="../images/icon/Grid-view-unchecked.svg"
    alt="images"
  />`;
    changeBtnAndView("list");
    // store.setType("list-category");
  });
  view_type[1].addEventListener("click", () => {
    view_type[0].innerHTML = `<img
    src="../images/icon/List-view-unchecked.svg"
    alt="images"
  />`;
    view_type[1].innerHTML = `<img
    src="../images/icon/Grid-view-checked.svg"
    alt="images"
  />`;
    changeBtnAndView("grid");
    checkPage();

    // store.setType("grid-all");
  });
}

function changePressState() {
  const changeBtn = document.querySelectorAll(".main-tab-btn button span");

  changeBtn[0].addEventListener("click", () => handleAllPress(changeBtn));
  changeBtn[1].addEventListener("click", () => handleSubPress(changeBtn));
}

function handleAllPress(changeBtn) {
  if (store.state.type === "grid-sub") {
    store.setType("grid-all");
    renderGridView();
    store.setGridPage(1);
  }
  // else {
  //   store.setType("list-all");
  //   renderListView
  // }
  changeBtn[0].classList.replace("unclicked-press", "clicked-press");
  changeBtn[1].classList.replace("clicked-press", "unclicked-press");
}
function handleSubPress(changeBtn) {
  if (store.state.type === "grid-all") {
    store.setType("grid-sub");
    renderGridView();
    store.setGridPage(1);
  }
  // else {
  //   store.setType("list-sub");
  //   renderListView();
  // }
  changeBtn[0].classList.replace("clicked-press", "unclicked-press");
  changeBtn[1].classList.replace("unclicked-press", "clicked-press");
}

export { initViewChange };
