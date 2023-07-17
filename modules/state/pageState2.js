import { initState } from "../core/observer.js";
export const LIST = "list";
export const GRID = "grid";

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
