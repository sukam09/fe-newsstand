import { subscribe } from "./observer.js";
import {
  subListPageCount,
  categoryPageCount,
  nowCategory,
  subGridPageCount,
  gridPageCount,
  isGridView,
  isSubView,
  isDark,
  subscribedPress,
} from "../store/store.js";
import { drawListArrow, drawNews, setNowCount, restartAnimation } from "../view/listView.js";
import { setSubListNav } from "../subscribe/subscribeList.js";
import { drawGridView, drawGridArrow } from "../view/gridView.js";

export function initSubscriber() {
  subscribe(subListPageCount, drawListArrow);
  subscribe(subListPageCount, setSubListNav);
  subscribe(subListPageCount, drawNews);
  subscribe(subListPageCount, restartAnimation);
  subscribe(categoryPageCount, drawListArrow);
  subscribe(categoryPageCount, drawNews);
  subscribe(categoryPageCount, setNowCount);
  subscribe(categoryPageCount, restartAnimation);
  subscribe(nowCategory, drawListArrow);
  subscribe(nowCategory, drawNews);

  subscribe(subGridPageCount, drawGridView);
  subscribe(gridPageCount, drawGridView);
  subscribe(subGridPageCount, drawGridArrow);
  subscribe(gridPageCount, drawGridArrow);
  subscribe(isGridView, drawGridArrow);

  subscribe(isGridView, drawNews);
  subscribe(isGridView, setSubListNav);
  subscribe(isGridView, drawGridView);
  subscribe(isGridView, setNowCount);
  subscribe(isSubView, drawNews);
  subscribe(isSubView, setSubListNav);
  subscribe(isSubView, drawGridView);
  subscribe(isSubView, setNowCount);

  subscribe(isDark, drawNews);
  subscribe(isDark, drawGridView);
  subscribe(subscribedPress, drawNews);
}
