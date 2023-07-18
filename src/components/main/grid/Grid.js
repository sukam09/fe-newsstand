import {
  gridPageState,
  isDarkMode,
  subscribeGridPageState,
  subscribeState,
  viewOptionState,
} from "../../../store/store.js";
import {
  ObjectToArrayRandom,
  shuffleArrayRandom,
} from "../../../utils/utils.js";
import {
  NEWS_COUNT,
  PRESS_ICON,
  VIEW_OPTION_TYPE,
} from "../../../constants/constants.js";
import {
  _querySelector,
  _querySelectorAll,
} from "../../../utils/my-query-selector.js";
import { getState } from "../../../observer/observer.js";
import { createSubscribeButton } from "../subscribe-button/SubscribeButton.js";

const $gridView = _querySelector(".grid-view");
const $gridViewList = _querySelectorAll("li", $gridView);

const pressIcons = shuffleArrayRandom(ObjectToArrayRandom(PRESS_ICON));

const fillPressIcons = () => {
  const currentViewOption = getState(viewOptionState);
  const startIndex =
    currentViewOption === VIEW_OPTION_TYPE.ALL
      ? getState(gridPageState) * NEWS_COUNT
      : getState(subscribeGridPageState) * NEWS_COUNT;

  // const startIndex = getState(gridPageState) * NEWS_COUNT;
  const currentMode = getState(isDarkMode);
  const pressIcons = getPressIcons();

  resetGrid();

  pressIcons
    .slice(startIndex, startIndex + NEWS_COUNT)
    .forEach(({ name, light, dark }, idx) => {
      $gridViewList[idx].appendChild(
        createGridContent(name, currentMode ? dark : light)
      );
    });
};

const resetGrid = () => {
  $gridViewList.forEach((elem) => {
    elem.innerHTML = "";
  });
};

const getPressIcons = () => {
  const currentViewOption = getState(viewOptionState);
  const subscribedData = getState(subscribeState);

  if (currentViewOption === VIEW_OPTION_TYPE.SUBSCRIBE) {
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

  const $front = document.createElement("div");
  $front.className = "front";
  $front.innerHTML = `
    <button>
      <img class="grid-cell_news-img" src=${light} alt=${name} />
    </button>`;

  const $back = document.createElement("div");
  $back.className = "back";
  $back.appendChild(createSubscribeButton(name));

  $gridContent.appendChild($front);
  $gridContent.appendChild($back);

  return $gridContent;
};

export { fillPressIcons, getPressIcons };
