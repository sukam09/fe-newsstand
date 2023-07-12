import { getState } from "../../observer/observer.js";
import { NEWS_COUNT, PRESS_ICON } from "../../constants/constants.js";
import { gridPageState, isListActivateState } from "../../store/store.js";
import { ObjectToArrayRandom, shuffleArrayRandom } from "../../utils/utils.js";

const $gridView = document.querySelector(".grid-view");
const $prevPageButton = document.querySelector(".left-btn");
const $nextPageButton = document.querySelector(".right-btn");

const pressIcons = shuffleArrayRandom(ObjectToArrayRandom(PRESS_ICON));
const maxPage = Math.floor(pressIcons.length / NEWS_COUNT) - 1;

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

const setGridButtonDisplay = () => {
  const currentPage = getState(gridPageState);

  if (getState(isListActivateState)) {
    $nextPageButton.classList.contains("hidden") &&
      $nextPageButton.classList.remove("hidden");
    $prevPageButton.classList.contains("hidden") &&
      $prevPageButton.classList.remove("hidden");

    return;
  }

  if (currentPage === maxPage) {
    $nextPageButton.classList.add("hidden");
  } else {
    $nextPageButton.classList.contains("hidden") &&
      $nextPageButton.classList.remove("hidden");
  }

  if (currentPage === 0) {
    $prevPageButton.classList.add("hidden");
  } else {
    $prevPageButton.classList.contains("hidden") &&
      $prevPageButton.classList.remove("hidden");
  }
};

export { fillPressIcons, setGridButtonDisplay };
