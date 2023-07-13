import { MEDIA } from "../constant.js";
import { STATE } from "../state.js";
import { shuffleList, setViewEvent } from "./utils.js";

const MEDIA_NUM = MEDIA.GRID_ROW_NUM * MEDIA.GRID_COLUMN_NUM;
let idList = Array.from({ length: MEDIA.TOTAL_NUM }, (_, idx) => idx);

/**
 * 언론사 Grid 제작하기
 */
const makeGrid = () => {
  const $newsWrapper = document.querySelector(".news-grid-wrapper");

  for (let i = 0; i < MEDIA_NUM; i++) {
    const $li = document.createElement("li");
    const imgSrc = STATE.IS_LIGHT
      ? `/images/light-media/${idList[i]}.png`
      : `/images/dark-media/${idList[i]}.png`;

    const checkImg = new Image();
    checkImg.src = imgSrc;
    checkImg.onload = () => {
      const $img = document.createElement("img");
      $img.classList.add(`img${i}`);
      $img.src = imgSrc;
      $img.style.height = "20px";
      $li.appendChild($img);
    };

    $newsWrapper.append($li);
  }
};

const setGridArrowEvent = () => {
  // 화살표 클릭 이벤트 추가
  const $leftArrow = document.querySelector(".left-arrow");
  const $rightArrow = document.querySelector(".right-arrow");

  $leftArrow.addEventListener("click", () => {
    if (STATE.IS_GRID) clickArrow(-1);
  });
  $rightArrow.addEventListener("click", () => {
    if (STATE.IS_GRID) clickArrow(+1);
  });
};

/**
 * 언론사 이미지 src 변경하기
 */
const changeImgSrc = () => {
  let newImg = idList.slice(
    STATE.GRID_PAGE_NUM * MEDIA_NUM,
    STATE.GRID_PAGE_NUM * MEDIA_NUM + MEDIA_NUM
  );

  for (let i = 0; i < MEDIA_NUM; i++) {
    const $img = document.querySelector(`.img${i}`);
    const imgSrc = STATE.IS_LIGHT
      ? `./images/light-media/${newImg[i]}.png`
      : `./images/dark-media/${newImg[i]}.png`;

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
 * Grid 화살표 클릭하기
 */
const clickArrow = (num) => {
  STATE.GRID_PAGE_NUM += num;
  changeImgSrc(STATE.GRID_PAGE_NUM);
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
  } else if (STATE.GRID_PAGE_NUM > 0 && STATE.GRID_PAGE_NUM < 3) {
    $leftArrow.classList.remove("hidden");
    $rightArrow.classList.remove("hidden");
  } else if (STATE.GRID_PAGE_NUM === 3) {
    $rightArrow.classList.add("hidden");
  }

  // 언론사 로고 개수 따른 hidden 여부
};

async function initGridView() {
  shuffleList(idList);
  setArrowVisible();
  setViewEvent();
  makeGrid();
  setGridArrowEvent();
}
export { initGridView, setArrowVisible };
