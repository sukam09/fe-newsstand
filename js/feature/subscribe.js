import { getState, setState } from "../store/observer.js";
import { subPress, viewType } from "../store/store.js";
import { SNACKBAR_TIME, LIST_VIEW } from "../utils/constant.js";
import { clickNo, clickYes } from "./eventHandlers.js";

let clearSnackbar;
function clickSubscribeBtn(selectedPress, _img) {
  let SubscribePress = JSON.parse(localStorage.getItem("press"));

  //구독 중
  if (checkPressInLocal(selectedPress)) {
    confirmModal(selectedPress, _img, getState(viewType));
  }
  //구독 중 X
  else {
    SubscribePress.push(selectedPress);
    setState(subPress, SubscribePress);
    localStorage.setItem("press", JSON.stringify(SubscribePress));

    const snackbar = document.querySelector(".snackbar");
    snackbar.style.display = "block";

    clearTimeout(clearSnackbar);
    clearSnackbar = setTimeout(() => moveToSubList(snackbar), SNACKBAR_TIME);

    if (getState(viewType) === LIST_VIEW)
      _img.setAttribute("src", "../images/icon/Unsubscribe2.svg");
    else _img.setAttribute("src", "../images/icon/Unsubscribe.svg");
  }
}

function confirmModal(selectedPress, _img) {
  document.querySelector(".confirm").style.display = "block";
  const snackbar = document.querySelector(".snackbar");

  if (snackbar.style.display === "block") {
    snackbar.style.display = "none";
  }

  document.querySelector(
    ".question"
  ).innerHTML = `<span><span>${selectedPress}</span>을(를)</span> 구독해지하시겠습니까?`;

  const _answer = document.querySelector(".answer");
  //YES
  _answer.children[0].addEventListener(
    "click",
    () => clickYes(selectedPress, _img),
    { once: true }
  );

  //NO
  _answer.children[1].addEventListener("click", clickNo);
}

function moveToSubList(snackbar) {
  snackbar.style.display = "none";
  //move to ListView
  document.querySelector(".sub-press").click();
  document.querySelector(".list-view-btn").click();
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
