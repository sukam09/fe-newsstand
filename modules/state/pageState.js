import { getState } from "../core/observer.js";
import { categoryData, pressData } from "./dataState.js";
import { gridPageState, listPageState } from "./pageState2.js";

// let pageType = GRID;

export const NUM_IN_A_GRID = 24;
export let MAX_GRID_PAGE = 0;
export let MAX_CATEGORY_ID = 0;
export let TOTAL_LIST_PAGE;
export const MAX_LIST_PAGE = {};
export let categoryId = 0;

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
