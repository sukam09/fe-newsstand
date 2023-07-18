import { checkPressInLocal } from "./checkPressInLocal.js";
import { confirm } from "./confirm.js";
const SET_TIME = 5000;
function clickSubscribe(selectedPress, view, _img) {
  let SubscribePress = JSON.parse(localStorage.getItem("press"));

  //구독 중
  if (checkPressInLocal(selectedPress)) {
    // document.querySelector(".confirm").style.display = "block";
    confirm(selectedPress, _img);
    // SubscribePress = SubscribePress.filter((ele) => ele !== selectedPress);

    // _img.setAttribute("src", "../images/icon/subscribe.svg");
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
  // localStorage.setItem("press", JSON.stringify(SubscribePress));
}

function moveToSubList(snackbar) {
  snackbar.style.display = "none";
  //move to ListView
  document.querySelector(".viewer-btn button").click();

  //change contents
}

function changeContents() {}

export { clickSubscribe };
