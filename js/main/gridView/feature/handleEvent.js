import { checkPressInLocal } from "../../../checkPressInLocal.js";
import { changePage } from "./handleData.js";

function handleMouseOver(_img, press) {
  if (checkPressInLocal(press)) {
    _img.setAttribute("src", `../images/icon/Unsubscribe.svg`);
  } else {
    _img.setAttribute("src", "../images/icon/Subscribe.svg");
  }
}

function handleMouseOut(_img, originImg) {
  _img.setAttribute("src", originImg);
}

function addEventToGridBtn() {
  const left_btn = document.getElementById("grid-left-btn");
  const right_btn = document.getElementById("grid-right-btn");

  right_btn.addEventListener("click", (e) => changePage(e));
  left_btn.addEventListener("click", (e) => changePage(e));
}

export { handleMouseOver, handleMouseOut, addEventToGridBtn };
