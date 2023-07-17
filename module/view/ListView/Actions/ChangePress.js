import { tabClassChange } from "./ChangeTabStyle.js";
import { LIST_PAGE } from "../../../../global.js";

/**
 * 현재 카테고리의 페이지 정보 변경
 */

function changePageInfo() {
  const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
  const progressTabNumber = progressTab.querySelector(".text-category-number");
  progressTabNumber.querySelector(".present").innerHTML = `${LIST_PAGE.CURRENT_PAGE} / `;
}

/**
 * <카테고리 변경 >
 * - 프로그래스 타켓 변경(스타일)
 */
function changeCategory() {
  const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
  const nextProgressEl = document.querySelectorAll(".news-list-wrap .field-tab .each-tab")[LIST_PAGE.CURRENT_CATEGORY];

  //카테고리 타켓 탭 스타일 변경
  tabClassChange(nextProgressEl, progressTab);
}

export { changePageInfo, changeCategory };
