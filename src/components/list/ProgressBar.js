import { getState, setState } from "../../observer/observer.js";
import { categoryState, listPageState } from "../../store/store.js";

const changeNextCategory = (newsList, categoryList) => () => {
  const currentCategory = getState(categoryState);
  const currentPage = getState(listPageState);

  if (currentPage === newsList[currentCategory].length) {
    const nextCategoryIndex = (categoryList.indexOf(currentCategory) + 1) % 7;

    setState(categoryState, categoryList[nextCategoryIndex]);
  }
};

const $categoryBar = document.querySelector(".list-view_category-bar > ul");

let timeElapsed = 0;
let interval;

const updateProgress = () => {
  const $progress = document.querySelector(".progress");
  $progress.style.width = timeElapsed + "%";
};

const startProgress = () => {
  timeElapsed = 0;
  clearInterval(interval);

  interval = setInterval(() => {
    timeElapsed += 50;
    updateProgress();

    if (timeElapsed === 100) {
      timeElapsed = 0;

      updateProgress();
      setState(listPageState, getState(listPageState) + 1);
    }
  }, 1000);
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

const createProgressInner = (title, state, max) => {
  const $progressInner = `<div class="progress"></div>
  <div class="progress-component">
    <span class="display-bold14">${title}</span>
    <div class="display-bold12">
      <span>${state}</span>
      <span class="font-deactivate">/${max}</span>
    </div>
  </div>`;

  return $progressInner;
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

export {
  updateCurrentPage,
  setCategoryBar,
  startProgress,
  stopProgress,
  changeNextCategory,
  changeActivateCategory,
};
