import presses from "../assets/light-media.js";
import { setDisplay } from "./utils.js";
import { MODAL_POPUP_TIME } from "./const.js";
import { drawSubGridView, drawGridView } from "./gridFunction.js";
import { checkViewStatus } from "./viewHandler.js";

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

function gridMouseClick(target, isSubPage) {
  const $original = target.getElementsByTagName("img")[0];
  const $sub_image = target.getElementsByTagName("img")[1];
  const $original_path = ".." + $original.src.split("5500")[1];
  const $target_object = presses.find(target => target.src === $original_path);
  $target_object.isSub = !$target_object.isSub;
  $sub_image.src = $target_object.isSub ? "../img/icons/unsubBtn.svg" : "../img/icons/Button.svg";
  if (isSubPage) {
    drawSubGridView();
  }
}

function listSubMouseClick(news, target) {
  if (!news.isSub) {
    news.isSub = !news.isSub;
    target.src = news.isSub ? "../img/icons/cancelSubBtn.svg" : "../img/icons/Button.svg";
    setDisplay(".subscribe-modal", "query", "block");
    setTimeout(() => setDisplay(".subscribe-modal", "query", "none"), MODAL_POPUP_TIME);
    // 모달 함수 추가
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
    gridMouseClick(e.target);
    drawSubGridView();
  });
}

function preventButtonClick(button, isSubPage) {
  button.addEventListener("click", e => {
    e.stopPropagation();
    const $li_element = e.target.closest("li");
    if ($li_element) {
      gridMouseClick($li_element, isSubPage);
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

function initSpanEvent() {
  const $press_options = document.querySelector(".press-option").children;
  [...$press_options].forEach(span => span.addEventListener("click", e => checkViewStatus(e.target)));
}

export { initGridItemEvent, preventButtonClick, listSubMouseClick, initSpanEvent, removeGridSubscribe, initSubGridItemEvent };
