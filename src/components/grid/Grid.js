import { gridPageState, isDarkMode } from "../../store/store.js";
import { getState } from "../../observer/observer.js";
import { NEWS_COUNT, PRESS_ICON } from "../../constants/constants.js";
import { ObjectToArrayRandom, shuffleArrayRandom } from "../../utils/utils.js";
import { _querySelector } from "../../utils/my-query-selector.js";

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
  return `<li class="grid-cell">
    <button>
      <img class="grid-cell_news-img" src=${light} alt=${name}/>
    </button>
  </li>`;
};

export { fillPressIcons };
