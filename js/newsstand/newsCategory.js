import { CATEGORY } from "../state/categoryState.js";

import { makeCategoryTag } from "../tag/categoryTag.js";
import { makeButtonTag } from "../tag/buttonTag.js";
import { getCategoryData } from "../fetchAPI.js";
import {
  nextContents,
  makeNewsList,
  startProgressAction,
  removeProgressAction,
  onUserRightClickCategory,
  onUserLeftClickCategory,
  onUserClickCategory,
} from "../utils/category.js";

const category = [
  "종합/경제",
  "방송/통신",
  "IT",
  "영자지",
  "스포츠/연예",
  "매거진/전문지",
  "지역",
];

// 카테고리 태그, 리스트 버튼 태그 생성.
makeCategoryTag(category);
makeButtonTag(
  ".newsstand__list-navigation-btn",
  "left-list-button btn-disabled",
  "right-list-button btn-disabled"
);

// 뉴스 데이터 가져오기
const economyData = await getCategoryData("./data/category/economy.json");
const broadCastData = await getCategoryData("./data/category/broadcast.json");
const itData = await getCategoryData("./data/category/it.json");
const englishData = await getCategoryData("./data/category/english.json");
const sportsData = await getCategoryData("./data/category/sports.json");
const magazineData = await getCategoryData("./data/category/magazine.json");
const localData = await getCategoryData("./data/category/local.json");

const categoryList = Array.from(
  document.querySelectorAll(".newsstand__news-nav li")
);
const categoryDataList = [
  economyData,
  broadCastData,
  itData,
  englishData,
  sportsData,
  magazineData,
  localData,
];
const categoryDataLength = [
  economyData.length,
  broadCastData.length,
  itData.length,
  englishData.length,
  sportsData.length,
  magazineData.length,
  localData.length,
];

const CATEROY_NUMBER = categoryList.length;

const leftBtn = document.querySelector(".left-list-button");
const rightBtn = document.querySelector(".right-list-button");

export async function paintNewsCategory() {
  addAnimationEvent();
  makeNewsList(CATEGORY.FIRST_PAGE, CATEROY_NUMBER, categoryDataList);
  // 사용자가 직접 카테고리를 클릭하면 움직이는 기능.
  onUserClickCategory(
    CATEROY_NUMBER,
    categoryDataList,
    categoryList,
    categoryDataLength
  );

  // 이전 또는 다음 콘텐츠를 보여주도록 함.
  onUserLeftClickCategory(
    leftBtn,
    CATEROY_NUMBER,
    categoryList,
    categoryDataLength,
    categoryDataList
  );
  onUserRightClickCategory(
    rightBtn,
    CATEROY_NUMBER,
    categoryList,
    categoryDataLength,
    categoryDataList
  );
}

// 그리드 뷰에서 리스트 뷰로 전환시 프로그래스 바를 처음부터 진행시켜주는 함수.
export function restartProgressBar() {
  CATEGORY.currentCategory = 0;
  // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
  removeProgressAction();

  // 종합/경제 카테고리 li에 클래스 추가.
  startProgressAction(categoryList, categoryDataLength);
}

export function addListdButton() {
  leftBtn.classList.remove("btn-disabled");
  rightBtn.classList.remove("btn-disabled");
}
export function deleteListButton() {
  leftBtn.classList.add("btn-disabled");
  rightBtn.classList.add("btn-disabled");
}

// 카테고리에 애니메이션과 관련된 이벤트리스너 등록
function addAnimationEvent() {
  categoryList.map((element, idx) => {
    element.addEventListener(
      "animationiteration",
      handleProgressAnimationIteration(element, idx)
    );
    element.addEventListener("animationend", handlProgressAnimationEnd());
  });
}

// 프로그래스 바 애니매이션 종료시 실행하는 함수
function handlProgressAnimationEnd() {
  return function () {
    removeProgressAction();

    CATEGORY.goBefore ? --CATEGORY.currentCategory : ++CATEGORY.currentCategory;

    CATEGORY.currentCategory =
      CATEGORY.currentCategory < 0
        ? CATEROY_NUMBER - 1
        : CATEGORY.currentCategory;

    CATEGORY.currentCategory %= CATEROY_NUMBER;

    startProgressAction(categoryList, categoryDataLength);

    makeNewsList(CATEGORY.FIRST_PAGE, CATEROY_NUMBER, categoryDataList);

    CATEGORY.goBefore = 0;
  };
}

// 프로그래스 바가 진행중일때 실행되는 함수.
function handleProgressAnimationIteration(element, idx) {
  return function () {
    ++CATEGORY.currentContents;
    nextContents(
      "auto",
      CATEROY_NUMBER,
      categoryList,
      categoryDataLength,
      categoryDataList
    );
    element.children[2].textContent = `${CATEGORY.currentContents}`;
    element.children[3].textContent = `/${categoryDataLength[idx]}`;
    makeNewsList(
      CATEGORY.currentContents - 1,
      CATEROY_NUMBER,
      categoryDataList
    );
  };
}
