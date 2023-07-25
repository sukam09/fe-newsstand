import {
  addEventsOnCategoryItem,
  addEventsOnGridItem,
  addEventsOnListSubButton,
  addEventsOnPageButton,
  addEventsOnPageModeButton,
  addEventsOnRollingList,
  addEventsOnSubButton,
  addEventsOnThemeButton,
  addEventsOnTitle,
  addEventsOnViewButton,
} from "./events.js";
import {
  addObserverOnIsSub,
  addObserverOnMyPress,
  addObserverOnPageMode,
} from "./observers.js";
import {
  addObserverOnGridPage,
  addObserverOnListPage,
} from "./pageController/pageController.js";
import { addObserverOnPageType } from "./pageController/typeController.js";

export function initEvents() {
  addEventsOnGridItem();
  addEventsOnPageButton();
  addEventsOnSubButton();
  addEventsOnViewButton();
  addEventsOnCategoryItem();
  addEventsOnThemeButton();
  addEventsOnRollingList();
  addEventsOnTitle();
  addEventsOnListSubButton();
  addEventsOnPageModeButton();
}

export function initObservers() {
  addObserverOnGridPage();
  addObserverOnListPage();
  addObserverOnPageType();
  addObserverOnIsSub();
  addObserverOnPageMode();
  addObserverOnMyPress();
}
