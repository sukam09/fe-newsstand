import { getState, initState } from "./observer.js";
import { categoryDataState, pressDataState } from "./dataState.js";
export const LIST = "list";
export const GRID = "grid";
export const MODE_ALL = "all";
export const MODE_MY = "my";

export const NUM_IN_A_GRID = 24;
export let MAX_GRID_PAGE = 0;
export let MAX_CATEGORY_ID = 0;
export let TOTAL_LIST_PAGE;
export let DATA_LEN = 0;
export const MAX_LIST_PAGE = {};

export function initPageState() {
  const { categoryList } = getState(categoryDataState);
  const { pressList } = getState(pressDataState);

  [...categoryList].forEach((category) => {
    MAX_LIST_PAGE[category.categoryId] = category.pressIdList.length;
  });

  const total = Object.values(MAX_LIST_PAGE).reduce((sum, val) => {
    return (sum += val);
  });

  DATA_LEN = parseInt(pressList.length);
  MAX_GRID_PAGE = parseInt(pressList.length / NUM_IN_A_GRID);
  MAX_CATEGORY_ID = parseInt(categoryList.length);
  TOTAL_LIST_PAGE = total;
}

export const pageTypeState = initState({
  key: "pageType",
  value: GRID,
});

export const pageModeState = initState({
  key: "pageMode",
  value: MODE_ALL,
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

export const myListPageState = initState({
  key: "myListPage",
  value: 0,
});
