import { getState, setState } from "../../observer/observer.js";
import {
  gridPageNum,
  isGridMode,
  isTotalMode,
  mediaIdList,
  mediaInfo,
  subscribeList,
} from "../../store/index.js";
import { changeSubState, onClickSubscribeMode } from "../subscribe.js";

const $totalMedia = document.querySelector(".main-nav_total");
const $subscribeMedia = document.querySelector(".main-nav_subscribe");

/**
 * 구독 버튼 이벤트 추가
 * @parm idx - idList 내에 위치한 미디어 idx
 */
const clickSubButton = (idx) => {
  const mediaId = getState(isTotalMode)
    ? getState(mediaIdList)[idx]
    : getState(subscribeList)[idx];
  const mediaName = getState(mediaInfo)[mediaId].name;

  changeSubState({ mediaId, mediaName });
};

/**
 * 그리드 뷰 내 페이지 전환 이벤트
 */
const setGridArrowEvent = () => {
  const $leftArrow = document.querySelector(".left-arrow");
  const $rightArrow = document.querySelector(".right-arrow");

  $leftArrow.addEventListener("click", () => {
    if (getState(isGridMode)) clickArrow(-1);
  });
  $rightArrow.addEventListener("click", () => {
    if (getState(isGridMode)) clickArrow(+1);
  });
};

/**
 * Grid 화살표 클릭하기
 * @param num 페이지 이동을 위한 카운트 변수
 */
const clickArrow = (num) => {
  setState(gridPageNum, getState(gridPageNum) + num);
};

/**
 * 그리드 뷰 내 전체 언론사 / 내가 구독한 언론사 전환 이벤트
 */
const setGridModeEvent = () => {
  $totalMedia.addEventListener("click", () => {
    if (getState(isGridMode)) {
      onClickSubscribeMode({ className: "main-nav_total" });
      setState(gridPageNum, 0);
    }
  });
  $subscribeMedia.addEventListener("click", () => {
    if (getState(isGridMode)) {
      onClickSubscribeMode({ className: "main-nav_subscribe" });
      setState(gridPageNum, 0);
    }
  });
};

export { clickSubButton, setGridArrowEvent, setGridModeEvent };
