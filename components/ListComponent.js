import { filterCategory } from "../utils/filterCategory.js";
import { removeAllChildNodes } from "../utils/utils.js";
import { makeFieldTab } from "./List/fieldTab.js";
import { makePressNews } from "./List/pressNews.js";
import { startProgress, stopProgress } from "./List/progress.js";
import { moveToNextPage, moveToPrevPage } from "./List/setListButton.js";

const all_press = document.querySelector(".all_press");

export const ListComponent = (
  current_page,
  sorted_agencies,
  focus,
  current_category
) => {
  // 초기화
  const press = document.querySelector(".press-news");
  const field = document.querySelector(".field-tab");
  if (press.childNodes.length > 0) {
    removeAllChildNodes(press);
  }
  if (field.childNodes.length > 0) {
    removeAllChildNodes(field);
  }

  if (Boolean(all_press.getAttribute("subscribetype"))) {
    // 해당 카테고리 언론사의 뉴스를 렌더하기 위해 필터링
    const filtered_agencies = filterCategory(sorted_agencies, focus);
    // 카테고리 FieldTab, 메인 및 서브 뉴스 생성
    makeFieldTab(current_page, sorted_agencies, focus);
    makePressNews(filtered_agencies[current_page]);
    stopProgress();
    startProgress(sorted_agencies, current_page, current_category);
  } else {
    console.log(current_page, sorted_agencies, focus);
    makeFieldTab(current_page, sorted_agencies, focus);
    makePressNews(sorted_agencies[current_page]);
    stopProgress();
    startProgress(sorted_agencies, current_page, current_category);
  }

  const prev_btn = document.querySelector(".prev-page-btn");
  const next_btn = document.querySelector(".next-page-btn");

  prev_btn.addEventListener("click", () => {
    moveToPrevPage(sorted_agencies, current_page, current_category);
  });
  next_btn.addEventListener("click", () => {
    moveToNextPage(sorted_agencies, current_page, current_category);
  });
};
