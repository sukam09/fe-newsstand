import { switchTo } from "./switch.js";
import { handleElementClass } from "./util.js";
export function snackBarCallBack(snackbar) {
  return function () {
    handleElementClass(snackbar, "add", "modal__none");
    switchTo(); // 구독버튼을 눌렀을때 이동.
  };
}
