import {
  gridPageState,
  subscribeGridPageState,
  subscribeState,
  pageSelector,
} from "../../../store/store.js";
import {
  useGetAtom,
  useGetSelector,
  useSetSelector,
} from "../../../store/atom.js";
import {
  pressObjectToArray,
  checkIsAllType,
  checkIsGridView,
} from "../../../utils/utils.js";
import { _querySelector } from "../../../utils/my-query-selector.js";
import { NEWS_COUNT, PRESS_ICON } from "../../../constants/constants.js";

const $prevPageButton = _querySelector(".left-btn");
const $nextPageButton = _querySelector(".right-btn");

const getMaxPage = () => {
  const allPress = pressObjectToArray(PRESS_ICON);
  const subscribedPress = useGetAtom(subscribeState);
  const isAllType = checkIsAllType();

  const pressLenth = isAllType ? allPress.length : subscribedPress.length;
  const maxPage = Math.ceil(pressLenth / NEWS_COUNT) - 1;

  return maxPage;
};

const handlePrevButtonClick = () => {
  const currentPage = useGetSelector(pageSelector);

  useSetSelector(pageSelector, currentPage - 1);
};

const handleNextButtonClick = () => {
  const currentPage = useGetSelector(pageSelector);

  useSetSelector(pageSelector, currentPage + 1);
};

const setGridButtonDisplay = () => {
  const isListView = !checkIsGridView();
  if (isListView) return;

  const maxPage = getMaxPage();
  const isAllType = checkIsAllType();
  const currentGridPage = useGetAtom(gridPageState);
  const currentSubGridPage = useGetAtom(subscribeGridPageState);

  const currentPage = isAllType ? currentGridPage : currentSubGridPage;

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
