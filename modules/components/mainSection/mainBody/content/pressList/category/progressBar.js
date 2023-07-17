import { getState, setState } from "../../../../../../core/observer.js";
import {
  MAX_CATEGORY_ID,
  MAX_LIST_PAGE,
  categoryId,
  setCategoryId,
} from "../../../../../../state/pageState.js";
import { listPageState } from "../../../../../../state/pageState2.js";
import { showListPage } from "../pressList.js";
import { highlightCategoryItem, updatePageCount } from "./categoryItem.js";

export function createProgressBar() {
  return `
  <div class="progressbar"></div>
  `;
}

export function startProgressAnimation($progressbar) {
  let raf;
  let runningTime = 3000;
  let percentage = 0;
  let start;
  const listPage = getState(listPageState);
  const startPage = listPage;

  const performAnimation = (timestamp) => {
    start === undefined ? (start = timestamp) : null;
    const elapsed = timestamp - start;
    const clicked = $progressbar.parentNode.classList.contains("clicked");

    // runningtime 넘어가면 처음부터 시작
    if (elapsed >= runningTime) {
      cancelAnimationFrame(raf);
      if (listPage >= MAX_LIST_PAGE[categoryId] - 1) {
        if (categoryId >= MAX_CATEGORY_ID - 1) {
          setCategoryId(0);
        } else {
          setCategoryId(categoryId + 1);
        }
        setState(listPageState, 0);
      } else {
        setState(listPageState, listPage + 1);
      }
      showListPage(categoryId, listPage);
      updatePageCount();
      highlightCategoryItem();

      return;
    }

    // click 해제 되면 중지
    if (!clicked) {
      cancelAnimationFrame(raf);
      return;
    }

    // 페이지 변화
    if (startPage !== getState(listPageState)) {
      cancelAnimationFrame(raf);
      highlightCategoryItem();
      return;
    }
    percentage = (elapsed / runningTime) * 100;
    $progressbar.style.width = `${percentage}%`;
    raf = requestAnimationFrame(performAnimation);
  };

  raf = requestAnimationFrame(performAnimation);
}
