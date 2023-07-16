import { getState } from "../../observer/observer.js";
import { gridPageState, isDarkMode } from "../../store/store.js";
import { _querySelector } from "../../utils/my-query-selector.js";
import { NEWS_COUNT, PRESS_ICON } from "../../constants/constants.js";
import { ObjectToArrayRandom, shuffleArrayRandom } from "../../utils/utils.js";
import { createSubscribeButton } from "../subscribe-button/SubscribeButton.js";

const $gridView = _querySelector(".grid-view");

const pressIcons = shuffleArrayRandom(ObjectToArrayRandom(PRESS_ICON));

const fillPressIcons = () => {
  const startIndex = getState(gridPageState) * NEWS_COUNT;
  const currentMode = getState(isDarkMode);

  $gridView.innerHTML = "";

  pressIcons
    .slice(startIndex, startIndex + NEWS_COUNT)
    .forEach(({ name, light, dark }) => {
      $gridView.innerHTML += createGridContent(
        name,
        currentMode ? dark : light
      );
    });
};

const createGridContent = (name, light) => {
  return `<li class="grid-cell card">
    <div class="content">
      <div class="front">
        <button>
          <img class="grid-cell_news-img" src=${light} alt=${name} />
        </button>
      </div>
      <div class="back">${createSubscribeButton()}</div>
    </div>
  </li>`;
};

export { fillPressIcons };
