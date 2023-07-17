import { setDisplay, findPress, findSpanNearby } from "../js/utils.js";
import { gridMouseClick, drawSubGridView } from "./subscribe.js";

function onUndiscribeModal(target) {
  const $press_name = document.querySelector(".sub-press-name");
  $press_name.textContent = findPress("src", target);
  const $btn_div = document.querySelector(".pop-up-btn-div");
  setDisplay(".grid-subscribe-modal", "query", "block");
}

function offUndiscribeModal() {
  setDisplay(".grid-subscribe-modal", "query", "none");
}

function initModalBtn() {
  const $button = document.querySelectorAll(".pop-up-btn");
  $button.forEach(btn => btn.addEventListener("click", e => handleModalBtn(e.target)));
}

function handleModalBtn(target) {
  const $target_class = target.classList;
  if ($target_class.contains("pos")) {
    const $press_name_span = findSpanNearby(target);
    const $find_press = findPress("name", $press_name_span);
    $find_press.isSub = !$find_press.isSub;
    drawSubGridView();
    offUndiscribeModal();
  } else if ($target_class.contains("neg")) {
    offUndiscribeModal();
  }
}

export { onUndiscribeModal, offUndiscribeModal, initModalBtn };
