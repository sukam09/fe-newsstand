import { subscribe } from "../controller/observer.js";
import { showSnackBar } from "../model/store.js";
import { initSnackBarTimer } from "../controller/componentController.js";

function initSnackBar(parentNode) {
  const dom = `<div class="snack-bar display-medium16">내가 구독한 언론사에 추가되었습니다.</div>`;

  parentNode.innerHTML += dom;
}

function drawSnackBar() {
  const snackBar = document.querySelector(".snack-bar");
  snackBar.style.display = "block";
}

subscribe(showSnackBar, drawSnackBar);
subscribe(showSnackBar, initSnackBarTimer);

export { initSnackBar, drawSnackBar };
