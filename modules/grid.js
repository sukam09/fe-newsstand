import { MEDIA, STATE } from "../constant.js";
import { getJSON } from "./data.js";
import { shuffleList, setViewEvent } from "./utils.js";

const MEDIA_NUM = MEDIA.GRID_ROW_NUM * MEDIA.GRID_COLUMN_NUM;
// 전체 언론사 영역
let idList = Array.from({ length: MEDIA.TOTAL_NUM }, (_, idx) => idx);
// 내가 구독한 언론사 -> STATE.SUBSCRIBE_LIST
let mediaInfo;

const $newsWrapper = document.querySelector(".news-grid-wrapper");

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
    };

    const $buttonWrapper = addSubscribeButton(i);

    $li.append($buttonWrapper);
    $newsWrapper.append($li);
  }
};

/**
 * 구독 버튼 영역 추가
 */
const addSubscribeButton = (idx) => {
  const mediaId = idList[idx];
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
  const mediaId = idList[idx];
  const subIdx = STATE.SUBSCRIBE_LIST.indexOf(mediaId);

  if (subIdx !== -1) {
    STATE.SUBSCRIBE_LIST.splice(subIdx);
    alert("구독해지되었습니다.");
  } else {
    STATE.SUBSCRIBE_LIST = [...STATE.SUBSCRIBE_LIST, mediaId];
  }

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

const $totalMedia = document.querySelector(".main-nav_total");
const $subscribeMedia = document.querySelector(".main-nav_subscribe");

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

const onClickGridMode = ({ className }) => {
  const $selected =
    className === "main-nav_total" ? $totalMedia : $subscribeMedia;
  const $unselected =
    className === "main-nav_total" ? $subscribeMedia : $totalMedia;

  $selected.classList.remove("main-nav_unselected");
  $selected.classList.add("main-nav_selected");

  $unselected.classList.remove("main-nav_selected");
  $unselected.classList.add("main-nav_unselected");

  STATE.MODE.IS_TOTAL = $selected === $totalMedia ? true : false;
  STATE.GRID_PAGE_NUM = 0;

  changeImgSrc(0, MEDIA_NUM);
  changeButtonView(0, MEDIA_NUM);
  setArrowVisible();
};

/**
 * 언론사 이미지 src 변경
 */
const changeImgSrc = (start, end) => {
  for (let i = start; i < end; i++) {
    const $img = document.querySelector(`.img${i - start}`);
    const imgSrc = STATE.MODE.IS_LIGHT
      ? `${mediaInfo[idList[i]].path_light}`
      : `${mediaInfo[idList[i]].path_dark}`;

    const checkImg = new Image();
    checkImg.src = imgSrc;
    checkImg.onload = () => {
      $img.src = imgSrc;
    };
    checkImg.onerror = () => {
      $img.remove();
    };
  }
};

/**
 * @param {현재 페이지 media 정보} mediaList
 */
const changeButtonView = (start, end) => {
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

  let [start, end] = [
    STATE.GRID_PAGE_NUM * MEDIA_NUM,
    (STATE.GRID_PAGE_NUM + 1) * MEDIA_NUM,
  ];
  changeImgSrc(start, end);
  changeButtonView(start, end);
  setArrowVisible();
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
  setArrowVisible();
  setViewEvent();
  makeGrid();
  setGridArrowEvent();
  setGridModeEvent();
}
export { initGridView, setArrowVisible };
