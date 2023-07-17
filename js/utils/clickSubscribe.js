import { checkPressInLocal } from "./checkPressInLocal.js";
const SET_TIME = 5000;
function clickSubscribe(selectedPress) {
  let SubscribePress = JSON.parse(localStorage.getItem("press"));
  //구독 O
  if (checkPressInLocal(selectedPress)) {
    SubscribePress = SubscribePress.filter((ele) => ele !== selectedPress);
  }
  //구독 X
  else {
    SubscribePress.push(selectedPress);

    const snackbar = document.querySelector(".snackbar");
    snackbar.style.display = "block";
    setTimeout(() => moveToSubList(snackbar), SET_TIME);
  }
  localStorage.setItem("press", JSON.stringify(SubscribePress));
}

function moveToSubList(snackbar) {
  snackbar.style.display = "none";
  //move to ListView
  document.querySelector(".viewer-btn button").click();

  //change contents
}

export { clickSubscribe };
