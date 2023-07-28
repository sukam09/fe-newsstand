import { appStore, useSelector } from "../store/index.js";
import { changeView } from "../store/reducer/page.js";
import { VIEW_TYPE } from "../constants/index.js";
import { $gridView, $listView, $mainNav } from "./doms.js";

const $mainNavViewerButtons = $mainNav.querySelectorAll(
  ".main-nav_viewer > button"
);

function handleViewerButtonClick(e) {
  const viewType = e.currentTarget.dataset.view;
  appStore.dispatch(changeView(viewType));
}

function viewerButtonSubscriber() {
  const viewType = useSelector({
    store: appStore,
    selector: (state) => state.page.viewType,
  });

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
}

export function addEventHandlerOnViewerButton() {
  $mainNavViewerButtons.forEach(($button) => {
    $button.addEventListener("click", handleViewerButtonClick);
  });
}

appStore.subscribe(viewerButtonSubscriber);
