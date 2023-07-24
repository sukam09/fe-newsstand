import { initState } from "../observer/observer.js";

const gridPageNum = initState({
  key: "gridPageNum",
  defaultState: 0,
});

const listCateIdx = initState({
  key: "listCateIdx",
  defaultState: 0,
});

const listCateMediaIdx = initState({
  key: "listCateMediaIdx",
  defaultState: 0,
});

const listSubsMediaIdx = initState({
  key: "listSubsMediaIdx",
  defaultState: 0,
});

export { gridPageNum, listCateIdx, listCateMediaIdx, listSubsMediaIdx };
