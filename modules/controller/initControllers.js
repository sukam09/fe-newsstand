import {
  addEventsOnAlertButton,
  addEventsOnCategory,
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
  addEvetsOnUnsubButton,
} from "./events.js";
import {
  addObserverOnGridPage,
  addObserverOnIsSub,
  addObserverOnListPage,
  addObserverOnMyPress,
  addObserverOnPageMode,
} from "./observers.js";
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
  addEvetsOnUnsubButton();
  addEventsOnAlertButton();
  addEventsOnCategory();
}

export function initObservers() {
  addObserverOnGridPage();
  addObserverOnListPage();
  addObserverOnPageType();
  addObserverOnIsSub();
  addObserverOnPageMode();
  addObserverOnMyPress();
}
