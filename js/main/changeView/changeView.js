//뷰 타입 변경
import { store } from "../../store.js";
import { renderGridView } from "../gridView/core/renderGridView.js";
import { checkPage } from "../gridView/feature/handleData.js";

import { renderListView } from "../listView/core/renderListView.js";

function getById(id) {
  return document.getElementById(id);
}

function initViewChange() {
  changePressState();
  const view_type = document.querySelectorAll(".viewer-btn button");
  //view_type[0] : listview, view_type[1] : gridview

  view_type[0].addEventListener("click", () => {
    displayView("list");
    changeBtnAndView("list");
    changePressCss("all");
    store.setType("list-category");
    store.setListPage(0);
    renderListView();
  });
  view_type[1].addEventListener("click", () => {
    displayView("grid");
    changeBtnAndView("grid");
    changePressCss("all");
    store.setType("grid-all");
    store.setGridPage(1);
    renderGridView();
    checkPage();
  });
}

function changePressState() {
  const changeBtn = document.querySelectorAll(".main-tab-btn button span");

  changeBtn[0].addEventListener("click", handleAllPress);
  changeBtn[1].addEventListener("click", handleSubPress);
}

function displayView(type) {
  const view_type = document.querySelectorAll(".viewer-btn button");
  //view_type[0] : listview, view_type[1] : gridview
  if (type === "list") {
    view_type[0].innerHTML = `<img
    src="../images/icon/List-view-checked.svg"
    alt="images"
  />`;
    view_type[1].innerHTML = `<img
    src="../images/icon/Grid-view-unchecked.svg"
    alt="images"
  />`;
  } else {
    view_type[0].innerHTML = `<img
    src="../images/icon/List-view-unchecked.svg"
    alt="images"
  />`;
    view_type[1].innerHTML = `<img
  src="../images/icon/Grid-view-checked.svg"
    alt="images"
  />`;
  }
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

    grid_left_btn.style.visibility = "visible";
    grid_right_btn.style.visibility = "visible";
    list_left_btn.style.visibility = "hidden";
    list_right_btn.style.visibility = "hidden";
  }
}

function handleAllPress() {
  if (store.state.type === "grid-sub") {
    store.setType("grid-all");
    store.setGridPage(1);
    renderGridView();
  } else if (store.state.type === "list-press") {
    store.setType("list-category");
    store.setListPage(0);
    renderListView();
  }
  changePressCss("all");
}
function handleSubPress() {
  if (store.state.type === "grid-all") {
    store.setType("grid-sub");
    store.setGridPage(1);
    renderGridView();
  } else if (store.state.type === "list-category") {
    store.setType("list-press");
    store.setListPage(0);
    renderListView();
  }
  changePressCss("sub");
}

function changePressCss(type) {
  const changeBtn = document.querySelectorAll(".main-tab-btn button span");

  if (type === "all") {
    changeBtn[0].classList.replace("unclicked-press", "clicked-press");
    changeBtn[1].classList.replace("clicked-press", "unclicked-press");
  } else {
    changeBtn[0].classList.replace("clicked-press", "unclicked-press");
    changeBtn[1].classList.replace("unclicked-press", "clicked-press");
  }
}

export { initViewChange, changePressCss, displayView, changeBtnAndView };
