import {
  MAX_CATEGORY_ID,
  MAX_LIST_PAGE,
  categoryId,
  getListPage,
  incListPage,
  listPage,
  setCategoryId,
  setListPage,
} from "../../../../../../pageState.js";
import { showListPage } from "../pressList.js";
import { highlightCategoryItem, updatePageCount } from "./categoryItem.js";

export function progressBar() {
  return `
  <div class="progressbar"></div>
  `;
}

export function startProgressAnimation($progressbar) {
  let raf;
  let runningTime = 3000;
  let percentage = 0;
  let start;
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
        setListPage(0);
      } else {
        incListPage();
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
    if (startPage !== getListPage()) {
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
