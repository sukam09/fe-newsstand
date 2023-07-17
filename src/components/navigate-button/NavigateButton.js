import {
  NEWS_COUNT,
  PRESS_ICON,
  VIEW_TYPE,
} from "../../constants/constants.js";
import { ObjectToArrayRandom } from "../../utils/utils.js";
import { getState, setState } from "../../observer/observer.js";
import { _querySelector } from "../../utils/my-query-selector.js";
import { gridPageState, viewState, listPageState } from "../../store/store.js";

const $prevPageButton = _querySelector(".left-btn");
const $nextPageButton = _querySelector(".right-btn");

const maxPage =
  Math.floor(ObjectToArrayRandom(PRESS_ICON).length / NEWS_COUNT) - 1;

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

  switch (currentViewState) {
    case VIEW_TYPE.LIST:
      return listPageState;
    case VIEW_TYPE.GRID:
      return gridPageState;
  }

  return;
};

const setGridButtonDisplay = () => {
  const currentPage = getState(gridPageState);

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
