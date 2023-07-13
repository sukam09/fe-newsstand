import { store } from "../store/index.js";
import { changeView } from "../store/reducer.js";
import { VIEW_TYPE } from "../constants/index.js";
import { $gridView, $listView } from "./doms.js";

const $mainNav = document.querySelector(".main-nav");
const $mainNavViewerButtons = $mainNav.querySelectorAll(
  ".main-nav_viewer > button"
);

const handleViewerButtonClick = (e) => {
  const viewType = e.currentTarget.dataset.view;
  store.dispatch(changeView(viewType));
};

export const addEventOnViewerButton = () => {
  store.subscribe(() => {
    const viewType = store.getState().viewType;

    $mainNavViewerButtons.forEach(($button) => {
      if (viewType !== $button.dataset.view) {
        $button.classList.remove("main-nav_viewer--selected");
      } else {
        $button.classList.add("main-nav_viewer--selected");
      }
    });

    if (viewType === VIEW_TYPE.GRID) {
      $gridView.classList.remove("hidden");
      $listView.classList.add("hidden");
    } else {
      $gridView.classList.add("hidden");
      $listView.classList.remove("hidden");
    }
  });

  $mainNavViewerButtons.forEach(($button) => {
    $button.addEventListener("click", handleViewerButtonClick);
  });
};
