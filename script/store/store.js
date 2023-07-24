import { initState } from "../observer/observer.js";

const isGrid = initState({
  key: "isGrid",
  defaultState: true,
});

// 배열 idx로 카테고리 알아오기
const nowCategoryIdx = initState({
  key: "categoryIdx",
  defaultState: 0,
});

const nowCategoryName = initState({
  key: "categoryName",
  defaultState: "",
});

// const currentPageIdx = initState({
//   key: "currentPageIdx",
//   defaultState: 1,
// });

// 리스트 현재 페이지 받아오기
const listPageIdx = initState({
  key: "listPageIdx",
  defaultState: 1,
});

const gridPageIdx = initState({
  key: "gridPageIdx",
  defaultState: 0,
});

export { isGrid, nowCategoryIdx, nowCategoryName, listPageIdx, gridPageIdx };
