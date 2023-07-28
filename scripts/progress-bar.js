import { CATEGORIES } from "../constants/index.js";
import { NewsDB } from "../core/db.js";
import { appStore, useSelector } from "../store/index.js";
import { nextCategory, nextPage } from "../store/reducer/page.js";

const $listViewTab = document.querySelector(".list-view_tab");

function handleProgressAnimationIteration() {
  const { currentCategoryIdx, currentPage } = useSelector({
    store: appStore,
    selector: (state) => state.page,
  });
  const currentCategory = CATEGORIES[currentCategoryIdx];
  const totalCount = NewsDB.getCountByCategory(currentCategory);

  if (totalCount - 1 === currentPage) {
    appStore.dispatch(nextCategory());
  } else {
    appStore.dispatch(nextPage());
  }
}

export function resetProgress() {
  const $categorySelected = $listViewTab.querySelector(".category-selected");
  const $progressBar = $categorySelected.querySelector(
    ".category-selected > .tab_progress-bar"
  );

  $categorySelected.removeChild($progressBar);
  $categorySelected.insertBefore($progressBar, $categorySelected.firstChild);
}

export function addEventHandlerOnProgressBar() {
  $listViewTab.addEventListener(
    "animationiteration",
    handleProgressAnimationIteration
  );
}
