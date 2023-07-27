import { MEDIA, URL } from "../../constant.js";
import { getJSON } from "../data.js";
import { shuffleList } from "../utils.js";
import { getState, register, setState } from "../../observer/observer.js";
import {
  gridPageNum,
  isLightMode,
  isTotalMode,
  mediaIdList,
  mediaInfo,
  subscribeList,
} from "../../store/index.js";
import {
  clickSubButton,
  setGridArrowEvent,
  setGridModeEvent,
} from "./event.js";

const MEDIA_NUM = MEDIA.GRID_ROW_NUM * MEDIA.GRID_COLUMN_NUM;
const $newsWrapper = document.querySelector(".news-grid-wrapper");

/**
 * 언론사 Grid 제작하기
 */
const makeGrid = () => {
  for (let i = 0; i < MEDIA_NUM; i++) {
    const $li = document.createElement("li");
    const $img = document.createElement("img");
    $img.classList.add(`img${i}`);
    $img.style.height = "20px";
    $li.appendChild($img);

    const $buttonWrapper = setButttonWrapper(i);
    $li.append($buttonWrapper);
    $newsWrapper.append($li);
  }
  changeImgSrc();
  changeButtonView();
};

/**
 * 언론사 이미지 src 변경
 * @param {언론사 리스트 중 시작 idx} start
 */
const changeImgSrc = () => {
  const start = getState(gridPageNum) * MEDIA_NUM;

  for (let i = start; i < start + MEDIA_NUM; i++) {
    const mediaIdx = getState(isTotalMode)
      ? getState(mediaIdList)[i]
      : getState(subscribeList)[i];

    const $img = document.querySelector(`.img${i - start}`);

    if (mediaIdx === undefined) {
      $img.src = "";
      continue;
    }

    const imgSrc = getState(isLightMode)
      ? `${getState(mediaInfo)[mediaIdx].path_light}`
      : `${getState(mediaInfo)[mediaIdx].path_dark}`;
    $img.src = imgSrc;
  }
};

/**
 * 버튼 Wrapper 재설정
 * @param {현재 페이지 media 정보} mediaList
 */
const changeButtonView = () => {
  const rerender = getState(subscribeList);
  const start = getState(gridPageNum) * MEDIA_NUM;
  const $newsList = $newsWrapper.querySelectorAll("li");

  $newsList.forEach((li, idx) => {
    const $buttonWrapper = li.querySelector(".news-grid_button_wrapper");
    $buttonWrapper.remove();
    li.append(setButttonWrapper(start + idx));
  });
};

/**
 * 구독 버튼 영역 추가
 */
const setButttonWrapper = (idx) => {
  const mediaId = getState(isTotalMode)
    ? getState(mediaIdList)[idx]
    : getState(subscribeList)[idx];
  const $buttonWrapper = document.createElement("div");
  $buttonWrapper.classList.add("news-grid_button_wrapper");

  const mediaIdx = getState(isTotalMode)
    ? getState(mediaIdList)[idx]
    : getState(subscribeList)[idx];

  const $button = document.createElement("button");
  $button.classList.add(
    getState(subscribeList).includes(mediaId)
      ? "news-grid_subscribed_btn"
      : "news-grid_unsubscribed_btn"
  );
  $button.innerText = getState(subscribeList).includes(mediaId)
    ? "x 해지하기"
    : "+ 구독하기";

  $button.addEventListener("click", () => {
    clickSubButton(idx);
  });

  $buttonWrapper.append($button);

  mediaIdx === undefined
    ? ($buttonWrapper.style.display = "none")
    : ($buttonWrapper.style.display = "");

  return $buttonWrapper;
};

/**
 * Grid 화살표 hidden 처리하기
 */
const setArrowVisible = () => {
  const $leftArrow = document.querySelector(".left-arrow");
  const $rightArrow = document.querySelector(".right-arrow");

  // 페이지 제한 0~3에 따른 hidden 여부
  if (getState(gridPageNum) === 0) {
    $leftArrow.classList.add("hidden");
    $rightArrow.classList.remove("hidden");
  } else if (getState(gridPageNum) > 0 && getState(gridPageNum) < 3) {
    $leftArrow.classList.remove("hidden");
    $rightArrow.classList.remove("hidden");
  } else if (getState(gridPageNum) === 3) {
    $leftArrow.classList.remove("hidden");
    $rightArrow.classList.add("hidden");
  }

  // 미디어 개수에 따른 hidden 여부
  const totalPage = getState(isTotalMode)
    ? getState(mediaIdList).length / MEDIA_NUM
    : getState(subscribeList).length / MEDIA_NUM;

  getState(gridPageNum) < totalPage - 1
    ? $rightArrow.classList.remove("hidden")
    : $rightArrow.classList.add("hidden");
};

const getGridInfo = async () => {
  setState(mediaInfo, await getJSON(URL.MEDIA_INFO));
  setState(mediaIdList, shuffleList(getState(mediaIdList)));
};

const initGridRegister = () => {
  register(
    [gridPageNum, isTotalMode, subscribeList, isLightMode],
    changeImgSrc
  );
  register(
    [gridPageNum, isTotalMode, mediaIdList, subscribeList, isTotalMode],
    setArrowVisible
  );
  register([gridPageNum, subscribeList], changeButtonView);
};

/**
 * 초기 그리드뷰 세팅
 */
async function initGridView() {
  initGridRegister();

  await getGridInfo();
  makeGrid();
  setArrowVisible();
  setGridArrowEvent();
  setGridModeEvent();
}
export { initGridView };
