import { setDisplay, getJSON, checkIsSubscribe, showListNav } from "../util/utils.js";
import { MODAL_POPUP_TIME, SNACKBAR_POPUP_TIME } from "../store/const.js";
import { setSubData } from "../util/utils.js";
import { handleView, changeOption } from "../view/viewHandler.js";
import { onGridUndiscribeModal, onListUndiscribeModal } from "../component/modal.js";
import { drawNews } from "../view/listView.js";
import { isDark, isSubView, subListPageCount, subscribedPress } from "../store/store.js";
import { getState, setState } from "../observer/observer.js";

let presses = null;
let snackbarTimer;
let subscribeModalTimer;

function gridMouseOver({ target: target }) {
  const $original = target.querySelector("img");
  const $button = target.querySelector("button");
  target.classList.add("surface-alt");
  addRemoveHidden($original, $button);
}

function gridMouseOut({ target: target }) {
  const $original = target.querySelector("img");
  const $button = target.querySelector("button");
  target.classList.remove("surface-alt");
  addRemoveHidden($button, $original);
}

function gridMouseClick({ target: target }) {
  if (snackbarTimer) {
    clearTimeout(snackbarTimer);
  }
  setDisplay(".grid-snackbar", "query", "block");
  snackbarTimer = setTimeout(() => {
    setDisplay(".grid-snackbar", "query", "none");
  }, SNACKBAR_POPUP_TIME);

  const $original = target.getElementsByTagName("img")[0];
  const $original_path = ".." + $original.src.split("5500")[1];
  const $target_object = presses.find(target =>
    getState(isDark) ? target.path_dark === $original_path : target.path_light === $original_path,
  );
  setSubData($target_object);
}

function listSubMouseClick(news) {
  if (checkIsSubscribe("name", news.name) === undefined) {
    //구독 상태가 아니면
    setSubData(news);
    setDisplay(".subscribe-modal", "query", "block"); // 구독 모달 출현
    drawNews(); // 화면 다시 뿌림
    subscribeModalTimer = setTimeout(moveSubListView, MODAL_POPUP_TIME);
    setTimeout(() => document.addEventListener("click", documentClick), 100); // 0.1s delay
  } else {
    // 구독 상태면
    onListUndiscribeModal();
  }
}

function documentClick() {
  clearTimeout(subscribeModalTimer);
  setDisplay(".subscribe-modal", "query", "none");
  document.removeEventListener("click", documentClick);
}

function moveSubListView() {
  document.removeEventListener("click", documentClick);
  setState(isSubView, true); // 뷰 상태 바뀔 때 모두 렌더링
  setDisplay(".subscribe-modal", "query", "none");
  setState(subListPageCount, getState(subscribedPress).length - 1);
  changeOption("subscribe");
  showListNav("subscribe");
}

function initGridItemEvent(item, press) {
  const subscribed_press = getState(subscribedPress);
  item.addEventListener("mouseenter", gridMouseOver);
  item.addEventListener("mouseleave", gridMouseOut);
  if (subscribed_press.find(data => data.name === press.name) === undefined) {
    item.addEventListener("click", gridMouseClick);
  } else {
    item.addEventListener("click", onGridUndiscribeModal);
  }
  item.style.cursor = "pointer";
}

function preventButtonClick(button) {
  button.addEventListener("click", disableButtonEvent);
}

function disableButtonEvent({ target: target }) {
  e.stopPropagation();
  const $li_element = target.closest("li");
  if ($li_element) {
    gridMouseClick($li_element);
  }
}

function addRemoveHidden(add_target, remove_target) {
  add_target.classList.add("hidden");
  remove_target.classList.remove("hidden");
}

async function initSpanEvent() {
  presses = await getJSON("../assets/media.json");
  presses = Object.values(presses).reduce((acc, cur) => {
    return acc.concat(cur);
  });

  const $press_options = document.querySelector(".press-option").children;
  [...$press_options].forEach(span => span.addEventListener("click", handleView));
}

export { initGridItemEvent, preventButtonClick, listSubMouseClick, initSpanEvent, gridMouseClick };
