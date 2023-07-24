import { getState } from "./store/observer.js";
import { viewType } from "./store/store.js";
import { confirmModal } from "./confirmModal.js";
const SET_TIME = 5000;

let SNACKBAR_TIME;
function clickSubscribeBtn(selectedPress, _img) {
  let SubscribePress = JSON.parse(localStorage.getItem("press"));

  //구독 중
  if (checkPressInLocal(selectedPress)) {
    confirmModal(selectedPress, _img, getState(viewType));
  }
  //구독 중 X
  else {
    SubscribePress.push(selectedPress);

    const snackbar = document.querySelector(".snackbar");
    snackbar.style.display = "block";
    clearTimeout(SNACKBAR_TIME);
    SNACKBAR_TIME = setTimeout(() => moveToSubList(snackbar), SET_TIME);

    if (getState(viewType) === "list")
      _img.setAttribute("src", "../images/icon/Unsubscribe2.svg");
    else _img.setAttribute("src", "../images/icon/Unsubscribe.svg");

    localStorage.setItem("press", JSON.stringify(SubscribePress));
  }
}

function moveToSubList(snackbar) {
  snackbar.style.display = "none";
  //move to ListView
  // displayView("list");
  // changeBtnAndView("list");
  // changePressCss("press");
  // store.setType("list-press");
  // store.setListPage(0);
  // renderListView();
}

function checkPressInLocal(press) {
  //local에 아무것도 없을 때
  if (!localStorage.getItem("press")) {
    localStorage.setItem("press", JSON.stringify([]));
  }

  let SubscribePress = JSON.parse(localStorage.getItem("press"));

  //구독 X
  if (!SubscribePress.includes(`${press}`)) {
    return false;
  }
  // 구독 O
  else {
    return true;
  }
}

export { clickSubscribeBtn, checkPressInLocal };
