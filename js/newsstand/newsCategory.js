import { makeCategoryTag } from "../tag/categoryTag.js";
import { makeButtonTag } from "../tag/buttonTag.js";
import { getCategoryData } from "../fetchAPI.js";
import { removeChildElement } from "../utils/util.js";
import {
  nextContents,
  activeProgressClass,
  deactiveProgressClass,
  makeNewsList,
  removeProgressAction,
} from "../utils/category.js";

// console.log(CATEGORY);

// 카테고리 태그, 리스트 버튼 태그 생성.
makeCategoryTag();
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
const dummyData = [
  economyData.length,
  broadCastData.length,
  itData.length,
  englishData.length,
  sportsData.length,
  magazineData.length,
  localData.length,
];

const CATEROY_NUMBER = categoryList.length;
const FIRST_CATEGORY = 0;
const FIRST_PAGE = 0;

const leftBtn = document.querySelector(".left-list-button");
const rightBtn = document.querySelector(".right-list-button");
let currentCategory = 0;
let currentContents = 1;
let goBefore = false;
export function paintNewsCategory() {
  addAnimationEvent();
  makeNewsList(FIRST_PAGE, CATEROY_NUMBER, currentCategory, categoryDataList);
  // 사용자가 직접 카테고리를 클릭하면 움직이는 기능.
  categoryList.map((element, idx) => {
    element.addEventListener("click", (e) => {
      // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
      removeProgressAction();
      currentCategory = idx % 7;
      startProgressAction(currentCategory);

      // 목록에 맞는 데이터 생성
      makeNewsList(
        FIRST_PAGE,
        CATEROY_NUMBER,
        currentCategory,
        categoryDataList
      );
    });
  });

  // 이전 또는 다음 콘텐츠를 보여주도록 함.
  leftBtn.addEventListener("click", () => {
    --currentContents;

    if (currentContents <= 0) {
      goBefore = true;
      currentContents = 1;
    }
    currentContents = currentContents <= 0 ? 1 : currentContents;
    nextContents(
      "left",
      currentCategory,
      currentContents,
      CATEROY_NUMBER,
      categoryList,
      dummyData,
      categoryDataList,
      goBefore
    );
  });
  rightBtn.addEventListener("click", () => {
    ++currentContents;
    nextContents(
      "right",
      currentCategory,
      currentContents,
      CATEROY_NUMBER,
      categoryList,
      dummyData,
      categoryDataList
    );
  });
}

// 그리드 뷰에서 리스트 뷰로 전환시 프로그래스 바를 처음부터 진행시켜주는 함수.
export function restartProgressBar() {
  // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
  removeProgressAction();

  // 종합/경제 카테고리 li에 클래스 추가.
  startProgressAction(FIRST_CATEGORY);
}

// 프로그래스 바 액션을 추가.

// 카테고리 변경시 프로그래스 바 진행.
function startProgressAction(currentCategory) {
  currentContents = 1;

  const childIndex = currentCategory;
  const element = categoryList[childIndex]; // 자식 찾기

  activeProgressClass(element, childIndex, currentContents, dummyData);
}

// 현재 보고있는 카테고리의 인덱스의 상태를 관리해주는 함수.
function setCurrentCategorystatus(value) {
  currentCategory = value;
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

    goBefore ? --currentCategory : ++currentCategory;

    currentCategory =
      currentCategory < 0 ? CATEROY_NUMBER - 1 : currentCategory;

    currentCategory %= CATEROY_NUMBER;

    setCurrentCategorystatus(currentCategory);

    startProgressAction(currentCategory);

    makeNewsList(FIRST_PAGE, CATEROY_NUMBER, currentCategory, categoryDataList);

    goBefore = false;
  };
}

// 프로그래스 바가 진행중일때 실행되는 함수.
function handleProgressAnimationIteration(element, idx) {
  return function () {
    ++currentContents;
    nextContents(
      "auto",
      currentCategory,
      currentContents,
      CATEROY_NUMBER,
      categoryList,
      dummyData,
      categoryDataList
    );
    element.children[2].textContent = `${currentContents}`;
    element.children[3].textContent = `/${dummyData[idx]}`;
    makeNewsList(
      currentContents - 1,
      CATEROY_NUMBER,
      currentCategory,
      categoryDataList
    );
  };
}

export function addListdButton() {
  leftBtn.classList.remove("btn-disabled");
  rightBtn.classList.remove("btn-disabled");
}
export function deleteListButton() {
  leftBtn.classList.add("btn-disabled");
  rightBtn.classList.add("btn-disabled");
}
