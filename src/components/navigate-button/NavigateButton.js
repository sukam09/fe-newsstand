import {
  gridPageState,
  isListActivateState,
  listPageState,
} from "../../store/store.js";
import { ObjectToArrayRandom } from "../../utils/utils.js";
import { getState, setState } from "../../observer/observer.js";
import { _querySelector } from "../../utils/my-query-selector.js";
import { NEWS_COUNT, PRESS_ICON } from "../../constants/constants.js";

const $prevPageButton = _querySelector(".left-btn");
const $nextPageButton = _querySelector(".right-btn");
const maxPage =
  Math.floor(ObjectToArrayRandom(PRESS_ICON).length / NEWS_COUNT) - 1;

const handlePrevButtonClick = () => {
  if (getState(isListActivateState))
    setState(listPageState, getState(listPageState) - 1);
  else setState(gridPageState, getState(gridPageState) - 1);
};

const handleNextButtonClick = () => {
  if (getState(isListActivateState))
    setState(listPageState, getState(listPageState) + 1);
  else setState(gridPageState, getState(gridPageState) + 1);
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
  if (getState(isListActivateState)) {
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
