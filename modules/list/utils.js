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
    setState(listCateIdx, getState(listCateIdx) - 1);
    setState(listCateMediaIdx, 0);
  }
  if (getState(listCateIdx) === -1) {
    setState(listCateIdx, categoryKeys.length - 1);
  }

  // 오른쪽 화살표 눌렀을 때
  let cateLen = cateInfo[categoryKeys[getState(listCateIdx)]].length;
  if (getState(listCateMediaIdx) === cateLen) {
    setState(listCateIdx, getState(listCateIdx) + 1);
    setState(listCateMediaIdx, 0);
  }
  if (getState(listCateIdx) === categoryKeys.length) {
    setState(listCateIdx, 0);
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
