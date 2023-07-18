import { setDisplay, getJSON, checkIsSubscribe, removeDisplay } from "./utils.js";
import { MODAL_POPUP_TIME, STATE, setSubData } from "./const.js";
import { drawSubGridView, drawGridView } from "./gridFunction.js";
import { handleView, changeOption } from "./viewHandler.js";
import { onUndiscribeModal, onListUndiscribeModal } from "./modal.js";
import { setSubListNav, drawSubNews } from "./subscribeListView.js";

let presses;

function gridMouseOver(target) {
  const $original = target.querySelector("img");
  const $button = target.querySelector("button");
  addRemoveHidden($original, $button);
}

function gridMouseOut(target) {
  const $original = target.querySelector("img");
  const $button = target.querySelector("button");
  addRemoveHidden($button, $original);
}

function gridMouseClick(target) {
  const $original = target.getElementsByTagName("img")[0];
  const $sub_image = target.getElementsByTagName("img")[1];
  const $original_path = ".." + $original.src.split("5500")[1];
  const $target_object = presses.find(target => target.path_light === $original_path);
  setSubData($target_object);
  drawGridView();
  // $sub_image.src = $target_object.isSub ? "../img/icons/unsubBtn.svg" : "../img/icons/Button.svg";
}

function listSubMouseClick(news, target) {
  console.log(target);
  if (checkIsSubscribe("name", news.name) === undefined) {
    //구독 상태가 아니면
    STATE.SUB_DATA.push(news);
    setDisplay(".subscribe-modal", "query", "block");
    setTimeout(() => {
      setDisplay(".subscribe-modal", "query", "none");
      removeDisplay();
      STATE.SUB_NEWS_PAGE = 0;
      changeOption("subscribe");
      setDisplay(".sub-press-list-section", "query", "block");
      setSubListNav();
      drawSubNews(STATE.SUB_NEWS_PAGE);
    }, MODAL_POPUP_TIME);
  } else {
    // 구독 상태면
    onListUndiscribeModal();
  }
}

function initGridItemEvent(item) {
  item.addEventListener("mouseenter", e => gridMouseOver(e.target));
  item.addEventListener("mouseleave", e => gridMouseOut(e.target));
  item.addEventListener("click", e => gridMouseClick(e.target));
}

function initSubGridItemEvent(item) {
  item.addEventListener("mouseenter", e => gridMouseOver(e.target));
  item.addEventListener("mouseleave", e => gridMouseOut(e.target));
  item.addEventListener("click", e => {
    onUndiscribeModal(e.target);
  });
}

function preventButtonClick(button) {
  button.addEventListener("click", e => {
    e.stopPropagation();
    const $li_element = e.target.closest("li");
    if ($li_element) {
      gridMouseClick($li_element);
    }
  });
}

function addRemoveHidden(add_target, remove_target) {
  add_target.classList.add("hidden");
  remove_target.classList.remove("hidden");
}

function removeGridSubscribe(target) {
  drawGridView();
}

async function initSpanEvent() {
  presses = await getJSON("../assets/media.json");
  presses = Object.values(presses).reduce((acc, cur) => {
    return acc.concat(cur);
  });

  const $press_options = document.querySelector(".press-option").children;
  [...$press_options].forEach(span => span.addEventListener("click", e => handleView(e.target)));
}

export {
  initGridItemEvent,
  preventButtonClick,
  listSubMouseClick,
  initSpanEvent,
  removeGridSubscribe,
  initSubGridItemEvent,
  gridMouseClick,
  drawSubGridView,
};
