import { MEDIA, MESSAGE, STATE } from "../constant.js";
import { setNewPage } from "./grid.js";
import { setCategoryBar, setFullList } from "./list.js";
import { moveGridView, moveListView } from "./utils.js";

const $totalMedia = document.querySelector(".main-nav_total");
const $subscribeMedia = document.querySelector(".main-nav_subscribe");

const $snackBar = document.querySelector(".snack-bar");
const $subsAlert = document.querySelector(".subs-alert");
const $subAlertName = document.querySelector(".subs-alert_content_name");
const $subBtnYes = document.querySelectorAll(".subs-alert_btn")[0];
const $subBtnNo = document.querySelectorAll(".subs-alert_btn")[1];

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

  STATE.MODE.IS_TOTAL = $selected === $totalMedia;

  // 전체 언론사 -> 그리드 / 내가 구독한 언론사 -> 리스트뷰 디폴트
  className === "main-nav_total" ? moveGridView() : moveListView();
};

const changeSubState = ({ mediaId, mediaName }) => {
  const subIdx = STATE.SUBSCRIBE_LIST.indexOf(mediaId);

  if (subIdx !== -1) {
    setModalView({ mediaName, subIdx });
  } else {
    STATE.SUBSCRIBE_LIST = [...STATE.SUBSCRIBE_LIST, mediaId];

    $snackBar.classList.remove("hidden");
    setTimeout(() => {
      $snackBar.classList.add("hidden");
      STATE.LIST_MODE.SUBSCRIBE_MEDIA_IDX = STATE.SUBSCRIBE_LIST.length - 1;
      onClickSubscribeMode({ className: "main-nav_subscribe" });
    }, 1000);
  }
};

const setModalView = ({ mediaName, subIdx }) => {
  $subAlertName.innerText = mediaName;
  $subsAlert.classList.remove("hidden");

  $subBtnYes.addEventListener("click", () => {
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

export { onClickSubscribeMode, changeSubState };
