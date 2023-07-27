import { getState, setState } from "../../observer/observer.js";
import {
  categoryInfo,
  isTotalMode,
  listCateIdx,
  listCateMediaIdx,
  listSubsMediaIdx,
  subscribeList,
} from "../../store/index.js";

const categoryKeys = Object.keys(getState(categoryInfo));

/**
 * 페이지 이동 시 예외처리
 */
const changeIdx = () => {
  getState(isTotalMode) ? totalModeIdx() : subscribeModeIdx();
};

const totalModeIdx = () => {
  const cateInfo = getState(categoryInfo);
  // 왼쪽 화살표 눌렀을 때
  if (getState(listCateMediaIdx) === -1) {
    const nextCateIdx = getState(listCateIdx) - 1;
    const newCateIdx =
      nextCateIdx === -1 ? categoryKeys.length - 1 : nextCateIdx;

    setState(listCateIdx, newCateIdx);
    setState(listCateMediaIdx, 0);
  }

  // 오른쪽 화살표 눌렀을 때
  if (
    getState(listCateMediaIdx) ===
    cateInfo[categoryKeys[getState(listCateIdx)]].length
  ) {
    const nextCateIdx = getState(listCateIdx) + 1;
    const newCateIdx = nextCateIdx === categoryKeys.length ? 0 : nextCateIdx;

    setState(listCateIdx, newCateIdx);
    setState(listCateMediaIdx, 0);
  }
};

const subscribeModeIdx = () => {
  const subList = getState(subscribeList);
  if (getState(listSubsMediaIdx) === -1) {
    setState(listSubsMediaIdx, subList.length - 1);
  } else if (getState(listSubsMediaIdx) === subList.length) {
    setState(listSubsMediaIdx, 0);
  }
};

export { changeIdx };
