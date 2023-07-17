import { categoryData, pressData } from "./dataState.js";

export const GRID = "grid";
export const LIST = "list";
// let pageType = GRID;

export const NUM_IN_A_GRID = 24;
export let MAX_GRID_PAGE = 0;
export let MAX_CATEGORY_ID = 0;
export let TOTAL_LIST_PAGE;
export const MAX_LIST_PAGE = {};
export let categoryId = 0;
export let listPage = 0;
export let gridPage = 0;

export function initPageState() {
  const { categoryList } = categoryData;
  const { pressList } = pressData;

  [...categoryList].forEach((category) => {
    MAX_LIST_PAGE[category.categoryId] = category.pressIdList.length;
  });

  const total = Object.values(MAX_LIST_PAGE).reduce((sum, val) => {
    return (sum += val);
  });

  MAX_GRID_PAGE = parseInt(pressList.length / NUM_IN_A_GRID);
  MAX_CATEGORY_ID = parseInt(categoryList.length);
  TOTAL_LIST_PAGE = total;
}

export function incGridPage() {
  gridPage >= MAX_GRID_PAGE - 1 ? (gridPage = MAX_GRID_PAGE - 1) : gridPage++;
}
export function decGridPage() {
  gridPage <= 0 ? (gridPage = 0) : gridPage--;
}

export function getListPage() {
  return listPage;
}

export function setListPage(value) {
  listPage = value;
}

// export function setPageType(type) {
//   if (type === GRID || LIST) {
//     pageType = type;
//   }
// }
// export function getPageType() {
//   return pageType;
// }
export function setCategoryId(id) {
  categoryId = parseInt(id);

  if (categoryId >= MAX_CATEGORY_ID - 1) {
    categoryId = MAX_CATEGORY_ID - 1;
  }
}
export function getCategoryId() {
  return categoryId;
}

//

export function incListPage() {
  listPage = listPage + 1;
  const maxPage = MAX_LIST_PAGE[categoryId] - 1;
  if (listPage >= maxPage) {
    listPage = maxPage;
  }
}

export function decListPage() {
  listPage = listPage - 1;
  if (listPage <= 0) {
    listPage = 0;
  }
}
