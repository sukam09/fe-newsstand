import { gridPageState } from "../../store/store.js";
import { getState } from "../../observer/observer.js";
import { NEWS_COUNT, PRESS_ICON } from "../../constants/constants.js";
import { ObjectToArrayRandom, shuffleArrayRandom } from "../../utils/utils.js";

const $gridView = document.querySelector(".grid-view");

const pressIcons = shuffleArrayRandom(ObjectToArrayRandom(PRESS_ICON));

const fillPressIcons = () => {
  const startIndex = getState(gridPageState) * NEWS_COUNT;

  $gridView.innerHTML = "";

  pressIcons
    .slice(startIndex, startIndex + NEWS_COUNT)
    .forEach(({ src, name }) => {
      $gridView.innerHTML += createGridContent(src, name);
    });
};

const createGridContent = (src, name) => {
  return `<li class="grid-cell">
    <button>
      <img class="grid-cell_news-img" src=${src} alt=${name}/>
    </button>
  </li>`;
};

export { fillPressIcons };
