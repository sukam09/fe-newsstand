import { initState } from "./observer.js";
import { categoryData, pressData } from "./dataState.js";
export const LIST = "list";
export const GRID = "grid";

export const NUM_IN_A_GRID = 24;
export let MAX_GRID_PAGE = 0;
export let MAX_CATEGORY_ID = 0;
export let TOTAL_LIST_PAGE;
export const MAX_LIST_PAGE = {};

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

export const pageTypeState = initState({
  key: "pageType",
  value: GRID,
});

export const listPageState = initState({
  key: "listPage",
  value: 0,
});

export const gridPageState = initState({
  key: "gridPage",
  value: 0,
});

export const categoryIdState = initState({
  key: "categoryId",
  value: 0,
});
