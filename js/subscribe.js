import presses from "../assets/light-media.js";

function gridMouseOver(target) {
  const original = target.getElementsByTagName("img")[0];
  const button = target.getElementsByTagName("button")[0];

  original.classList.add("hidden");
  button.classList.remove("hidden");
}

function gridMouseOut(target) {
  const original = target.getElementsByTagName("img")[0];
  const button = target.getElementsByTagName("button")[0];

  button.classList.add("hidden");
  original.classList.remove("hidden");
}

function gridMouseClick(target) {
  const original = target.getElementsByTagName("img")[0];
  const sub_image = target.getElementsByTagName("img")[1];
  const original_path = ".." + original.src.split("5500")[1];
  const target_object = presses.find(target => target.src === original_path);
  target_object.isSub = !target_object.isSub;
  sub_image.src = target_object.isSub ? "../img/icons/unsubBtn.svg" : "../img/icons/Button.svg";
}

function initGridItemEvent(item) {
  item.addEventListener("mouseenter", e => gridMouseOver(e.target));
  item.addEventListener("mouseleave", e => gridMouseOut(e.target));
  item.addEventListener("click", e => gridMouseClick(e.target));
}

function preventButtonClick(button) {
  button.addEventListener("click", e => {
    e.stopPropagation();
    const liElement = e.target.closest("li");
    if (liElement) {
      gridMouseClick(liElement);
    }
  });
}

export { initGridItemEvent, preventButtonClick };
