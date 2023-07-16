import { tabClassChange } from "./ChangeTabStyle.js";
import { updatePressNewsSection } from "./UpdateSection.js";

/**
 * 현재 카테고리의 페이지 정보 변경
 */
function changePageInfo(listState) {
  const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
  const progressTabNumber = progressTab.querySelector(".text-category-number");
  progressTabNumber.querySelector(".present").innerHTML = `${listState.CURRENT_PAGE} / `;
}

/**
 * <카테고리 변경 >
 * - 프로그래스 타켓 변경(스타일)
 * - 기사(언론사) 내용 변경
 */
function changeCategory(news_data, listState, categoryLength) {
  const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
  const nextProgressEl = document.querySelectorAll(".news-list-wrap .field-tab .each-tab")[listState.CURRENT_CATEGORY];

  //카테고리 타켓 탭 스타일 변경
  tabClassChange(nextProgressEl, progressTab, categoryLength, listState);

  //내용 업데이트
  updatePressNewsSection(news_data, listState);
}

export { changePageInfo, changeCategory };
