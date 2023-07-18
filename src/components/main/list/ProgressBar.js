import {
  categoryState,
  viewState,
  listPageState,
} from "../../../store/store.js";
import {
  CATEGORY_LENGTH,
  PROGRESS_DIFF,
  PROGRESS_MAX,
  PROGRESS_TIME,
  VIEW_TYPE,
} from "../../../constants/constants.js";
import {
  _querySelector,
  _querySelectorAll,
} from "../../../utils/my-query-selector.js";
import { getState, setState } from "../../../observer/observer.js";

const $categoryBarWrapper = _querySelector(".list-view_category-bar");
const $categoryBar = _querySelector("ul", $categoryBarWrapper);

const changeCategory = (newsList, categoryList) => () => {
  const currentCategory = getState(categoryState);
  const currentPage = getState(listPageState);

  if (currentPage === newsList[currentCategory].length) {
    const nextCategoryIndex =
      (categoryList.indexOf(currentCategory) + 1) % CATEGORY_LENGTH;

    setState(categoryState, categoryList[nextCategoryIndex]);
  } else if (currentPage === -1) {
    const prevCategoryIndex =
      (categoryList.indexOf(currentCategory) + CATEGORY_LENGTH - 1) %
      CATEGORY_LENGTH;

    setState(categoryState, categoryList[prevCategoryIndex]);
  }
};

const initListPageState = () => {
  setState(listPageState, 0);
};

let timeElapsed = 0;
let interval;
const startProgress = () => {
  stopProgress();

  interval = setInterval(() => {
    timeElapsed += PROGRESS_DIFF;
    updateProgress();

    if (timeElapsed === PROGRESS_MAX) {
      timeElapsed = 0;

      updateProgress();
      setState(listPageState, getState(listPageState) + 1);
    }
  }, PROGRESS_TIME);
};

const stopProgress = () => {
  timeElapsed = 0;
  clearInterval(interval);
  updateProgress();
};

const updateProgress = () => {
  const $progress = _querySelector(".progress");

  $progress.style.width = timeElapsed + "%";
};

const initProgress = () => {
  const currentViewState = getState(viewState);

  currentViewState === VIEW_TYPE.LIST ? startProgress() : stopProgress();
};

const updateCurrentPage = () => {
  const $progressComponent = _querySelector(".progress-component");
  const $progressComponentDiv = _querySelector("div", $progressComponent);
  const $stateElem = _querySelector("span", $progressComponentDiv);

  $stateElem.innerHTML = getState(listPageState) + 1;
};

const setCategoryBar = (categoryList) => {
  categoryList.forEach((category) => {
    const $li = document.createElement("li");
    $li.innerHTML = category;
    $li.className = "hover-underline";
    $li.addEventListener("click", setCategoryState(category));

    $categoryBar.appendChild($li);
  });

  setCategoryState(categoryList[0])();
};
const setCategoryState = (category) => () => setState(categoryState, category);

const changeActivateCategory = (newsList, categoryList) => () => {
  const $liList = _querySelectorAll("li", $categoryBar);
  const maxPage = newsList[getState(categoryState)].length;
  const currentCategoryIndex = categoryList.indexOf(getState(categoryState));

  $liList.forEach((li, idx) => {
    if (idx === currentCategoryIndex) {
      li.classList = "category--selected";
      li.innerHTML = createProgressInner(
        categoryList[idx],
        getState(listPageState) + 1,
        maxPage
      );
    } else {
      if (li.classList.contains("category--selected")) {
        li.classList = "hover-underline";
        li.innerHTML = categoryList[idx];
      }
    }
  });
};

const createProgressInner = (title, state, max) => {
  return `
    <div class="progress"></div>
    <div class="progress-component">
      <span class="hover-underline display-bold14">${title}</span>
      <div class="display-bold12">
        <span class="progress-span">${state}</span>
        <span class="progress-span font-deactivate">/${max}</span>
      </div>
    </div>`;
};

const setPageActivateState = (newsList) => () => {
  const $maxPage = _querySelectorAll(".progress-span")[1];

  const currentCategory = getState(categoryState);
  const currentPage = getState(listPageState);

  if (currentPage === newsList[currentCategory].length - 1) {
    $maxPage.classList.replace("font-deactivate", "font-activate");
  } else {
    $maxPage.classList.contains("font-activate") &&
      $maxPage.classList.replace("font-activate", "font-deactivate");
  }
};

export {
  updateCurrentPage,
  setCategoryBar,
  startProgress,
  stopProgress,
  changeCategory,
  changeActivateCategory,
  initProgress,
  initListPageState,
  setPageActivateState,
};
