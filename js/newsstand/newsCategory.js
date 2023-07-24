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
import {
  getUserView,
  getSubscrbeList,
  getNavTabView,
  getCategoryIdx,
  getCurrentContent,
  setNavTabViewToMy,
  setNavTabViewToAll,
  setCategoryIndex,
  setContentsPage,
  setGoBefore,
  getGoBefore,
  getFirstPage,
} from "../store/state.js";
import {
  removeChildElement,
  handleElementClass,
  onFocusToClicked,
} from "../utils/util.js";
import { MESSAGE, VIEW } from "../utils/constant.js";

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
const newsData = await getCategoryData("./data/pressObj.json");
let categoryDataList = [[], [], [], [], [], [], []];
let categoryDataLength = [];
newsData.map((it) => {
  const idx = it.category;
  categoryDataList[idx].push(it);
});
categoryDataList.map((it) => categoryDataLength.push(it.length));

const CATEROY_NUMBER = 7;

const mySubscribe = document.querySelector(".newsstand-subscribe-publisher");
const allPublisher = document.querySelector(".newsstand-all-publisher");
addEventOnMySubAndAllSub();

export function paintNewsCategory() {
  makeMySubNews();

  setCategoryIndex(0);
  setContentsPage(1);

  const categoryNameList =
    getNavTabView() === MESSAGE.MY_PUBLISHER ? mySubArray() : category;

  const totalCategory =
    getNavTabView() === MESSAGE.MY_PUBLISHER
      ? mySubArray().length
      : CATEROY_NUMBER;

  const contentsLength =
    getNavTabView() === MESSAGE.MY_PUBLISHER
      ? new Array(mySubArray().length).fill(1)
      : categoryDataLength;

  const categoryNewsData =
    getNavTabView() === MESSAGE.MY_PUBLISHER
      ? makeMySubNews()
      : categoryDataList;

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
  const categoryList = [...categoryParent.children];
  const leftBtn = document.querySelector(".left-list-button");
  const rightBtn = document.querySelector(".right-list-button");

  // 애니메이션 이벤트 추가
  addAnimationEvent(categoryList, totalCategory, contentsLength);

  // 뉴스리스트 생성
  makeNewsList(getFirstPage(), totalCategory, categoryNewsData);
  // 각각의 클릭, 버튼 이벤트 추가
  onUserClickCategory(
    totalCategory,
    categoryNewsData,
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
    categoryNewsData
  );
  onUserRightClickCategory(
    rightBtn,
    totalCategory,
    categoryList,
    contentsLength,
    categoryNewsData
  );
  restartProgressBar(categoryList, contentsLength);
}

// 그리드 뷰에서 리스트 뷰로 전환시 프로그래스 바를 처음부터 진행시켜주는 함수.
function restartProgressBar(categoryList, contentsLength) {
  // 첫 번째 카테고리로 초기화
  setCategoryIndex(0);

  // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
  removeProgressAction();
  // 종합/경제 카테고리 li에 프로그래스 바 클래스 추가.
  startProgressAction(categoryList, contentsLength);
}

function makeMySubNews() {
  const subData = getSubscrbeList();

  let newSubDatas = [];
  subData.map((it) => {
    newSubDatas.push(newsData.filter((el) => el.name === it[0]));
  });

  return newSubDatas;
}

export function addListdButton() {
  const leftBtn = document.querySelector(".left-list-button");
  const rightBtn = document.querySelector(".right-list-button");

  handleElementClass(leftBtn, "remove", "btn-disabled");
  handleElementClass(rightBtn, "remove", "btn-disabled");
}
export function deleteListButton() {
  const leftBtn = document.querySelector(".left-list-button");
  const rightBtn = document.querySelector(".right-list-button");

  handleElementClass(leftBtn, "add", "btn-disabled");
  handleElementClass(rightBtn, "add", "btn-disabled");
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
    if (getUserView() === VIEW.LIST) {
      setNavTabViewToMy();
      onFocusToClicked(VIEW.MY_SUB, mySubscribe, allPublisher);
      paintNewsCategory();
    }
  });
  allPublisher.addEventListener("click", () => {
    if (getUserView() === VIEW.LIST) {
      setNavTabViewToAll();
      onFocusToClicked(VIEW.ALL_SUB, mySubscribe, allPublisher);
      paintNewsCategory();
    }
  });
}

function mySubArray() {
  const subList = getSubscrbeList() || [];
  return subList.map((it) => it[0]);
}

// 프로그래스 바 애니매이션 종료시 실행하는 함수
function handlProgressAnimationEnd(
  categoryList,
  totalCategory,
  contentsLength
) {
  return function () {
    removeProgressAction();
    let tmp = getCategoryIdx();
    getGoBefore() ? setCategoryIndex(--tmp) : setCategoryIndex(++tmp);
    tmp = tmp < 0 ? totalCategory - 1 : tmp;
    tmp %= totalCategory;
    setCategoryIndex(tmp);
    setGoBefore(false);

    startProgressAction(categoryList, contentsLength);

    makeNewsList(getFirstPage(), totalCategory, categoryDataList);
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
    let currentContents = getCurrentContent();
    setContentsPage(++currentContents);

    nextContents(
      "auto",
      totalCategory,
      categoryList,
      contentsLength,
      categoryDataList
    );

    element.children[2].textContent = `${getCurrentContent()}`;
    element.children[3].textContent = `/`;
    element.children[4].textContent = `${contentsLength[idx]}`;
    makeNewsList(getCurrentContent() - 1, totalCategory, categoryDataList);
  };
}
