import {
  gridPageState,
  viewState,
  listPageState,
  viewOptionState,
  subscribeGridPageState,
} from "../../../store/store.js";
import {
  NEWS_COUNT,
  PRESS_ICON,
  VIEW_OPTION_TYPE,
  VIEW_TYPE,
} from "../../../constants/constants.js";
import { getPressIcons } from "../grid/Grid.js";
import { ObjectToArrayRandom } from "../../../utils/utils.js";
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
  console.log(getState(viewStateKey));
};

const handleNextButtonClick = () => {
  const viewStateKey = getViewStateKey();
  const currentPage = getState(viewStateKey);

  setState(viewStateKey, currentPage + 1);
  console.log(getState(viewStateKey));
};

const getViewStateKey = () => {
  const currentViewState = getState(viewState);
  const currentViewOptionState = getState(viewOptionState);

  switch (currentViewState) {
    // todo
    case VIEW_TYPE.LIST:
      return listPageState;
    case VIEW_TYPE.GRID:
      if (currentViewOptionState === VIEW_OPTION_TYPE.ALL) return gridPageState;
      return subscribeGridPageState;
  }

  return;
};

const setGridButtonDisplay = () => {
  const maxPage = getMaxPage();
  const currentViewOption = getState(viewOptionState);
  const currentPage =
    currentViewOption === VIEW_OPTION_TYPE.ALL
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
  const currentPage = getState(viewState);

  if (currentPage === VIEW_TYPE.LIST) {
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
