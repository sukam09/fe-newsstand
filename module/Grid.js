import { MEDIA } from "../constant.js";
import { idList } from "../index.js";

let isLightMode = true;
let pageNum = 0;
const MEDIA_NUM = MEDIA.GRID_ROW_NUM * MEDIA.GRID_COLUMN_NUM;

/**
 * 언론사 Grid 제작하기
 */
const makeGrid = () => {
  const $newsWrapper = document.querySelector(".news-wrapper");

  for (let i = 0; i < MEDIA_NUM; i++) {
    const $li = document.createElement("li");
    const imgSrc = isLightMode
      ? `./img/light-media/${idList[i]}.png`
      : `./img/dark-media/${idList[i]}.png`;

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

  // 화살표 클릭 이벤트 추가
  const $leftArrow = document.querySelector(".left-arrow");
  const $rightArrow = document.querySelector(".right-arrow");

  $leftArrow.addEventListener("click", () => clickArrow(-1));
  $rightArrow.addEventListener("click", () => clickArrow(+1));
};

/**
 * 언론사 이미지 src 변경하기
 */
const changeImgSrc = (pageNum) => {
  let newImg = idList.slice(
    pageNum * MEDIA_NUM,
    pageNum * MEDIA_NUM + MEDIA_NUM
  );

  for (let i = 0; i < MEDIA_NUM; i++) {
    const $img = document.querySelector(`.img${i}`);
    const imgSrc = isLightMode
      ? `./img/light-media/${newImg[i]}.png`
      : `./img/dark-media/${newImg[i]}.png`;

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
  pageNum += num;
  changeImgSrc(pageNum);
  setArrowVisible();
};

/**
 * Grid 화살표 hidden 처리하기
 */
const setArrowVisible = () => {
  const $leftArrow = document.querySelector(".left-arrow");
  const $rightArrow = document.querySelector(".right-arrow");

  // 페이지 제한 0~3에 따른 hidden 여부
  if (pageNum === 0) {
    $leftArrow.classList.add("hidden");
  } else if (pageNum > 0 && pageNum < 3) {
    $leftArrow.classList.remove("hidden");
    $rightArrow.classList.remove("hidden");
  } else if (pageNum === 3) {
    $rightArrow.classList.add("hidden");
  }

  // 언론사 로고 개수 따른 hidden 여부
};

export { setArrowVisible, makeGrid };
