import {
  gridPageState,
  isDarkMode,
  subscribeGridPageState,
  subscribeState,
} from "../../../store/storeKey.js";
import {
  checkIsAllType,
  pressObjectToArray,
  shuffleArrayRandom,
} from "../../../utils/utils.js";
import {
  _querySelector,
  _querySelectorAll,
} from "../../../utils/my-query-selector.js";
import { getState } from "../../../store/observer.js";
import { NEWS_COUNT, PRESS_ICON } from "../../../constants/constants.js";
import { getSubscribeButton } from "../subscribe-button/SubscribeButton.js";

const $gridView = _querySelector(".grid-view");
const $gridViewList = _querySelectorAll("li", $gridView);

const pressIcons = shuffleArrayRandom(pressObjectToArray(PRESS_ICON));

const fillPressIcons = () => {
  const startIndex = checkIsAllType()
    ? getState(gridPageState) * NEWS_COUNT
    : getState(subscribeGridPageState) * NEWS_COUNT;

  const isCurrentDarkMode = getState(isDarkMode);
  const pressIcons = getPressIcons();

  resetGrid();

  pressIcons
    .slice(startIndex, startIndex + NEWS_COUNT)
    .forEach(({ name, light, dark }, idx) => {
      $gridViewList[idx].appendChild(
        createGridContent(name, isCurrentDarkMode ? dark : light)
      );
    });
};

const resetGrid = () => {
  $gridViewList.forEach((elem) => {
    elem.innerHTML = "";
  });
};

const getPressIcons = () => {
  const subscribedData = getState(subscribeState);

  if (!checkIsAllType()) {
    const subPressIcons = pressIcons.filter(({ name }) =>
      subscribedData.includes(name)
    );
    return subPressIcons;
  }
  return pressIcons;
};

const createGridContent = (name, light) => {
  const $gridContent = document.createElement("div");
  $gridContent.className = "content";

  const $front = `
    <div class="front">
      <button>
        <img class="grid-cell_news-img" src=${light} alt=${name} />
      </button>
    </div>`;

  const $back = document.createElement("div");
  $back.className = "back";
  const $subscribeButton = getSubscribeButton(name);
  $back.appendChild($subscribeButton);

  $gridContent.innerHTML = $front;
  $gridContent.appendChild($back);

  return $gridContent;
};
export { fillPressIcons, getPressIcons };
