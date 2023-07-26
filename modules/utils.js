import { IMAGE, MESSAGE } from "../constant.js";
import { getState, setState } from "../observer/observer.js";
import {
  gridPageNum,
  listCateIdx,
  listCateMediaIdx,
  listSubsMediaIdx,
} from "../store/media.js";
import { isGridMode, isTotalMode } from "../store/mode.js";
import { subscribeList } from "../store/subscribe.js";

const $gridIcon = document.querySelector(".nav-grid");
const $listIcon = document.querySelector(".nav-list");

const $totalMedia = document.querySelector(".main-nav_total");
const $subscribeMedia = document.querySelector(".main-nav_subscribe");

const $gridView = document.querySelector(".news-grid-wrapper");
const $listView = document.querySelector(".news-list-wrapper");

/**
 * 배열을 섞는 함수
 */
const shuffleList = (list) => {
  list.sort(() => Math.random() - 0.5);
  return list;
};

const setColorModeEvent = () => {
  const $html = document.querySelector("html");
  const $colorModeBtn = document.querySelector(".mode-button");

  if (!$colorModeBtn.src) {
    $colorModeBtn.src = IMAGE.MOON_ICON;
  }

  $colorModeBtn.addEventListener("click", () => {
    $html.classList.toggle("dark");

    setState("isLightMode", $html.className !== "dark");

    $colorModeBtn.src =
      $html.className === "dark" ? IMAGE.SUN_ICON : IMAGE.MOON_ICON;
  });
};
/**
 * 시스템 날짜 표시
 */
const setDate = () => {
  const today = new Date();

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };

  const $systemDate = document.querySelector(".system-date");
  const $p = document.createElement("p");
  $p.innerText = today.toLocaleDateString("ko-KR", options);
  $systemDate.append($p);
};

/**
 * 로고를 클릭하면 새로고침
 */
const setReload = () => {
  const $headerTitle = document.querySelector(".header_title");
  $headerTitle.addEventListener("click", () => location.reload());
};

const setViewEvent = () => {
  $listIcon.addEventListener("click", () => {
    moveListView();
  });
  $gridIcon.addEventListener("click", () => {
    moveGridView();
  });
};

/**
 * 그리드뷰로 이동할 수 있는 함수
 */
const moveGridView = () => {
  setState(isGridMode, true);
  setState(gridPageNum, 0);

  $gridIcon.src = IMAGE.BLUE_GRID_ICON;
  $listIcon.src = IMAGE.GRAY_LIST_ICON;

  $gridView.classList.remove("hidden");
  $listView.classList.add("hidden");
};

/**
 * 리스트뷰로 이동할 수 있는 함수
 */
const moveListView = () => {
  setState(isGridMode, false);
  setState(listCateIdx, 0);
  setState(listCateMediaIdx, 0);
  setState(listSubsMediaIdx, 0);

  $gridIcon.src = IMAGE.GRAY_GRID_ICON;
  $listIcon.src = IMAGE.BLUE_LIST_ICON;

  $listView.classList.remove("hidden");
  $gridView.classList.add("hidden");

  const $leftArrow = document.querySelector(".left-arrow");
  const $rightArrow = document.querySelector(".right-arrow");

  $leftArrow.classList.remove("hidden");
  $rightArrow.classList.remove("hidden");
};

const initSubsModalView = () => {
  const $subsAlert = document.querySelector(".subs-alert");
  const $subBtnYes = document.querySelectorAll(".subs-alert_btn")[0];
  const $subBtnNo = document.querySelectorAll(".subs-alert_btn")[1];

  $subBtnYes.addEventListener("click", () => {
    const subIdx = getState("selectSubscribeIdx");

    const newSubscribeList = getState("subscribeList");
    newSubscribeList.splice(subIdx, 1);
    setState("subscribeList", newSubscribeList);

    $subsAlert.classList.add("hidden");

    alert(MESSAGE.UNSUBSCRIBE);
    if (!isPossible()) return;
  });
  $subBtnNo.addEventListener("click", () => {
    $subsAlert.classList.add("hidden");
  });
};

function isPossible() {
  if (!getState(isTotalMode) && getState(subscribeList).length === 0) {
    alert(MESSAGE.ERROR_NO_SUBSCRIBE);
    setState(isGridMode, true);
    setState(isTotalMode, true);

    $totalMedia.classList.add("main-nav_selected");
    $subscribeMedia.classList.remove("main-nav_selected");

    $totalMedia.classList.remove("main-nav_unselected");
    $subscribeMedia.classList.add("main-nav_unselected");

    return false;
  }
  return true;
}

/**
 * 공통뷰 & 공통 이벤트 세팅
 */
function initCommonView() {
  setColorModeEvent();
  setReload();
  setDate();
  setViewEvent();
  initSubsModalView();
}

export { initCommonView, shuffleList, moveGridView, moveListView, isPossible };
