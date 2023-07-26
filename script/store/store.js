import { initState } from "../observer/observer.js";

const isGrid = initState({
  key: "isGrid",
  defaultState: true,
});

// 배열 idx로 카테고리 알아오기
const nowCategoryIdx = initState({
  key: "categoryㅇIdx",
  defaultState: { category: 0, list: 1 },
});

const nowCategoryName = initState({
  key: "categoryName",
  defaultState: "",
});

const gridPageIdx = initState({
  key: "gridPageIdx",
  defaultState: 0,
});

export { isGrid, nowCategoryIdx, nowCategoryName, gridPageIdx };
