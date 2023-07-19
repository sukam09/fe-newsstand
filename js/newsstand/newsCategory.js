import { CATEGORY } from "../state/categoryState.js";
import { navTab } from "../state/navFocusStats.js";
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
import { subscribeState } from "../store/subscribeState.js";
import { removeChildElement } from "../utils/util.js";

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
// makeCategoryTag(category);
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

const CATEROY_NUMBER = 7;

const mySubscribe = document.querySelector(".newsstand-subscribe-publisher");
const allPublisher = document.querySelector(".newsstand-all-publisher");
addEventOnMySubAndAllSub();

export function paintNewsCategory() {
  const categoryNameList = navTab.isMySubscribe ? mySubArray() : category;
  const totalCategory = navTab.isMySubscribe
    ? mySubArray().length
    : CATEROY_NUMBER;

  const contentsLength = navTab.isMySubscribe
    ? new Array(mySubArray().length).fill(1)
    : categoryDataLength;

  const categoryParent = document.querySelector(".newsstand__news-nav");
  const btnParent = document.querySelector(".newsstand__list-navigation-btn");

  // 기존에 존재하던 카테고리 리스트와 버튼 리스트 제거.
  removeChildElement(categoryParent);
  removeChildElement(btnParent);

  // 카테고리 리스트와 버튼 생성.
  makeCategoryTag(categoryParent, categoryNameList);
  makeButtonTag(
    ".newsstand__list-navigation-btn",
    "left-list-button",
    "right-list-button"
  );

  // li태그와 버튼 태그
  const categoryList = Array.from(categoryParent.children);
  const leftBtn = document.querySelector(".left-list-button");
  const rightBtn = document.querySelector(".right-list-button");

  // 애니메이션 이벤트 추가
  addAnimationEvent(categoryList, totalCategory, contentsLength);

  // 뉴스리스트 생성
  makeNewsList(CATEGORY.FIRST_PAGE, totalCategory, categoryDataList);
  // 각각의 클릭, 버튼 이벤트 추가
  onUserClickCategory(
    totalCategory,
    categoryDataList,
    categoryList,
    contentsLength,
    totalCategory
  );
  // 이전 또는 다음 콘텐츠를 보여주도록 함.
  onUserLeftClickCategory(
    leftBtn,
    totalCategory,
    categoryList,
    contentsLength,
    categoryDataList
  );
  onUserRightClickCategory(
    rightBtn,
    totalCategory,
    categoryList,
    contentsLength,
    categoryDataList
  );
  restartProgressBar(categoryList, contentsLength);
}

// 그리드 뷰에서 리스트 뷰로 전환시 프로그래스 바를 처음부터 진행시켜주는 함수.
function restartProgressBar(categoryList, contentsLength) {
  // 첫 번째 카테고리로 초기화
  CATEGORY.currentCategory = 0;
  // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
  removeProgressAction();
  // 종합/경제 카테고리 li에 프로그래스 바 클래스 추가.
  startProgressAction(categoryList, contentsLength);
}

export function addListdButton() {
  const leftBtn = document.querySelector(".left-list-button");
  const rightBtn = document.querySelector(".right-list-button");

  leftBtn.classList.remove("btn-disabled");
  rightBtn.classList.remove("btn-disabled");
}
export function deleteListButton() {
  const leftBtn = document.querySelector(".left-list-button");
  const rightBtn = document.querySelector(".right-list-button");

  leftBtn.classList.add("btn-disabled");
  rightBtn.classList.add("btn-disabled");
}

// 카테고리에 애니메이션과 관련된 이벤트리스너 등록
function addAnimationEvent(categoryList, totalCategory, contentsLength) {
  categoryList.map((element, idx) => {
    element.addEventListener(
      "animationiteration",
      handleProgressAnimationIteration(
        element,
        idx,
        categoryList,
        totalCategory,
        contentsLength
      )
    );
    element.addEventListener(
      "animationend",
      handlProgressAnimationEnd(categoryList, totalCategory, contentsLength)
    );
  });
}

// 내가 구독한 언론사일때 실행되는 함수
function addEventOnMySubAndAllSub() {
  mySubscribe.addEventListener("click", () => {
    navTab.isMySubscribe = true;
    paintNewsCategory();
  });
  allPublisher.addEventListener("click", () => {
    navTab.isMySubscribe = false;
    paintNewsCategory();
    console.log("리스트에서의 전체 언론사");
  });
}

function mySubArray() {
  return subscribeState.getSubscribeState().map((it) => it[0]);
}

// 프로그래스 바 애니매이션 종료시 실행하는 함수
function handlProgressAnimationEnd(
  categoryList,
  totalCategory,
  contentsLength
) {
  return function () {
    removeProgressAction();

    CATEGORY.goBefore ? --CATEGORY.currentCategory : ++CATEGORY.currentCategory;

    CATEGORY.currentCategory =
      CATEGORY.currentCategory < 0
        ? totalCategory - 1
        : CATEGORY.currentCategory;

    CATEGORY.currentCategory %= totalCategory;

    startProgressAction(categoryList, contentsLength);

    makeNewsList(CATEGORY.FIRST_PAGE, totalCategory, categoryDataList);

    CATEGORY.goBefore = 0;
  };
}

// 프로그래스 바가 진행중일때 실행되는 함수.
function handleProgressAnimationIteration(
  element,
  idx,
  categoryList,
  totalCategory,
  contentsLength
) {
  return function () {
    ++CATEGORY.currentContents;
    nextContents(
      "auto",
      totalCategory,
      categoryList,
      contentsLength,
      categoryDataList
    );
    element.children[2].textContent = `${CATEGORY.currentContents}`;
    element.children[3].textContent = `/${contentsLength[idx]}`;
    makeNewsList(CATEGORY.currentContents - 1, totalCategory, categoryDataList);
  };
}
