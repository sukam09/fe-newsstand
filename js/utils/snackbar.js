import { switchTo } from "./switch.js";
export function snackBarCallBack(snackbar) {
  return function () {
    snackbar.classList.add("modal__none");
    switchTo(); // 구독버튼을 눌렀을때 이동.
  };
}
