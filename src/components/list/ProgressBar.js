import {
  CATEGORY_LENGTH,
  PROGRESS_DIFF,
  PROGRESS_MAX,
  PROGRESS_TIME,
} from "../../constants/constants.js";
import { getState, setState } from "../../observer/observer.js";
import { categoryState, listPageState } from "../../store/store.js";

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

    setState(listPageState, 0);
    setState(categoryState, categoryList[prevCategoryIndex]);
  }
};

const updateProgress = () => {
  const $progress = document.querySelector(".progress");
  $progress.style.width = timeElapsed + "%";
};

let timeElapsed = 0;
let interval;
const startProgress = () => {
  timeElapsed = 0;
  clearInterval(interval);
  updateProgress();

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
  clearInterval(interval);
  timeElapsed = 0;
  updateProgress();
};

const updateCurrentPage = () => {
  const $stateElem = document.querySelector(".progress-component > div > span");

  $stateElem.innerHTML = getState(listPageState) + 1;
};

const setCategoryState = (category) => () => setState(categoryState, category);

const setCategoryBar = (categoryList) => {
  categoryList.forEach((category) => {
    const $li = document.createElement("li");
    $li.innerHTML = category;

    $li.addEventListener("click", setCategoryState(category));

    $categoryBar.appendChild($li);
  });
};

const changeActivateCategory = (newsList, categoryList) => () => {
  const maxPage = newsList[getState(categoryState)].length;
  const $liList = $categoryBar.querySelectorAll("li");

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

  setState(listPageState, 0);
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

export {
  updateCurrentPage,
  setCategoryBar,
  startProgress,
  stopProgress,
  changeCategory,
  changeActivateCategory,
};
