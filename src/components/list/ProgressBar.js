import {
  categoryState,
  isListActivateState,
  listPageState,
} from "../../store/store.js";
import {
  CATEGORY_LENGTH,
  PROGRESS_DIFF,
  PROGRESS_MAX,
  PROGRESS_TIME,
} from "../../constants/constants.js";
import { getState, setState } from "../../observer/observer.js";

const $categoryBar = document.querySelector(".list-view_category-bar > ul");

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
  const $progress = document.querySelector(".progress");
  $progress.style.width = timeElapsed + "%";
};

const initProgress = () => {
  getState(isListActivateState) ? startProgress() : stopProgress();
};

const updateCurrentPage = () => {
  const $stateElem = document.querySelector(".progress-component > div > span");

  $stateElem.innerHTML = getState(listPageState) + 1;
};

const setCategoryBar = (categoryList) => {
  categoryList.forEach((category) => {
    const $li = document.createElement("li");
    $li.innerHTML = category;

    $li.addEventListener("click", setCategoryState(category));

    $categoryBar.appendChild($li);
  });

  setCategoryState(categoryList[0])();
};
const setCategoryState = (category) => () => setState(categoryState, category);

const changeActivateCategory = (newsList, categoryList) => () => {
  const $liList = $categoryBar.querySelectorAll("li");
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
        li.classList = "";
        li.innerHTML = categoryList[idx];
      }
    }
  });
};

const createProgressInner = (title, state, max) => {
  return `<div class="progress"></div>
  <div class="progress-component">
    <span class="display-bold14">${title}</span>
    <div class="display-bold12">
      <span>${state}</span>
      <span class="font-deactivate">/${max}</span>
    </div>
  </div>`;
};

const setPageActivateState = (newsList) => () => {
  const $maxPage = document.querySelectorAll(
    ".progress-component > div > span"
  )[1];

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
