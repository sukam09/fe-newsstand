import { focusToAllPublisher, focusToMyPubliser } from "../utils/navTab.js";
import { MESSAGE } from "./constant.js";

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
  const snackbar = document.querySelector(".modal__snack-bar");
  snackbar.classList.remove("modal__none");
  snackbar.textContent = msg;
  setTimeout(() => {
    snackbar.classList.add("modal__none");
  }, 5000);
}
