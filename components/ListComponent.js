import { FIELDTAB_LIST } from "../constants/constant.js";
import { filterCategory } from "../utils/filterCategory.js";
import { removeAllChildNodes } from "../utils/utils.js";
import { makeFieldTab } from "./List/fieldTab.js";
import { makePressNews } from "./List/pressNews.js";
import { startProgress, stopProgress } from "./List/progress.js";
import {
  moveToNextPage,
  moveToPrevPage,
  setListButton,
} from "./List/setListButton.js";

export const ListComponent = (
  currentPage,
  sortedAgencies,
  focus = FIELDTAB_LIST[0],
  currentCategory
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
  // setListButton(sortedAgencies, currentPage, currentCategory);
  // 해당 카테고리 언론사의 뉴스를 렌더하기 위해 필터링
  const filteredAgencies = filterCategory(sortedAgencies, focus);
  // 카테고리 FieldTab, 메인 및 서브 뉴스 생성
  makeFieldTab(currentPage, sortedAgencies, focus);
  makePressNews(filteredAgencies[currentPage]);
  stopProgress();
  startProgress(sortedAgencies, currentPage, currentCategory);

  const prevBtn = document.querySelector(".prev-page-btn");
  const nextBtn = document.querySelector(".next-page-btn");

  prevBtn.addEventListener("click", () => {
    moveToPrevPage(sortedAgencies, currentPage, currentCategory);
  });
  nextBtn.addEventListener("click", () => {
    moveToNextPage(sortedAgencies, currentPage, currentCategory);
  });
};
