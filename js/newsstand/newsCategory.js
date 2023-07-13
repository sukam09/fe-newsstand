import { makeCategoryTag } from "../tag/categoryTag.js";
import { makeButtonTag } from "../tag/buttonTag.js";
import { getCategoryData } from "../fetchAPI.js";

// 카테고리 태그, 리스트 버튼 태그 생성.
makeCategoryTag();
makeButtonTag(
  ".newsstand__list-navigation-btn",
  "left-list-button btn-disabled",
  "right-list-button btn-disabled"
);

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

const leftBtn = document.querySelector(".left-list-button");
const rightBtn = document.querySelector(".right-list-button");
let currentPage = 0;

export function paintNewsCategory() {
  makeNewsList(0);
  // 사용자가 직접 카테고리를 클릭하면 움직이는 기능.
  categoryList.map((element, idx) => {
    element.addEventListener("click", (e) => {
      // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
      removeProgressAction();

      // 선택된 li에 프로그래스 바 추가.
      setChildIndexStatus(idx);
      addProgressAction(idx % 7);

      // 목록에 맞는 데이터 생성
      makeNewsList(0);
    });
  });

  // 화살표를 클릭했을때 카테고리 이동 기능.
  leftBtn.addEventListener("click", () => {
    if (currentPage < 1) {
      currentPage = CATEROY_NUMBER;
    }
    currentPage -= 1;
    // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
    removeProgressAction();
    // 선택된 li에 프로그래스 바 추가.
    addProgressAction(currentPage);

    // 목록에 맞는 데이터 생성
    makeNewsList(0);
  });
  rightBtn.addEventListener("click", () => {
    currentPage += 1;
    // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
    removeProgressAction();
    // 선택된 li에 프로그래스 바 추가.
    addProgressAction(currentPage);

    // 목록에 맞는 데이터 생성
    makeNewsList(0);
  });
}

export function restartProgressBar() {
  // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
  removeProgressAction();

  // 종합/경제 카테고리 li에 클래스 추가.
  addProgressAction(FIRST_CATEGORY);
}

// 프로그래스 바 액션을 추가.

// 애니메이션 이벤트 추가
// childIndex는 자식이 몇번째 위치하는지 나타냄.
function addProgressAction(currentPage) {
  let nowCount = 1;
  const childIndex = currentPage % CATEROY_NUMBER;
  const element = categoryList[childIndex]; // 자식 찾기
  element.style.padding = 0; // 선택된 카테고리의 padding 제거
  element.classList.add("newsstand__focus");
  element.classList.add("newsstand__focus-font");
  element.children[0].classList.add("newsstand__progress"); // 첫번째 자식: 프로그래스 바
  element.children[1].classList.add("newsstand__progress-category"); // 두번째 자식: 카테고리 제목
  element.children[2].classList.add("newsstand__progress-total"); // 세번째 자식: 진행상황 (1/82)
  element.children[2].textContent = `${nowCount}/${dummyData[childIndex]}`;

  // animationIterationCount 속성을부여해 원하는 횟수만큼 프로그래스 바 진행.
  element.children[0].style.animationIterationCount = dummyData[childIndex];

  // 애니메이션이 진행중인 엘리먼트에 이벤트리스너를 만들어서 애니메이션 추적.
  element.children[0].addEventListener("animationstart", (e) => {
    // console.log(e);
  });
  element.children[0].addEventListener("animationiteration", (e) => {
    ++nowCount;
    element.children[2].textContent = `${nowCount}/${dummyData[childIndex]}`;
    makeNewsList(nowCount - 1);
  });
  // 프로그래스 바 진행이 완료되면 진행중이던 엘리먼트를 삭제하고 다음에 진행될 카테고리 실행.
  element.children[0].addEventListener("animationend", (e) => {
    removeProgressAction(element);
    ++currentPage;
    setChildIndexStatus(currentPage);
    addProgressAction(currentPage);
    makeNewsList(0);
  });
}

function setChildIndexStatus(value) {
  currentPage = value;
}

function removeProgressAction() {
  const prevSelected = Array.from(
    document.querySelectorAll(".newsstand__focus")
  );

  // 프로그래스 바가 진행중인 카테고리가 있다면 전부 찾아서 제거.
  if (prevSelected) {
    prevSelected.map((element) => {
      element.style.padding = "16px";
      element.classList.remove("newsstand__focus");
      element.classList.remove("newsstand__focus-font");
      element.children[0].classList.remove("newsstand__progress");
      element.children[1].classList.remove("newsstand__progress-category");
      element.children[2].classList.remove("newsstand__progress-total");
      element.children[2].textContent = "";

      // animationIterationCount 제거
      element.children[0].style.animationIterationCount = 0;
    });
  }
}

// 로고 / 편집일 / 구독하기 태그 생성
function makeMainNewsNav(logo, edit) {
  const newsNavParent = document.querySelector(".newsstand__current-view");

  // 기존 메인 뉴스 navbar 삭제.
  removeChildElement(newsNavParent);

  const publisherLogo = `<div><img src=${logo} alt="" class="newsstand--publisher-logo"/></div>`;
  const editDay = `<div class="newsstand__current-edit">${edit}</div>`;
  const subButton = `<button class="newsstand__current-button">+ 구독하기</button>`;
  newsNavParent.innerHTML += publisherLogo;
  newsNavParent.innerHTML += editDay;
  newsNavParent.innerHTML += subButton;
}

function makeMainNews(img, title) {
  const newsMainContentParent = document.querySelector(".newsstand__list-left");

  // 기존 메인 뉴스 데이터 삭제.
  removeChildElement(newsMainContentParent);

  const thumbnailImg = `<img class="title-image" src="${img}" alt=""/>`;
  const contentTitle = `<div class="newsstand--subtitle">${title}</div>`;

  newsMainContentParent.innerHTML += thumbnailImg;
  newsMainContentParent.innerHTML += contentTitle;
}

function makeNewsList(idx) {
  const newsListParent = document.querySelector(".newsstand__list-right");
  const page = idx;

  const data = categoryDataList[currentPage % CATEROY_NUMBER];
  const img = data[page].imgSrc;
  const title = data[page].title[0];
  const logo = data[page].lightSrc;
  const edit = data[page].edit;
  // 기존 뉴스 목록 데이터 삭제.
  removeChildElement(newsListParent);

  // 메인뉴스 nav 생성
  makeMainNewsNav(logo, edit);

  // 왼쪽 헤더라인 생성.
  makeMainNews(img, title);

  data[page].title.map((it) => {
    const li = `<li> ${it} </li>`;
    newsListParent.innerHTML += li;
  });
  const li = `<li class="newsstand__edit-corp">${data[page].name} 언론사에서 직접 편집한 뉴스입니다.</li>`;
  newsListParent.innerHTML += li;
}

function removeChildElement(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

export function addListdButton() {
  leftBtn.classList.remove("btn-disabled");
  rightBtn.classList.remove("btn-disabled");
}
export function deleteListButton() {
  leftBtn.classList.add("btn-disabled");
  rightBtn.classList.add("btn-disabled");
}
