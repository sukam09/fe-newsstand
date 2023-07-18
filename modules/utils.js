import { IMAGE, MEDIA, STATE } from "../constant.js";
import { setArrowVisible, setNewPage } from "./grid.js";
import { setCategoryBar, setFullList } from "./list.js";

const $gridIcon = document.querySelector(".nav-grid");
const $listIcon = document.querySelector(".nav-list");

const $gridView = document.querySelector(".news-grid-wrapper");
const $listView = document.querySelector(".news-list-wrapper");

const $totalMedia = document.querySelector(".main-nav_total");
const $subscribeMedia = document.querySelector(".main-nav_subscribe");

/**
 * 배열을 섞는 함수
 */
const shuffleList = (list) => {
  list.sort(() => Math.random() - 0.5);
  return list;
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
  const $listIcon = document.querySelector(".nav-list");
  const $gridIcon = document.querySelector(".nav-grid");

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
  $gridIcon.src = IMAGE.BLUE_GRID_ICON;
  $listIcon.src = IMAGE.GRAY_LIST_ICON;

  $gridView.classList.remove("hidden");
  $listView.classList.add("hidden");

  STATE.MODE.IS_GRID = true;
  const MEDIA_NUM = MEDIA.GRID_ROW_NUM * MEDIA.GRID_COLUMN_NUM;
  setNewPage(
    STATE.GRID_PAGE_NUM * MEDIA_NUM,
    (STATE.GRID_PAGE_NUM + 1) * MEDIA_NUM
  );
  setArrowVisible();
};

/**
 * 리스트뷰로 이동할 수 있는 함수
 */
const moveListView = () => {
  $gridIcon.src = IMAGE.GRAY_GRID_ICON;
  $listIcon.src = IMAGE.BLUE_LIST_ICON;

  $listView.classList.remove("hidden");
  $gridView.classList.add("hidden");

  const $leftArrow = document.querySelector(".left-arrow");
  const $rightArrow = document.querySelector(".right-arrow");

  $leftArrow.classList.remove("hidden");
  $rightArrow.classList.remove("hidden");

  STATE.MODE.IS_GRID = false;

  setCategoryBar();
  setFullList();
};

/**
 *
 * @param {언론사 토글 중 선택한 클래스 이름} className
 */
const onClickSubscribeMode = ({ className }) => {
  const $selected =
    className === "main-nav_total" ? $totalMedia : $subscribeMedia;
  const $unselected =
    className === "main-nav_total" ? $subscribeMedia : $totalMedia;

  $selected.classList.remove("main-nav_unselected");
  $selected.classList.add("main-nav_selected");

  $unselected.classList.remove("main-nav_selected");
  $unselected.classList.add("main-nav_unselected");

  STATE.MODE.IS_TOTAL = $selected === $totalMedia ? true : false;

  // 전체 언론사 -> 그리드 / 내가 구독한 언론사 -> 리스트뷰 디폴트
  className === "main-nav_total" ? moveGridView() : moveListView();
};

/**
 * 헤더의 공통뷰를 세팅하는 함수
 */
async function initCommonView() {
  setReload();
  setDate();
}

export {
  initCommonView,
  shuffleList,
  setDate,
  setReload,
  setViewEvent,
  onClickSubscribeMode,
};
