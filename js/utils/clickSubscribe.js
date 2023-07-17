import { checkPressInLocal } from "./checkPressInLocal.js";
function clickSubscribe(selectedPress) {
  let SubscribePress = JSON.parse(localStorage.getItem("press"));
  if (checkPressInLocal(selectedPress)) {
    SubscribePress = SubscribePress.filter((ele) => ele !== selectedPress);
  } else {
    SubscribePress.push(selectedPress);
  }
  localStorage.setItem("press", JSON.stringify(SubscribePress));

  const snackbar = document.querySelector(".snackbar");
  snackbar.style.display = "block";
  setTimeout(() => moveToSubList(snackbar), 5000);
}

function moveToSubList(snackbar) {
  snackbar.style.display = "none";
  //move to ListView
  document.querySelector(".viewer-btn button").click();
}

export { clickSubscribe };
