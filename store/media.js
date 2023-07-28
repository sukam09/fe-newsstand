import { MEDIA } from "../constant.js";
import { initState } from "../observer/observer.js";

const gridPageNum = initState({
  key: "gridPageNum",
  defaultState: 0,
});

const mediaIdList = initState({
  key: "mediaIdList",
  defaultState: Array.from({ length: MEDIA.TOTAL_NUM }, (_, idx) => idx),
});

const mediaInfo = initState({
  key: "mediaInfo",
  defaultState: {},
});

const categoryInfo = initState({
  key: "categoryInfo",
  defaultState: {
    "종합/경제": [],
    "방송/통신": [],
    IT: [],
    영자지: [],
    "스포츠/연예": [],
    "매거진/전문지": [],
    지역: [],
  },
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

export {
  gridPageNum,
  mediaIdList,
  mediaInfo,
  categoryInfo,
  listCateIdx,
  listCateMediaIdx,
  listSubsMediaIdx,
};
