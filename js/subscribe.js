import { setDisplay, removeDisplay, getJSON } from "./utils.js";
import { MODAL_POPUP_TIME, getSubData, setSubData } from "./const.js";
import { drawSubGridView, drawGridView } from "./gridFunction.js";
import { checkViewStatus } from "./viewHandler.js";
import { onUndiscribeModal } from "./modal.js";

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
  if (!news.isSub) {
    news.isSub = !news.isSub;
    target.src = news.isSub ? "../img/icons/cancelSubBtn.svg" : "../img/icons/Button.svg";
    setDisplay(".subscribe-modal", "query", "block");
    setTimeout(() => {
      setDisplay(".subscribe-modal", "query", "none");
      checkViewStatus(document.querySelector(".subscribed-press"));
    }, MODAL_POPUP_TIME);
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
  [...$press_options].forEach(span => span.addEventListener("click", e => checkViewStatus(e.target)));
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
