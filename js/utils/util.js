import {
  getSubscrbeList,
  setNavTabViewToMy,
  setUserViewToList,
} from "../store/dispatch.js";
import { focusToAllPublisher, focusToMyPubliser } from "../utils/navTab.js";
import { MESSAGE, VIEW } from "./constant.js";

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

function snackBarCallBack(snackbar) {
  return function () {
    snackbar.classList.add("modal__none");
    switchTo(); // 구독버튼을 눌렀을때 이동.
  };
}

export function snackBarListAction(msg) {
  const snackbar = document.querySelector(".modal__snack-bar");
  snackbar.classList.remove("modal__none");
  snackbar.textContent = msg;
  snackbar.classList.add("modal__none");
  switchTo(); // 구독버튼을 눌렀을때 이동.
}

function switchTo() {
  const [listButton] = document.getElementsByClassName("newsstand—btn-list");
  const [thumbButton] = document.getElementsByClassName("newsstand-btn-thumb");
  const [gridArea] = document.getElementsByClassName("newsstand__media-area");
  const listArea = document.getElementById("newsstand__news-area");

  const rightBtn = document.querySelector(".newsstand--right-btn");
  const leftBtn = document.querySelector(".newsstand--left-btn");
  const leftListBtn = document.querySelector(".left-list-button");
  const rightListBtn = document.querySelector(".right-list-button");

  const mySubscribe = document.querySelector(".newsstand-subscribe-publisher");
  const allPublisher = document.querySelector(".newsstand-all-publisher");

  setUserViewToList();
  setNavTabViewToMy();

  // 그리드 좌우버튼 삭제
  handleElementClass(leftBtn, "add", "btn-disabled");
  handleElementClass(rightBtn, "add", "btn-disabled");

  // 리스트 좌우버튼 추가
  handleElementClass(leftListBtn, "remove", "btn-disabled");
  handleElementClass(rightListBtn, "remove", "btn-disabled");

  listButton.src = "./assets/basicIcon/list-symbol-selected.svg";
  thumbButton.src = "./assets//basicIcon/grid-symbol.svg";

  // display: none 속성 부여.
  listArea.classList.remove(VIEW.DISABLED);
  gridArea.classList.add(VIEW.DISABLED);

  focusToMyPubliser(mySubscribe, allPublisher);
}
