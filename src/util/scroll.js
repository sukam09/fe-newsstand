import { SUBSCRIBE } from "../constant.js";
import { VIEW } from "../model/global.js";

export function scrollMove(progressBar, savedScroll) {
  if (VIEW.tab !== SUBSCRIBE) return;

  const field = document.querySelector("main .news-list-wrap .field-tab");
  const fieldRectRight = field.getBoundingClientRect().right;
  const fieldRectLeft = field.getBoundingClientRect().left;

  if (!progressBar) progressBar = document.querySelector("main .news-list-wrap .progress-tab");
  const progressBarRectRight = progressBar.getBoundingClientRect().right;
  const progressBarRectLeft = progressBar.getBoundingClientRect().left;

  if (fieldRectLeft >= progressBarRectLeft) {
    //오른쪽으로 땡김
    field.scrollLeft += progressBarRectLeft - fieldRectLeft;
  } else if (fieldRectRight < progressBarRectRight) {
    //왼쪽으로 땡김
    field.scrollLeft += progressBarRectRight - fieldRectRight;
  } else {
    if (savedScroll) {
      field.scrollLeft = savedScroll;
    }
  }
}
