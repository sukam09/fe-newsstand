import {
  categoryState,
  viewState,
  listPageState,
  subscribeState,
  selectedSubscribeState,
  viewOptionState,
  subscribeListPageState,
} from "../../../store/store.js";
import {
  CATEGORY_LENGTH,
  PROGRESS_DIFF,
  PROGRESS_MAX,
  PROGRESS_TIME,
  VIEW_OPTION_TYPE,
  VIEW_TYPE,
} from "../../../constants/constants.js";
import {
  _querySelector,
  _querySelectorAll,
} from "../../../utils/my-query-selector.js";
import { getState, setState } from "../../../observer/observer.js";
import { checkIsAllType, checkIsGridView } from "../../../utils/utils.js";

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

const changePress = (pressNewsList) => () => {
  const isAllType = checkIsAllType();
  if (isAllType) return;
  const isGridView = checkIsGridView();
  if (isGridView) return;

  const currentPress = getState(selectedSubscribeState);
  const currentPage = getState(subscribeListPageState);
  const subscribeList = getState(subscribeState);
  const subLength = subscribeList.length;

  if (currentPage === pressNewsList[currentPress].length) {
    const nextPressIndex =
      (subscribeList.indexOf(currentPress) + 1) % subLength;

    setState(selectedSubscribeState, subscribeList[nextPressIndex]);
  } else if (currentPage === -1) {
    const prevPressIndex =
      (subscribeList.indexOf(currentPress) + subLength - 1) % subLength;

    setState(selectedSubscribeState, subscribeList[prevPressIndex]);
  }
};

const initListPageState = () => {
  setState(listPageState, 0);
};
const initSubscribeListPageState = () => {
  setState(subscribeListPageState, 0);
};

let timeElapsed = 0;
let interval;
const startProgress = () => {
  const { key, currentPage } = getPageKey();

  stopProgress();

  interval = setInterval(() => {
    timeElapsed += PROGRESS_DIFF;
    updateProgress();

    if (timeElapsed === PROGRESS_MAX) {
      timeElapsed = 0;

      updateProgress();

      setState(key, currentPage + 1);
    }
  }, PROGRESS_TIME);
};

const getPageKey = () => {
  const currentOption = getState(viewOptionState);
  const key =
    currentOption === VIEW_OPTION_TYPE.ALL
      ? listPageState
      : subscribeListPageState;

  const currentPage = getState(key);

  return { key, currentPage };
};

const stopProgress = () => {
  timeElapsed = 0;
  clearInterval(interval);
  updateProgress();
};
const updateProgress = () => {
  const $progress = _querySelector(".progress");
  if ($progress) $progress.style.width = timeElapsed + "%";
};

const initProgress = () => {
  const currentViewState = getState(viewState);

  currentViewState === VIEW_TYPE.LIST ? startProgress() : stopProgress();
};

const updateCurrentPage = () => {
  const $progressComponent = _querySelector(".progress-component");
  const $progressComponentDiv = _querySelector("div", $progressComponent);
  const $stateElem = _querySelector("span", $progressComponentDiv);

  const nextPage = getState(listPageState) + 1;
  $stateElem.innerHTML = nextPage;
};

const setCategoryBar = (categoryList) => () => {
  $categoryBar.innerHTML = "";

  categoryList.forEach((category) => {
    const $li = document.createElement("li");
    $li.innerHTML = category;
    $li.className = "hover-underline";
    $li.addEventListener("click", setCategoryState(category));

    $categoryBar.appendChild($li);
  });

  const currentCategory = getState(categoryState);
  if (currentCategory) {
    setCategoryState(currentCategory)();
  } else {
    setCategoryState(categoryList[0])();
  }
};
const setCategoryState = (category) => () => setState(categoryState, category);

const setSubscribePressBar = () => {
  const isAllType = checkIsAllType();
  if (isAllType) return;
  const isGridView = checkIsGridView();
  if (isGridView) return;

  const subscribedList = getState(subscribeState);
  $categoryBar.innerHTML = "";

  subscribedList.forEach((press) => {
    const $li = document.createElement("li");
    $li.innerHTML = press;
    $li.className = "hover-underline available-medium14 ";
    $li.addEventListener("click", setSelectedSubState(press));

    $categoryBar.appendChild($li);
  });

  const currentSelectedSubState = getState(selectedSubscribeState);
  if (currentSelectedSubState) {
    setSelectedSubState(currentSelectedSubState)();
  } else {
    setSelectedSubState(subscribedList[0])();
  }
};
const setSelectedSubState = (press) => () => {
  setState(selectedSubscribeState, press);
};

const setHeaderBar = (categoryList) => () => {
  const isListView = !checkIsGridView();
  const isAllType = checkIsAllType();

  if (isListView) {
    isAllType ? setCategoryBar(categoryList)() : setSubscribePressBar();
  }
};

const changeActivateCategory = (newsList, categoryList) => () => {
  const isGridView = checkIsGridView();
  if (isGridView) return;

  const isSubscribeType = !checkIsAllType();
  if (isSubscribeType) return;

  const currentCategory = getState(categoryState);
  const $liList = _querySelectorAll("li", $categoryBar);
  const maxPage = newsList[currentCategory].length;
  const currentCategoryIndex = categoryList.indexOf(currentCategory);

  $liList.forEach((li, idx) => {
    if (idx === currentCategoryIndex) {
      li.classList = "category--selected";
      li.innerHTML = createCategoryProgressInner(
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

  initListPageState();
};

const changeActivatePress = () => {
  const isGridView = checkIsGridView();
  if (isGridView) return;

  const isAllType = checkIsAllType();
  if (isAllType) return;

  const $liList = _querySelectorAll("li", $categoryBar);
  const subscribed = getState(subscribeState);
  const selectedSub = getState(selectedSubscribeState);
  const currentSubIndex = subscribed.indexOf(selectedSub);

  $liList.forEach((li, idx) => {
    if (idx === currentSubIndex) {
      li.classList = "category--selected";
      li.innerHTML = createPressProgressInner(subscribed[idx]);
    } else {
      if (li.classList.contains("category--selected")) {
        li.classList = "hover-underline";
        li.innerHTML = subscribed[idx];
      }
    }
  });

  activatePressScroll();
};

const activatePressScroll = () => {
  const wrapper = _querySelector(".list-view_category-bar");
  const container = _querySelector("ul", wrapper);
  const targetElement = _querySelector(".category--selected", container);

  const containerLeft = wrapper.getBoundingClientRect().left;
  const targetLeft = targetElement.getBoundingClientRect().left;

  const scrollDuration = 500;
  const startTime = performance.now();
  const originalScrollLeft = wrapper.scrollLeft;
  const targetScrollLeft = wrapper.scrollLeft + targetLeft - containerLeft;

  function smoothScroll(timestamp) {
    const currentTime = timestamp - startTime;
    if (currentTime >= scrollDuration) {
      wrapper.scrollLeft = targetScrollLeft;
      return;
    }

    const easeValue = easeInOutQuad(
      currentTime,
      originalScrollLeft,
      targetScrollLeft - originalScrollLeft,
      scrollDuration
    );
    wrapper.scrollLeft = easeValue;

    requestAnimationFrame(smoothScroll);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(smoothScroll);
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

const createCategoryProgressInner = (title, state, max) => {
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
const createPressProgressInner = (title) => {
  return `
    <div class="progress"></div>
    <div class="progress-component">
      <span class="hover-underline display-bold14">${title}</span>
      <div class="display-bold12">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.48329 10.5L4.66663 9.68333L7.34996 7L4.66663 4.31667L5.48329 3.5L8.98329 7L5.48329 10.5Z"
            fill="white"
          />
        </svg>
      </div>
    </div>`;
};

export {
  updateCurrentPage,
  startProgress,
  stopProgress,
  changeCategory,
  changeActivateCategory,
  initProgress,
  initSubscribeListPageState,
  setPageActivateState,
  setSubscribePressBar,
  setHeaderBar,
  changePress,
  changeActivatePress,
};
