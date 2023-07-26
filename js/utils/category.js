import { removeChildElement, snackBarListAction } from "../utils/util.js";
import { MESSAGE, POSITION, EVENT, VIEW } from "./constant.js";
import { unsubscribeModal } from "./unsubscribe.js";
import { getCategoryData } from "../fetchAPI.js";
import {
  isSubscribe,
  setSubscribe,
  getCurrentContent,
  setCategoryIndex,
  setContentsPage,
  getCategoryIdx,
  getFirstPage,
  getNavTabView,
  getSubscrbeList,
} from "../store/dispatch.js";

const progressClassList = [
  "newsstand__progress",
  "newsstand__progress-category",
  "newsstand__progress-now",
  "newsstand__progress-slash",
  "newsstand__progress-total",
];

const newsData = await getCategoryData("./data/pressObj.json");

// 프로그래스 바 활성화
export function activeProgressClass(element, childIndex, categoryDataLength) {
  element.style.padding = 0; // 선택된 카테고리의 padding 제거
  element.classList.add("newsstand__focus");
  element.classList.add("newsstand__focus-font");

  progressClassList.map((it, idx) => element.children[idx].classList.add(it));
  showTextByNavTab(element, categoryDataLength, childIndex);

  // animationIterationCount 속성을부여해 원하는 횟수만큼 프로그래스 바 진행.
  element.children[0].style.animationIterationCount =
    categoryDataLength[childIndex] - getCurrentContent() + 1;
}

// 프로그래스 바 비활성화
export function deactiveProgressClass(element) {
  const textData = ["", "", ""];
  element.style.padding = "16px";
  element.classList.remove("newsstand__focus");
  element.classList.remove("newsstand__focus-font");

  // 클래스 제거
  progressClassList.map((it, idx) =>
    element.children[idx].classList.remove(it)
  );

  // 텍스트 초기화
  textData.map((it, idx) => {
    element.children[idx + 2].textContent = it;
  });

  // animationIterationCount 제거
  element.children[0].style.animationIterationCount = 0;
}

// 로고 / 편집일 / 구독하기 태그 생성
function makeMainNewsNav(logo, edit, name, id) {
  const newsNavParent = document.querySelector(".newsstand__current-view");

  // 기존 메인 뉴스 navbar 삭제.
  removeChildElement(newsNavParent);

  const publisherLogo = `<div><img src=${logo} alt="" class="newsstand--publisher-logo"/></div>`;
  const editDay = `<div class="newsstand__current-edit">${edit} ${MESSAGE.EDIT}</div>`;
  let subButton = "";

  // 구독중일때.
  if (isSubscribe(name)) {
    subButton = `<button class="newsstand__current-button">${MESSAGE.UNSUBSCRIBE}</button>`;
  } else {
    subButton = `<button class="newsstand__current-button">${MESSAGE.SUBSCRIBE}</button>`;
  }
  newsNavParent.innerHTML += publisherLogo;
  newsNavParent.innerHTML += editDay;
  newsNavParent.innerHTML += subButton;

  // 카테고리 뉴스에서 구독하기 버튼을 눌렀을때.
  newsNavParent.children[2].addEventListener("click", () => {
    // 해지하기 버튼을 눌렀을때.
    if (isSubscribe(name)) {
      unsubscribeModal(name);
    }
    // 구독하기 버튼을 눌렀을때.
    else {
      newsNavParent.children[2].textContent = MESSAGE.UNSUBSCRIBE;
      setSubscribe(name, logo, id);
      snackBarListAction(MESSAGE.SUB);
    }
  });
}

// 메인 뉴스 생성
function makeMainNews(img, title) {
  const newsMainContentParent = document.querySelector(".newsstand__list-left");

  // 기존 메인 뉴스 데이터 삭제.
  removeChildElement(newsMainContentParent);

  const thumbnailImg = `<div class="thumbnail--box"><img class="thumbnail-image" src="${img}" alt=""/></div<`;
  const contentTitle = `<div class="newsstand--subtitle">${title}</div>`;

  newsMainContentParent.innerHTML += thumbnailImg;
  newsMainContentParent.innerHTML += contentTitle;
}

// idx는 뉴스 콘텐츠의 순서를 의미함. 처음 시작할때는 무조건 0, 진행중일때는 값이 변경될 수 있음.
export function makeNewsList(page, CATEROY_NUMBER, categoryDataList) {
  const newsListParent = document.querySelector(".newsstand__list-right");
  const idx =
    getNavTabView() === VIEW.MY_SUB
      ? getSubscrbeList()[getCategoryIdx() % CATEROY_NUMBER][2]
      : getCategoryIdx() % CATEROY_NUMBER;

  const data =
    getNavTabView() === VIEW.MY_SUB
      ? [newsData[idx - 1]]
      : categoryDataList[idx];

  const name = data[page].name; // 언론사
  const img = data[page].imgSrc; // 뉴스 이미지 src
  const title = data[page].title[0]; // 뉴스 제목
  const logo = data[page].lightSrc; // 언론사 로고 src
  const edit = data[page].edit; // 편집일
  const newsTitles = data[page].title; // 6개짜리 뉴스 목록.
  const id = data[page].id.toString();

  // 기존 뉴스 목록 데이터 삭제.
  removeChildElement(newsListParent);

  // 메인뉴스 nav 생성
  makeMainNewsNav(logo, edit, name, id);

  // 왼쪽 헤더라인 생성.
  makeMainNews(img, title);

  newsListParent.innerHTML = newsTitles.reduce((acc, element) => {
    return acc + `<li class="newstand__edit-content"> ${element} </li>`;
  }, "");

  const li = `<li class="newsstand__edit-corp">${data[page].name} ${MESSAGE.EDIT_BY_PUBLISHER}</li>`;
  newsListParent.innerHTML += li;
}

// 다음에 보여질 페이지 넘버를 줄이거나 증가시켜 뉴스 콘텐츠를 생성함.
export function nextContents(
  clickPosition,
  CATEROY_NUMBER,
  categoryList,
  categoryDataLength,
  categoryDataList
) {
  const childIndex = getCategoryIdx() % CATEROY_NUMBER;
  const element = categoryList[childIndex]; // 자식 찾기

  // 오른쪽 버튼 클릭
  if (clickPosition === POSITION.RIGHT) {
    const reCount =
      parseInt(element.children[0].style.animationIterationCount) - 1;

    element.children[0].style.animationIterationCount = reCount;
  } else if (clickPosition === POSITION.LEFT) {
    const reCount =
      parseInt(element.children[0].style.animationIterationCount) + 1;

    element.children[0].style.animationIterationCount = reCount;
  }

  showTextByNavTab(element, categoryDataLength, childIndex);

  makeNewsList(
    (getCurrentContent() - 1) % categoryDataLength[childIndex],
    CATEROY_NUMBER,
    categoryDataList
  );
}

// 프로그래스 바가 진행중인 카테고리가 있다면 전부 찾아서 제거.
export function removeProgressAction() {
  const prevSelected = [...document.querySelectorAll(".newsstand__focus")];

  if (prevSelected) {
    prevSelected.map((element) => {
      deactiveProgressClass(element);
    });
  }
}

export function onUserRightClickCategory(
  rightBtn,
  CATEROY_NUMBER,
  categoryList,
  categoryDataLength,
  categoryDataList
) {
  rightBtn.addEventListener(
    EVENT.CLICK,
    rightBtnEvent(
      categoryList,
      CATEROY_NUMBER,
      categoryDataList,
      categoryDataLength
    )
  );
}

// 왼쪽 버튼 클릭했을때.
export function onUserLeftClickCategory(
  leftBtn,
  CATEROY_NUMBER,
  categoryList,
  categoryDataLength,
  categoryDataList
) {
  leftBtn.addEventListener(
    EVENT.CLICK,
    leftBtnEvent(
      categoryList,
      CATEROY_NUMBER,
      categoryDataList,
      categoryDataLength
    )
  );
}

// 사용자가 직접 카테고리를 클릭했을때.
export function onUserClickCategory(
  categoryDataList,
  categoryList,
  categoryDataLength,
  CATEGORY_NUMBER
) {
  categoryList.map((element, idx) => {
    element.addEventListener("click", (e) => {
      // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
      removeProgressAction();
      setCategoryIndex(idx % CATEGORY_NUMBER);
      setContentsPage(1);
      startProgressAction(categoryList, categoryDataLength);
      // 목록에 맞는 데이터 생성
      makeNewsList(getFirstPage(), CATEGORY_NUMBER, categoryDataList);
    });
  });
}

// 좌측버튼을 클릭했을때.
export function leftBtnEvent(
  categoryList,
  CATEROY_NUMBER,
  categoryDataList,
  categoryDataLength
) {
  return function () {
    let currentContents = getCurrentContent();
    setContentsPage(--currentContents);

    // 더이상 보여줄 이전 콘텐츠가 없다면. 카테고리를 이동시켜야한다.
    if (currentContents <= 0) {
      // '내가 구독한 언론사'일때
      if (getNavTabView() === VIEW.MY_SUB) {
        let idx =
          getCategoryIdx() <= 0
            ? getSubscrbeList().length - 1
            : getCategoryIdx() - 1;

        setCategoryIndex(idx);
      }
      // '전체 언론사'일때
      else {
        let idx =
          getCategoryIdx() <= 0 ? CATEROY_NUMBER - 1 : getCategoryIdx() - 1;

        setCategoryIndex(idx);
      }
    }

    // 카테고리가 이동하고 콘텐츠를 어디서부터 보여줄것인지
    if (getNavTabView() === VIEW.ALL_SUB) {
      currentContents =
        currentContents <= 0
          ? categoryDataLength[getCategoryIdx()]
          : currentContents;
      setContentsPage(currentContents);
    } else {
      currentContents =
        currentContents <= 0
          ? getSubscrbeList()[getCategoryIdx()]
          : currentContents;
    }

    nextContents(
      POSITION.LEFT,
      CATEROY_NUMBER,
      categoryList,
      categoryDataLength,
      categoryDataList
    );
  };
}
export function rightBtnEvent(
  categoryList,
  CATEROY_NUMBER,
  categoryDataList,
  categoryDataLength
) {
  return function () {
    let currentContents = getCurrentContent();
    setContentsPage(++currentContents);

    nextContents(
      POSITION.RIGHT,
      CATEROY_NUMBER,
      categoryList,
      categoryDataLength,
      categoryDataList
    );
  };
}

// 카테고리 변경시 프로그래스 바 진행.
export function startProgressAction(categoryList, categoryDataLength) {
  const idx = getNavTabView() === VIEW.MY_SUB ? getSubscrbeList().length : 7;
  const childIndex = getCategoryIdx() % idx;

  const element = categoryList[childIndex]; // 자식 찾기

  activeProgressClass(element, childIndex, categoryDataLength);
}

// 내가 구독한 언론사 or 전체 언론사일때 보여지는 텍스트가 다르기때문에 처리해주는 함수.
function showTextByNavTab(element, categoryDataLength, childIndex) {
  getNavTabView() === VIEW.ALL_SUB
    ? showCurrentContentText(element, categoryDataLength, childIndex)
    : showNextContentText(element);
}

// 전체 언론사일때 1/82 형식으로 보여줌
function showCurrentContentText(element, categoryDataLength, childIndex) {
  const textData = [getCurrentContent(), "/", categoryDataLength[childIndex]];

  textData.map((it, idx) => {
    element.children[idx + 2].textContent = it;
  });
}
// 내가 구독한 언론사일때 '>' 형식으로 보여줌
function showNextContentText(element) {
  const textData = ["", "", ">"];

  textData.map((it, idx) => {
    element.children[idx + 2].textContent = it;
  });
}
