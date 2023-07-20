import { checkPressInLocal } from "./checkPressInLocal.js";
import { confirm } from "./confirm.js";
import { renderListView } from "./main/listView/core/renderListView.js";
import { store } from "./store.js";
import {
  changeBtnAndView,
  changePressCss,
  displayView,
} from "./main/changeView/changeView.js";
const SET_TIME = 5000;

function clickSubscribe(selectedPress, view, _img) {
  let SubscribePress = JSON.parse(localStorage.getItem("press"));

  //구독 중
  if (checkPressInLocal(selectedPress)) {
    confirm(selectedPress, _img, view);
  }
  //구독 중 X
  else {
    SubscribePress.push(selectedPress);

    const snackbar = document.querySelector(".snackbar");
    snackbar.style.display = "block";
    setTimeout(() => moveToSubList(snackbar), SET_TIME);

    if (view === "list")
      _img.setAttribute("src", "../images/icon/Unsubscribe2.svg");
    else _img.setAttribute("src", "../images/icon/Unsubscribe.svg");

    localStorage.setItem("press", JSON.stringify(SubscribePress));
  }
}

function moveToSubList(snackbar) {
  snackbar.style.display = "none";
  //move to ListView
  // document.querySelector(".viewer-btn button").click();
  displayView("grid");
  changeBtnAndView("list");
  changePressCss("press");
  store.setType("list-press");
  renderListView();
}

export { clickSubscribe };
