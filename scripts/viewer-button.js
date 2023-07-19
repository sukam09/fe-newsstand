import { store, useSelector } from "../store/index.js";
import { changeView } from "../store/reducer/page.js";
import { VIEW_TYPE } from "../constants/index.js";
import { $gridView, $listView, $mainNav } from "./doms.js";

const $mainNavViewerButtons = $mainNav.querySelectorAll(
  ".main-nav_viewer > button"
);

const handleViewerButtonClick = (e) => {
  const viewType = e.currentTarget.dataset.view;
  store.dispatch(changeView(viewType));
};

export const addEventOnViewerButton = () => {
  store.subscribe(() => {
    const viewType = useSelector((state) => state.page.viewType);

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
