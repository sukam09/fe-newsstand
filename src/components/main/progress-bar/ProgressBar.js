import {
  useGetAtom,
  useGetSelector,
  useSetAtom,
  useSetSelector,
} from "../../../store/atom.js";
import {
  categoryState,
  viewState,
  listPageState,
  subscribeState,
  selectedSubscribeState,
  subscribeListPageState,
  pageSelector,
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
import { checkIsAllType, checkIsGridView } from "../../../utils/utils.js";

const $categoryBarWrapper = _querySelector(".list-view_category-bar");
const $categoryBar = _querySelector("ul", $categoryBarWrapper);

const changeCategory = (newsList, categoryList) => () => {
  const currentCategory = useGetAtom(categoryState);
  const currentPage = useGetAtom(listPageState);

  if (currentPage === newsList[currentCategory].length) {
    const nextCategoryIndex =
      (categoryList.indexOf(currentCategory) + 1) % CATEGORY_LENGTH;

    useSetAtom(categoryState, categoryList[nextCategoryIndex]);
  } else if (currentPage === -1) {
    const prevCategoryIndex =
      (categoryList.indexOf(currentCategory) + CATEGORY_LENGTH - 1) %
      CATEGORY_LENGTH;

    useSetAtom(categoryState, categoryList[prevCategoryIndex]);
  }
};

const changePress = (pressNewsList) => () => {
  const isAllType = checkIsAllType();
  const isGridView = checkIsGridView();

  if (isAllType || isGridView) return;

  const currentPress = useGetAtom(selectedSubscribeState);
  const currentPage = useGetAtom(subscribeListPageState);
  const subscribeList = useGetAtom(subscribeState);
  const subLength = subscribeList.length;

  if (currentPage === pressNewsList[currentPress].length) {
    const nextPressIndex =
      (subscribeList.indexOf(currentPress) + 1) % subLength;

    useSetAtom(selectedSubscribeState, subscribeList[nextPressIndex]);
  } else if (currentPage === -1) {
    const prevPressIndex =
      (subscribeList.indexOf(currentPress) + subLength - 1) % subLength;

    useSetAtom(selectedSubscribeState, subscribeList[prevPressIndex]);
  }
};

const initListPageState = () => {
  useSetAtom(listPageState, 0);
};
const initSubscribeListPageState = () => {
  useSetAtom(subscribeListPageState, 0);
};

let timeElapsed = 0;
let interval;
const startProgress = () => {
  const currentPage = useGetSelector(pageSelector);

  stopProgress();

  interval = setInterval(() => {
    timeElapsed += PROGRESS_DIFF;
    updateProgress();

    if (timeElapsed === PROGRESS_MAX) {
      timeElapsed = 0;

      updateProgress();

      useSetSelector(pageSelector, currentPage + 1);
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
  if ($progress) $progress.style.width = timeElapsed + "%";
};

const initProgress = () => {
  const currentViewState = useGetAtom(viewState);

  currentViewState === VIEW_TYPE.LIST ? startProgress() : stopProgress();
};

const updateCurrentPage = (newsList) => () => {
  const currentPage = useGetAtom(listPageState);
  const currentCategory = useGetAtom(categoryState);
  const maxPage = newsList[currentCategory].length - 1;

  const $progressComponent = _querySelector(".progress-component");
  const $progressComponentDiv = _querySelector("div", $progressComponent);
  const $stateElem = _querySelector("span", $progressComponentDiv);

  $stateElem.innerHTML = currentPage + 1;

  setPageActivateState(currentPage, maxPage);
};

const setPageActivateState = (currentPage, maxPage) => {
  const $maxPage = _querySelectorAll(".progress-span")[1];

  if (currentPage === maxPage) {
    $maxPage.classList.replace("font-deactivate", "font-activate");
  } else {
    $maxPage.classList.contains("font-activate") &&
      $maxPage.classList.replace("font-activate", "font-deactivate");
  }
};

const changeActivateCategory = (newsList, categoryList) => () => {
  const isGridView = checkIsGridView();
  const isSubscribeType = !checkIsAllType();

  if (isGridView || isSubscribeType) return;

  const currentCategory = useGetAtom(categoryState);
  const $liList = _querySelectorAll("li", $categoryBar);
  const maxPage = newsList[currentCategory].length;
  const currentCategoryIndex = categoryList.indexOf(currentCategory);

  $liList.forEach((li, idx) => {
    if (idx === currentCategoryIndex) {
      li.classList = "category--selected";
      li.innerHTML = createCategoryProgressInner(
        categoryList[idx],
        useGetAtom(listPageState) + 1,
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
  const isAllType = checkIsAllType();

  if (isGridView || isAllType) return;

  const $liList = _querySelectorAll("li", $categoryBar);
  const subscribed = useGetAtom(subscribeState);
  const selectedSub = useGetAtom(selectedSubscribeState);
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
  initSubscribeListPageState();
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

  const smoothScroll = (timestamp) => {
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
  };

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(smoothScroll);
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
  changePress,
  changeActivatePress,
};
