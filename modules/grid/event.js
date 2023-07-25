import { MEDIA } from "../../constant.js";
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
import { setButttonWrapper, setNewPage } from "./grid.js";

const MEDIA_NUM = MEDIA.GRID_ROW_NUM * MEDIA.GRID_COLUMN_NUM;

const $newsWrapper = document.querySelector(".news-grid-wrapper");
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

  const $buttonWrapper = $newsWrapper.children[idx % MEDIA_NUM].querySelector(
    ".news-grid_button_wrapper"
  );

  $buttonWrapper.remove();
  $newsWrapper.children[idx % MEDIA_NUM].append(setButttonWrapper(idx));
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
 * 그리드 뷰 내 전체 언론사 / 내가 구독한 언론사 전환 이벤트
 */
const setGridModeEvent = () => {
  $totalMedia.addEventListener("click", () => {
    if (getState(isGridMode)) {
      onClickGridMode({ className: "main-nav_total" });
    }
  });
  $subscribeMedia.addEventListener("click", () => {
    if (getState(isGridMode)) {
      onClickGridMode({ className: "main-nav_subscribe" });
    }
  });
};

/**
 * @param {언론사 토글 중 선택한 클래스 이름} className
 */
const onClickGridMode = ({ className }) => {
  onClickSubscribeMode({ className });
  setState(gridPageNum, 0);
  setNewPage();
};

export { clickSubButton, setGridArrowEvent, setGridModeEvent };
