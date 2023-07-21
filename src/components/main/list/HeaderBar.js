import {
  categoryState,
  subscribeState,
  selectedSubscribeState,
} from "../../../store/storeKey.js";
import {
  _querySelector,
  _querySelectorAll,
} from "../../../utils/my-query-selector.js";
import { getState, setState } from "../../../store/observer.js";
import { checkIsAllType, checkIsGridView } from "../../../utils/utils.js";

const $categoryBarWrapper = _querySelector(".list-view_category-bar");
const $categoryBar = _querySelector("ul", $categoryBarWrapper);
const $slider = _querySelector(".list-view_category-bar");

const setDragSlider = () => {
  let isDown = false;
  let startX;
  let scrollLeft;

  $slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - $slider.offsetLeft;
    scrollLeft = $slider.scrollLeft;
  });
  $slider.addEventListener("mouseleave", (e) => {
    isDown = false;
    $slider.classList.remove("grab");
  });
  $slider.addEventListener("mouseup", (e) => {
    isDown = false;
    $slider.classList.remove("grab");
  });
  $slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    $slider.classList.add("grab");
    const x = e.pageX - $slider.offsetLeft;
    const walk = x - startX;
    $slider.scrollLeft = scrollLeft - walk;
  });
};

const setCategoryBar = (categoryList) => () => {
  $categoryBar.innerHTML = "";

  categoryList.forEach((category) => {
    const $li = document.createElement("li");
    $li.innerHTML = category;
    $li.className = "hover-underline";
    $li.addEventListener("click", setCategoryState(category));

    $categoryBar.appendChild($li);
  });

  const currentCategory = getState(categoryState) || categoryList[0];

  setCategoryState(currentCategory)();
};
const setCategoryState = (category) => () => setState(categoryState, category);

const setSubscribePressBar = () => {
  const isAllType = checkIsAllType();
  const isGridView = checkIsGridView();

  if (isAllType || isGridView) return;

  const subscribedList = getState(subscribeState);
  $categoryBar.innerHTML = "";

  subscribedList.forEach((press) => {
    const $li = document.createElement("li");
    $li.innerHTML = press;
    $li.className = "hover-underline available-medium14 ";
    $li.addEventListener("click", setSelectedSubState(press));

    $categoryBar.appendChild($li);
  });

  const currentSelectedSubState =
    getState(selectedSubscribeState) || subscribedList[0];

  setSelectedSubState(currentSelectedSubState)();
};
const setSelectedSubState = (press) => () => {
  setState(selectedSubscribeState, press);
};

const setHeaderBar = (categoryList) => () => {
  const isListView = !checkIsGridView();
  const isAllType = checkIsAllType();

  isListView && isAllType
    ? setCategoryBar(categoryList)()
    : setSubscribePressBar();
};

export { setHeaderBar, setDragSlider, setSubscribePressBar };
