import { store } from "../store/index.js";
import { changeTab } from "../store/reducer/page.js";
import { $mainNav } from "./doms.js";

const $mainNavTabs = $mainNav.querySelector(".main-nav_tabs");
const $mainNavButtons = $mainNavTabs.querySelectorAll("button");

const handleTabsClick = (e) => {
  const $currentButton = e.target.closest("button");
  if (!$currentButton) {
    return;
  }
  const tabType = $currentButton.dataset.tab;

  $mainNavButtons.forEach(($button) => {
    if ($button === $currentButton) {
      $button.classList.add("main-nav_tabs--selected");
      $button.classList.replace("available-medium16", "selected-bold16");
      return;
    }

    $button.classList.remove("main-nav_tabs--selected");
    $button.classList.replace("selected-bold16", "available-medium16");
  });

  store.dispatch(changeTab(tabType));
};

export const addEventOnTabs = () => {
  $mainNavTabs.addEventListener("click", handleTabsClick);
};
