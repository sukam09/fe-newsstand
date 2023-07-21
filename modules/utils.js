import { IMAGE, MEDIA, MESSAGE, STATE } from "../constant.js";
import { changeImgSrc, setNewPage } from "./grid.js";
import { setCategoryBar, setFullList, setListView } from "./list.js";

const MEDIA_NUM = MEDIA.GRID_ROW_NUM * MEDIA.GRID_COLUMN_NUM;

const $gridIcon = document.querySelector(".nav-grid");
const $listIcon = document.querySelector(".nav-list");

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
    STATE.MODE.IS_LIGHT = !STATE.MODE.IS_LIGHT;
    $colorModeBtn.src =
      $html.className === "dark" ? IMAGE.SUN_ICON : IMAGE.MOON_ICON;
    STATE.MODE.IS_GRID
      ? changeImgSrc(MEDIA_NUM * STATE.GRID_PAGE_NUM)
      : setListView();
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

const initSubsModalView = () => {
  const $subsAlert = document.querySelector(".subs-alert");
  const $subBtnYes = document.querySelectorAll(".subs-alert_btn")[0];
  const $subBtnNo = document.querySelectorAll(".subs-alert_btn")[1];

  $subBtnYes.addEventListener("click", () => {
    const subIdx = STATE.SELECT_SUBSCRIBE_IDX;
    STATE.SUBSCRIBE_LIST.splice(subIdx, 1);
    $subsAlert.classList.add("hidden");

    alert(MESSAGE.UNSUBSCRIBE);

    if (STATE.MODE.IS_GRID) {
      const MEDIA_NUM = MEDIA.GRID_ROW_NUM * MEDIA.GRID_COLUMN_NUM;
      setNewPage(
        STATE.GRID_PAGE_NUM * MEDIA_NUM,
        (STATE.GRID_PAGE_NUM + 1) * MEDIA_NUM
      );
    } else {
      setCategoryBar();
      setFullList();
    }
  });
  $subBtnNo.addEventListener("click", () => {
    $subsAlert.classList.add("hidden");
  });
};

/**
 * 공통뷰 & 공통 이벤트 세팅
 */
async function initCommonView() {
  setColorModeEvent();
  setReload();
  setDate();
  setViewEvent();
  initSubsModalView();
}

export { initCommonView, shuffleList, moveGridView, moveListView };
