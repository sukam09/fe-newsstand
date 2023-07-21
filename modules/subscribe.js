import { STATE } from "../constant.js";
import { moveGridView, moveListView } from "./utils.js";

const $totalMedia = document.querySelector(".main-nav_total");
const $subscribeMedia = document.querySelector(".main-nav_subscribe");

const $snackBar = document.querySelector(".snack-bar");
const $subsAlert = document.querySelector(".subs-alert");
const $subAlertName = document.querySelector(".subs-alert_content_name");

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
  STATE.SELECT_SUBSCRIBE_IDX = subIdx;

  if (subIdx !== -1) {
    $subAlertName.innerText = mediaName;
    $subsAlert.classList.remove("hidden");
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

export { onClickSubscribeMode, changeSubState };
