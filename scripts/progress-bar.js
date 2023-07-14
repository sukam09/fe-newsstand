import { NewsDB } from "../core/db.js";
import { store, useSelector } from "../store/index.js";
import { nextCategory, nextPage } from "../store/reducer/page.js";

const $listViewTab = document.querySelector(".list-view_tab");

const handleProgressAnimationIteration = () => {
  const { currentCategory, currentPage } = useSelector((state) => state.page);
  const totalCount = NewsDB.getCountByCategory(currentCategory);

  if (totalCount - 1 === currentPage) {
    store.dispatch(nextCategory());
  } else {
    store.dispatch(nextPage());
  }
};

export const resetProgress = () => {
  const $categorySelected = $listViewTab.querySelector(".category-selected");
  const $progressBar = $categorySelected.querySelector(
    ".category-selected > .tab_progress-bar"
  );

  $categorySelected.removeChild($progressBar);
  $categorySelected.insertBefore($progressBar, $categorySelected.firstChild);
};

export const addEventOnProgressBar = () => {
  $listViewTab.addEventListener(
    "animationiteration",
    handleProgressAnimationIteration
  );
};
