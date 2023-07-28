import { setDisplay, findPress, findSpanNearby, getJSON, getNews, moveEmptySubListPage } from "../util/utils.js";
import { setSubData } from "../util/utils.js";
import { getState, setState } from "../observer/observer.js";
import { clickedUnsubPress, isGridView, subListPageCount, subscribedPress } from "../store/store.js";

let news_by_category;

function onGridUndiscribeModal({ target: target }) {
  const $press_name = document.querySelector(".grid-sub-press-name");
  $press_name.textContent = findPress("src", target).name;
  setDisplay(".grid-subscribe-modal", "query", "block");
}

function offUndiscribeModal() {
  //grid
  setDisplay(".grid-subscribe-modal", "query", "none");
}

function onListUndiscribeModal() {
  // 리스트 구독 모달
  const $sub_modal = document.querySelector(".list-subscribe-modal");
  const $press = getNews();
  $sub_modal.querySelector(".sub-press-name").textContent = $press.name;
  setDisplay(".list-subscribe-modal", "query", "block");
}

function offListUndiscribeModal() {
  setDisplay(".list-subscribe-modal", "query", "none");
}

function handleModalBtn({ target: target }) {
  const $target_class = target.classList;
  if ($target_class.contains("pos")) {
    if (getState(isGridView)) {
      subscribePressByTarget(target);
    } else {
      setSubData(getState(clickedUnsubPress));
      setState(subListPageCount, 0);
      if (getState(subscribedPress).length === 0) {
        moveEmptySubListPage();
      }
    }
  }
  offUndiscribeModal();
  offListUndiscribeModal();
}

function subscribePressByTarget(target) {
  const $press_name_span = findSpanNearby(target);
  const $find_press = findPress("name", $press_name_span);
  setSubData($find_press);
}

async function initModalBtn() {
  news_by_category = await getJSON("/assets/media.json");
  const $button = document.querySelectorAll(".pop-up-btn");
  $button.forEach(btn => btn.addEventListener("click", handleModalBtn));
}

export { onGridUndiscribeModal, offUndiscribeModal, onListUndiscribeModal, initModalBtn };
