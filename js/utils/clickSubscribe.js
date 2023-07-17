import { checkPressInLocal } from "./checkPressInLocal";

const SET_TIME = 5000;

function clickSubscribe(selectedPress) {
  if (checkPressInLocal(selectedPress)) {
    SubscribePress = SubscribePress.filter((ele) => ele !== selectedPress);
  } else {
    SubscribePress.push(selectedPress);
  }
  localStorage.setItem("press", JSON.stringify(SubscribePress));

  const snackbar = document.querySelector(".snackbar");
  snackbar.style.display = "block";
  setTimeout(() => moveToSubList(snackbar), SET_TIME);
}

function moveToSubList(snackbar) {
  snackbar.style.display = "none";
}

export { clickSubscribe };
