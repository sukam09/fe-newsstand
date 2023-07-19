import { MEDIA, STATE } from "../constant.js";
import { getJSON } from "./data.js";
import { shuffleList } from "./utils.js";
import { onClickSubscribeMode, changeSubState } from "./subscribe.js";

const MEDIA_NUM = MEDIA.GRID_ROW_NUM * MEDIA.GRID_COLUMN_NUM;
let idList = Array.from({ length: MEDIA.TOTAL_NUM }, (_, idx) => idx);
let mediaInfo;

const $newsWrapper = document.querySelector(".news-grid-wrapper");
const $totalMedia = document.querySelector(".main-nav_total");
const $subscribeMedia = document.querySelector(".main-nav_subscribe");

/**
 * 언론사 Grid 제작하기
 */
const makeGrid = () => {
  for (let i = 0; i < MEDIA_NUM; i++) {
    const $li = document.createElement("li");
    const imgSrc = STATE.MODE.IS_LIGHT
      ? `${mediaInfo[idList[i]].path_light}`
      : `${mediaInfo[idList[i]].path_dark}`;

    const checkImg = new Image();
    checkImg.src = imgSrc;
    checkImg.onload = () => {
      const $img = document.createElement("img");
      $img.classList.add(`img${i}`);
      $img.src = imgSrc;
      $img.style.height = "20px";
      $li.appendChild($img);

      const $buttonWrapper = addSubscribeButton(i);
      $li.append($buttonWrapper);
    };

    $newsWrapper.append($li);
  }
};

/**
 * 구독 버튼 영역 추가
 */
const addSubscribeButton = (idx) => {
  const mediaId = STATE.MODE.IS_TOTAL ? idList[idx] : STATE.SUBSCRIBE_LIST[idx];
  const $buttonWrapper = document.createElement("div");
  $buttonWrapper.classList.add("news-grid_button_wrapper");

  const $button = document.createElement("button");
  $button.classList.add(
    STATE.SUBSCRIBE_LIST.includes(mediaId)
      ? "news-grid_subscribed_btn"
      : "news-grid_unsubscribed_btn"
  );
  $button.innerText = STATE.SUBSCRIBE_LIST.includes(mediaId)
    ? "x 해지하기"
    : "+ 구독하기";

  $button.addEventListener("click", () => {
    clickSubButton(idx);
  });

  $buttonWrapper.append($button);

  return $buttonWrapper;
};

/**
 * 구독 버튼 이벤트 추가
 * @parm idx - idList 내에 위치한 미디어 idx
 */
const clickSubButton = (idx) => {
  const mediaId = STATE.MODE.IS_TOTAL ? idList[idx] : STATE.SUBSCRIBE_LIST[idx];
  const mediaName = mediaInfo[mediaId].name;

  changeSubState({ mediaId, mediaName });

  const $buttonWrapper = $newsWrapper.children[idx % MEDIA_NUM].querySelector(
    ".news-grid_button_wrapper"
  );

  $buttonWrapper.remove();
  $newsWrapper.children[idx % MEDIA_NUM].append(addSubscribeButton(idx));
};

/**
 * 그리드 뷰 내 페이지 전환 이벤트
 */
const setGridArrowEvent = () => {
  const $leftArrow = document.querySelector(".left-arrow");
  const $rightArrow = document.querySelector(".right-arrow");

  $leftArrow.addEventListener("click", () => {
    if (STATE.MODE.IS_GRID) clickArrow(-1);
  });
  $rightArrow.addEventListener("click", () => {
    if (STATE.MODE.IS_GRID) clickArrow(+1);
  });
};

/**
 * 그리드 뷰 내 전체 언론사 / 내가 구독한 언론사 전환 이벤트
 */
const setGridModeEvent = () => {
  $totalMedia.addEventListener("click", () => {
    if (STATE.MODE.IS_GRID) {
      onClickGridMode({ className: "main-nav_total" });
    }
  });
  $subscribeMedia.addEventListener("click", () => {
    if (STATE.MODE.IS_GRID) {
      onClickGridMode({ className: "main-nav_subscribe" });
    }
  });
};

/**
 * @param {언론사 토글 중 선택한 클래스 이름} className
 */
const onClickGridMode = ({ className }) => {
  onClickSubscribeMode({ className });
  STATE.GRID_PAGE_NUM = 0;
  setNewPage(0, MEDIA_NUM);
};

/**
 * 페이지 전환 / 모드 전환 시 새로운 페이지 세팅
 */
const setNewPage = (start) => {
  if (!STATE.MODE.IS_TOTAL && STATE.SUBSCRIBE_LIST.length === 0) {
    alert("구독중인 언론사가 없습니다!!");
    onClickSubscribeMode({ className: "main-nav_total" });
    return;
  }
  changeButtonView(start);
  changeImgSrc(start);
  setArrowVisible();
};

/**
 * 언론사 이미지 src 변경
 * @param {언론사 리스트 중 시작 idx} start
 */
const changeImgSrc = (start) => {
  for (let i = start; i < start + MEDIA_NUM; i++) {
    const mediaIdx = STATE.MODE.IS_TOTAL ? idList[i] : STATE.SUBSCRIBE_LIST[i];

    const $img = document.querySelector(`.img${i - start}`);
    const $buttonWrapper = $img.nextSibling;

    if (mediaIdx === undefined) {
      $img.src = "";
      $buttonWrapper.style.display = "none";
      continue;
    }

    $buttonWrapper.style.display = "";

    const imgSrc = STATE.MODE.IS_LIGHT
      ? `${mediaInfo[mediaIdx].path_light}`
      : `${mediaInfo[mediaIdx].path_dark}`;

    const checkImg = new Image();
    checkImg.src = imgSrc;
    checkImg.onload = () => {
      $img.src = imgSrc;
    };
    checkImg.onerror = () => {
      $img.src = "";
    };
  }
};

/**
 * @param {현재 페이지 media 정보} mediaList
 */
const changeButtonView = (start) => {
  const $newsList = $newsWrapper.querySelectorAll("li");

  $newsList.forEach((li, idx) => {
    const $buttonWrapper = li.querySelector(".news-grid_button_wrapper");
    $buttonWrapper.remove();
    li.append(addSubscribeButton(start + idx));
  });
};

/**
 * Grid 화살표 클릭하기
 * @param num 페이지 이동을 위한 카운트 변수
 */
const clickArrow = (num) => {
  STATE.GRID_PAGE_NUM += num;

  let start = STATE.GRID_PAGE_NUM * MEDIA_NUM;
  setNewPage(start);
};

/**
 * Grid 화살표 hidden 처리하기
 */
const setArrowVisible = () => {
  const $leftArrow = document.querySelector(".left-arrow");
  const $rightArrow = document.querySelector(".right-arrow");

  // 페이지 제한 0~3에 따른 hidden 여부
  if (STATE.GRID_PAGE_NUM === 0) {
    $leftArrow.classList.add("hidden");
    $rightArrow.classList.remove("hidden");
  } else if (STATE.GRID_PAGE_NUM > 0 && STATE.GRID_PAGE_NUM < 3) {
    $leftArrow.classList.remove("hidden");
    $rightArrow.classList.remove("hidden");
  } else if (STATE.GRID_PAGE_NUM === 3) {
    $leftArrow.classList.remove("hidden");
    $rightArrow.classList.add("hidden");
  }

  // 미디어 개수에 따른 hidden 여부
  const totalPage = STATE.MODE.IS_TOTAL
    ? idList.length / MEDIA_NUM
    : STATE.SUBSCRIBE_LIST.length / MEDIA_NUM;

  if (STATE.GRID_PAGE_NUM < totalPage - 1) {
    $rightArrow.classList.remove("hidden");
  } else {
    $rightArrow.classList.add("hidden");
  }
};

const getGridInfo = async () => {
  mediaInfo = await getJSON("/assets/media-content.json");
};

/**
 * 초기 그리드뷰 세팅
 */
async function initGridView() {
  await getGridInfo();
  idList = shuffleList(idList);
  makeGrid();
  setArrowVisible();
  setGridArrowEvent();
  setGridModeEvent();
}
export { initGridView, setNewPage, changeImgSrc };
