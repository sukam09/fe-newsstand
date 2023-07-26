import { focusToAllPublisher, focusToMyPubliser } from "../utils/navTab.js";
import { MESSAGE } from "./constant.js";
import { snackBarCallBack, switchTo } from "./snackbar.js";

let snackBarTime;

export function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export async function removeChildElement(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

export function onFocusToClicked(where, mySubscribe, allPublisher) {
  where === MESSAGE.MY_PUBLISHER
    ? focusToMyPubliser(mySubscribe, allPublisher)
    : focusToAllPublisher(mySubscribe, allPublisher);
}

export function handleElementClass(element, type, name) {
  type === "add" && element.classList.add(name);
  type === "remove" && element.classList.remove(name);
}

export function snackBarAction(msg) {
  if (snackBarTime) {
    clearTimeout(snackBarTime);
  }
  const snackbar = document.querySelector(".modal__snack-bar");
  snackbar.classList.remove("modal__none");
  snackbar.textContent = msg;
  snackBarTime = setTimeout(snackBarCallBack(snackbar), 2000);
}

export function snackBarListAction(msg) {
  const snackbar = document.querySelector(".modal__snack-bar");
  snackbar.classList.remove("modal__none");
  snackbar.textContent = msg;
  snackbar.classList.add("modal__none");
  switchTo(); // 구독버튼을 눌렀을때 이동.
}
