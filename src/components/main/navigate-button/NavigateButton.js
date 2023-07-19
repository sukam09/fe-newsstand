import {
  gridPageState,
  viewState,
  listPageState,
  viewOptionState,
  subscribeGridPageState,
  subscribeListPageState,
} from "../../../store/store.js";
import {
  NEWS_COUNT,
  VIEW_OPTION_TYPE,
  VIEW_TYPE,
} from "../../../constants/constants.js";
import { getPressIcons } from "../grid/Grid.js";
import {
  ObjectToArrayRandom,
  checkIsAllType,
  checkIsGridView,
} from "../../../utils/utils.js";
import { getState, setState } from "../../../observer/observer.js";
import { _querySelector } from "../../../utils/my-query-selector.js";

const $prevPageButton = _querySelector(".left-btn");
const $nextPageButton = _querySelector(".right-btn");

const getMaxPage = () => {
  const pressIcons = getPressIcons();

  return Math.ceil(ObjectToArrayRandom(pressIcons).length / NEWS_COUNT) - 1;
};

const handlePrevButtonClick = () => {
  const viewStateKey = getViewStateKey();
  const currentPage = getState(viewStateKey);

  setState(viewStateKey, currentPage - 1);
};

const handleNextButtonClick = () => {
  const viewStateKey = getViewStateKey();
  const currentPage = getState(viewStateKey);

  setState(viewStateKey, currentPage + 1);
};

const getViewStateKey = () => {
  const currentViewState = getState(viewState);
  const isAllType = checkIsAllType();

  switch (currentViewState) {
    case VIEW_TYPE.LIST:
      if (isAllType) return listPageState;
      return subscribeListPageState;
    case VIEW_TYPE.GRID:
      if (isAllType) return gridPageState;
      return subscribeGridPageState;
  }

  return;
};

const setGridButtonDisplay = () => {
  const maxPage = getMaxPage();
  const isAllType = checkIsAllType();

  const currentPage = isAllType
    ? getState(gridPageState)
    : getState(subscribeGridPageState);

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

const toggleNavigateButtonDisplay = () => {
  const isListView = !checkIsGridView();

  if (isListView) {
    $nextPageButton.classList.contains("hidden") &&
      $nextPageButton.classList.remove("hidden");

    $prevPageButton.classList.contains("hidden") &&
      $prevPageButton.classList.remove("hidden");

    return;
  }

  setGridButtonDisplay();
};

const setEvents = () => {
  $prevPageButton.addEventListener("click", handlePrevButtonClick);
  $nextPageButton.addEventListener("click", handleNextButtonClick);
};

export { setGridButtonDisplay, toggleNavigateButtonDisplay, setEvents };
