import { getState, setState } from "../../observer/observer.js";
import {
  categoryInfo,
  listCateIdx,
  listCateMediaIdx,
  listSubsMediaIdx,
  mediaInfo,
  isGridMode,
  isTotalMode,
  subscribeList,
} from "../../store/index.js";
import { changeSubState, onClickSubscribeMode } from "../subscribe.js";

const $totalMedia = document.querySelector(".main-nav_total");
const $subscribeMedia = document.querySelector(".main-nav_subscribe");
const $plusSubBtn = document.querySelector(".news-list_subscribe_btn");
const $xSubBtn = document.querySelector(".news-list_unsubscribe_btn");

const categoryKeys = Object.keys(getState(categoryInfo));

/**
 * 리스트뷰 내 화면 전환
 */
const setListArrowEvent = () => {
  const $leftArrow = document.querySelector(".left-arrow");
  const $rightArrow = document.querySelector(".right-arrow");

  $leftArrow.addEventListener("click", () => {
    if (!getState(isGridMode)) {
      getState(isTotalMode)
        ? setState(listCateMediaIdx, getState(listCateMediaIdx) - 1)
        : setState(listSubsMediaIdx, getState(listSubsMediaIdx) - 1);
    }
  });
  $rightArrow.addEventListener("click", () => {
    if (!getState(isGridMode)) {
      getState(isTotalMode)
        ? setState(listCateMediaIdx, getState(listCateMediaIdx) + 1)
        : setState(listSubsMediaIdx, getState(listSubsMediaIdx) + 1);
    }
  });
};

const setListModeEvent = () => {
  $totalMedia.addEventListener("click", () => {
    if (!getState(isGridMode)) {
      onClickListMode({ className: "main-nav_total" });
    }
  });
  $subscribeMedia.addEventListener("click", () => {
    if (!getState(isGridMode)) {
      onClickListMode({ className: "main-nav_subscribe" });
    }
  });
};

const setListSubscribeEvent = () => {
  $plusSubBtn.addEventListener("click", () => {
    clickSubButton();
    setState(listSubsMediaIdx, getState(subscribeList).length - 1);
    onClickListMode({ className: "main-nav_subscribe" });
  });
  $xSubBtn.addEventListener("click", () => {
    clickSubButton();
  });
};

/**
 *
 * @param {언론사 토글 중 선택한 클래스 이름} className
 */
const onClickListMode = ({ className }) => {
  onClickSubscribeMode({ className });

  setState(listCateIdx, 0);
  setState(listCateMediaIdx, 0);
};

const clickSubButton = () => {
  const totalId =
    getState(categoryInfo)[categoryKeys[getState(listCateIdx)]][
      getState(listCateMediaIdx)
    ];
  const subsId = getState(subscribeList)[getState(listSubsMediaIdx)];
  const mediaId = getState(isTotalMode) ? totalId : subsId;
  const mediaName = getState(mediaInfo)[mediaId].name;
  changeSubState({ mediaId, mediaName });
};

export { setListArrowEvent, setListModeEvent, setListSubscribeEvent };
