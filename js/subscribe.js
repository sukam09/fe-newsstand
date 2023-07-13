import presses from "../assets/light-media.js";

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
  const $original_path = ".." + original.src.split("5500")[1];
  const $target_object = presses.find(target => target.src === original_path);
  $target_object.isSub = !$target_object.isSub;
  $sub_image.src = $target_object.isSub ? "../img/icons/unsubBtn.svg" : "../img/icons/Button.svg";
}

function initGridItemEvent(item) {
  item.addEventListener("mouseenter", e => gridMouseOver(e.target));
  item.addEventListener("mouseleave", e => gridMouseOut(e.target));
  item.addEventListener("click", e => gridMouseClick(e.target));
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

export { initGridItemEvent, preventButtonClick };
