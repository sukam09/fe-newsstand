import {
  addEventsOnCategoryItem,
  addEventsOnGridItem,
  addEventsOnPageButton,
  addEventsOnRollingList,
  addEventsOnSubButton,
  addEventsOnThemeButton,
  addEventsOnTitle,
  addEventsOnViewButton,
} from "./events.js";
import { addObserverOnIsSub } from "./observers.js";
import {
  addObserverOnGridPage,
  addObserverOnListPage,
  addObserverOnPageType,
} from "./pageController.js";

export function initEvents() {
  addEventsOnGridItem();
  addEventsOnPageButton();
  addEventsOnSubButton();
  addEventsOnViewButton();
  addEventsOnCategoryItem();
  addEventsOnThemeButton();
  addEventsOnRollingList();
  addEventsOnTitle();
}

export function initObservers() {
  addObserverOnGridPage();
  addObserverOnListPage();
  addObserverOnPageType();
  addObserverOnIsSub();
}
