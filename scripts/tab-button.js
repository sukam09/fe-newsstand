import { store, useSelector } from "../store/index.js";
import { changeTab } from "../store/reducer/page.js";
import { $mainNav } from "./doms.js";

const $mainNavTabs = $mainNav.querySelector(".main-nav_tabs");
const $mainNavButtons = $mainNavTabs.querySelectorAll("button");

function handleTabsClick(e) {
  const $currentButton = e.target.closest("button");
  if (!$currentButton) {
    return;
  }
  const subcribeList = useSelector({
    store,
    selector: (state) => state.subscribeList,
  });

  if (subcribeList.length === 0) {
    alert("구독한 언론사가 없습니다.");
    return;
  }

  const tabType = $currentButton.dataset.tab;
  activateCurrentTab(tabType);

  store.dispatch(changeTab(tabType));
}

export function activateCurrentTab(tabType) {
  $mainNavButtons.forEach(($button) => {
    const type = $button.dataset.tab;
    if (type === tabType) {
      $button.classList.add("main-nav_tabs--selected");
      $button.classList.replace("available-medium16", "selected-bold16");
      return;
    }

    $button.classList.remove("main-nav_tabs--selected");
    $button.classList.replace("selected-bold16", "available-medium16");
  });
}

export function addEventOnTabs() {
  $mainNavTabs.addEventListener("click", handleTabsClick);
}
