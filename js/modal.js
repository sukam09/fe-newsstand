import { setDisplay, findPress, findSpanNearby, checkIsSubscribe, removeDisplay, getJSON } from "../js/utils.js";
import { setSubData } from "./const.js";
import { drawGridView } from "./gridFunction.js";
import { getState, setState } from "./observer/observer.js";
import {
  categoryPageCount,
  clickedUnsubPress,
  isGridView,
  isSubView,
  nowCategory,
  subListPageCount,
  subscribedPress,
} from "./store/store.js";
import { changeOption } from "./viewHandler.js";

let news_by_category = null;

function onGridUndiscribeModal({ target: target }) {
  console.log(target);
  const $press_name = document.querySelector(".grid-sub-press-name");

  $press_name.textContent = findPress("src", target);
  setDisplay(".grid-subscribe-modal", "query", "block");
}

function offUndiscribeModal() {
  //grid
  setDisplay(".grid-subscribe-modal", "query", "none");
}

function onListUndiscribeModal() {
  // 리스트 구독 모달
  const $sub_modal = document.querySelector(".list-subscribe-modal");
  const subscribed_presses = getState(subscribedPress);
  const now_category = getState(nowCategory);
  const page_count = getState(categoryPageCount);
  const $press = getState(isSubView)
    ? subscribed_presses[getState(subListPageCount)]
    : news_by_category[now_category][page_count[now_category]];
  $sub_modal.querySelector(".sub-press-name").textContent = $press.name;
  setDisplay(".list-subscribe-modal", "query", "block");
}

function offListUndiscribeModal() {
  setDisplay(".list-subscribe-modal", "query", "none");
}

async function initModalBtn() {
  news_by_category = await getJSON("/assets/media.json");
  const $button = document.querySelectorAll(".pop-up-btn");
  $button.forEach(btn => btn.addEventListener("click", handleModalBtn));
}

function handleModalBtn({ target: target }) {
  const $target_class = target.classList;
  if ($target_class.contains("pos")) {
    //예 ?
    if (getState(isGridView)) {
      //그리드뷰일때
      const $press_name_span = findSpanNearby(target);
      console.log($press_name_span);
      const $find_press = findPress("name", $press_name_span);
      console.log($find_press);
      setSubData($find_press);
      drawGridView();
    } else {
      // 리스트뷰일때
      setSubData(getState(clickedUnsubPress));
      setState(subListPageCount, 0);
      if (getState(subscribedPress).length === 0) {
        removeDisplay();
        changeOption("subscribe");
        setDisplay(".no-sub-item-div", "query", "block");
      }
    }
  }
  offUndiscribeModal();
  offListUndiscribeModal();
}

export { onGridUndiscribeModal, offUndiscribeModal, onListUndiscribeModal, initModalBtn };
