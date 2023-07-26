import { ARROW_SVG_PATH } from "../store/const.js";
import { subListPageCount, subscribedPress } from "../store/store.js";
import { getState, setState } from "../observer/observer.js";

function setSubListNav() {
  const subscribed_presses = getState(subscribedPress);
  const $sub_list_nav = document.querySelector(".sub-list-nav").firstElementChild;
  $sub_list_nav.innerHTML = "";
  subscribed_presses.forEach((press, index) => addSubListItem(press, index));
}

function addSubListItem(press, index) {
  const $sub_list_nav = document.querySelector(".sub-list-nav").firstElementChild;
  const $li = document.createElement("li");
  $li.classList.add("sub-nav-item", "surface-alt", "text-weak");
  $li.textContent = press.name;
  $li.addEventListener("click", clickSubListNav);
  $li.addEventListener("animationiteration", progressEnd);
  if (index === getState(subListPageCount)) {
    $li.classList.add("list-progress-bar", "text-white-default");
    insertNavArrow($li);
  }
  $sub_list_nav.append($li);
}

function progressEnd() {
  const next_sub_list_page = getState(subListPageCount) + 1 === getState(subscribedPress).length ? 0 : getState(subListPageCount) + 1;
  setState(subListPageCount, next_sub_list_page);
}

/*
    sub-list-view에서 nav(언론명)을 클릭했을 때
*/
function clickSubListNav({ target: target }) {
  const subscribed_presses = getState(subscribedPress);
  const $element = document.querySelector(".list-progress-bar");
  $element.classList.remove("list-progress-bar", "text-white-default");
  $element.querySelector("span").remove();
  const nav_item = target.textContent;
  const item_index = subscribed_presses.findIndex(data => data.name === nav_item);
  setState(subListPageCount, item_index);
  target.classList.add("list-progress-bar");
  insertNavArrow(target);
}

function insertNavArrow(target) {
  target.insertAdjacentHTML(
    "beforeend",
    `<span>
  ${ARROW_SVG_PATH}
  </span>`,
  );
}

export { setSubListNav };
