import { categoryData, pressData } from "../../../../../state/dataState.js";
import { MAX_LIST_PAGE } from "../../../../../state/pageState.js";
import { qs, qsa } from "../../../../../utils.js";
import { createNewsBody } from "./newsBody/newsBody.js";
import { createNewsHeader } from "./newsHeader/newsHeader.js";

// 하나의 카테고리의 하나의 페이지
export function createPressList(categoryId, page) {
  const { categoryList } = categoryData;
  const { pressList } = pressData;
  const { pressIdList } = categoryList[categoryId];

  const targetPressList = [...pressList].filter((press) =>
    [...pressIdList].includes(press.id)
  );

  return `
  <div class="news news_${categoryId}_${page}  flex_column">
    ${createNewsHeader(targetPressList[page])}
    ${createNewsBody(targetPressList[page])}
  </div>
  `;
}

export function showListPage(categoryId, page) {
  hideAllListPage();
  const $targetNewsPage = qs(`.news_${parseInt(categoryId)}_${page}`);
  $targetNewsPage.style.display = "block";
}

export function showNextListPage() {
  listPage >= MAX_LIST_PAGE ? MAX_LIST_PAGE : (listPage += 1);
}

export function showPrevListPage() {
  listPage <= 0 ? 0 : (listPage -= 1);
}

export function hideAllListPage() {
  const $newsPageList = qsa(".news");
  [...$newsPageList].forEach(($newsPage) => {
    $newsPage.style.display = "none";
  });
}

export function hideListContainer() {
  const $listContainer = qs("#list_container");
  $listContainer.style.display = "none";
}
export function showListContainer() {
  const $listContainer = qs("#list_container");
  $listContainer.style.display = "block";
}
