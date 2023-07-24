import { removeChildElement, snackBarAction } from "../utils/util.js";
import { MESSAGE, POSITION, EVENT } from "./constant.js";
import { paintNewsCategory } from "../newsstand/newsCategory.js";
import {
  isSubscribe,
  setUnsubscribe,
  setSubscribe,
  getCurrentContent,
  setCategoryIndex,
  setContentsPage,
  setGoBefore,
  getCategoryIdx,
  getGoBefore,
  getFirstPage,
} from "../store/state.js";

// 프로그래스 바 활성화
export function activeProgressClass(element, childIndex, categoryDataLength) {
  element.style.padding = 0; // 선택된 카테고리의 padding 제거
  element.classList.add("newsstand__focus");
  element.classList.add("newsstand__focus-font");
  element.children[0].classList.add("newsstand__progress"); // 첫번째 자식: 프로그래스 바
  element.children[1].classList.add("newsstand__progress-category"); // 두번째 자식: 카테고리 제목
  element.children[2].classList.add("newsstand__progress-now"); // 세번째 자식: 진행상황 (1/82)
  element.children[3].classList.add("newsstand__progress-slash"); // 세번째 자식: 진행상황 (1/82)
  element.children[4].classList.add("newsstand__progress-total"); // 세번째 자식: 진행상황 (1/82)

  element.children[2].textContent = `${getCurrentContent()}`;
  element.children[3].textContent = `/`;
  element.children[4].textContent = `${categoryDataLength[childIndex]}`;

  // animationIterationCount 속성을부여해 원하는 횟수만큼 프로그래스 바 진행.
  element.children[0].style.animationIterationCount =
    categoryDataLength[childIndex];
}

// 프로그래스 바 비활성화
export function deactiveProgressClass(element) {
  element.style.padding = "16px";
  element.classList.remove("newsstand__focus");
  element.classList.remove("newsstand__focus-font");
  element.children[0].classList.remove("newsstand__progress");
  element.children[1].classList.remove("newsstand__progress-category");
  element.children[2].classList.remove("newsstand__progress-now");
  element.children[3].classList.remove("newsstand__progress-slash");
  element.children[4].classList.remove("newsstand__progress-total");

  element.children[2].textContent = "";
  element.children[3].textContent = "";
  element.children[4].textContent = "";

  // animationIterationCount 제거
  element.children[0].style.animationIterationCount = 0;
}

// 로고 / 편집일 / 구독하기 태그 생성
function makeMainNewsNav(logo, edit, name) {
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
      newsNavParent.children[2].textContent = MESSAGE.SUBSCRIBE;
      setUnsubscribe(name);
      snackBarAction(MESSAGE.UN_SUB);
      paintNewsCategory();
    }
    // 구독하기 버튼을 눌렀을때.
    else {
      newsNavParent.children[2].textContent = MESSAGE.UNSUBSCRIBE;
      setSubscribe(name, logo);
      snackBarAction(MESSAGE.SUB);
    }
  });
}

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

  const data = categoryDataList[getCategoryIdx() % CATEROY_NUMBER];
  const name = data[page].name;
  const img = data[page].imgSrc;
  const title = data[page].title[0];
  const logo = data[page].lightSrc;
  const edit = data[page].edit;
  const newsTitles = data[page].title;
  // 기존 뉴스 목록 데이터 삭제.
  removeChildElement(newsListParent);

  // 메인뉴스 nav 생성
  makeMainNewsNav(logo, edit, name);

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
    // 애니메이션을 지웠다가 다시 실행.
    removeProgressAction();
    addProgressAction(element);

    element.children[0].style.animationIterationCount = reCount;
  } else if (clickPosition === POSITION.LEFT) {
    const reCount =
      parseInt(element.children[0].style.animationIterationCount) + 1;

    if (getGoBefore()) {
      // 애니메이션을 지웠다가 다시 실행.
      removeProgressAction();
      addProgressAction(element);
      element.children[0].style.animationIterationCount = 0;
    } else {
      // 애니메이션을 지웠다가 다시 실행.
      removeProgressAction();
      addProgressAction(element);
      element.children[0].style.animationIterationCount = reCount;
    }
  }

  element.children[2].textContent = `${getCurrentContent()}`;
  element.children[3].textContent = `/`;
  element.children[4].textContent = `${categoryDataLength[childIndex]}`;
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

function addProgressAction(element) {
  void element.offsetWidth;
  element.style.padding = 0; // 선택된 카테고리의 padding 제거
  element.classList.add("newsstand__focus");
  element.classList.add("newsstand__focus-font");
  element.children[0].classList.add("newsstand__progress"); // 첫번째 자식: 프로그래스 바
  element.children[1].classList.add("newsstand__progress-category"); // 두번째 자식: 카테고리 제목
  element.children[2].classList.add("newsstand__progress-now"); // 세번째 자식: 진행상황 (1/82)
  element.children[3].classList.add("newsstand__progress-slash"); // 세번째 자식: 진행상황 (1/82)
  element.children[4].classList.add("newsstand__progress-total"); // 세번째 자식: 진행상황 (1/82)
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

export function onUserClickCategory(
  CATEROY_NUMBER,
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
      startProgressAction(categoryList, categoryDataLength);

      // 목록에 맞는 데이터 생성
      makeNewsList(getFirstPage(), CATEROY_NUMBER, categoryDataList);
    });
  });
}

export function leftBtnEvent(
  categoryList,
  CATEROY_NUMBER,
  categoryDataList,
  categoryDataLength
) {
  return function () {
    let currentContents = getCurrentContent();
    setContentsPage(--cc);

    if (currentContents <= 0) {
      setGoBefore(true);
    }
    currentContents = currentContents <= 0 ? 1 : currentContents;
    setContentsPage(currentContents);

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
  setContentsPage(1);
  const childIndex = getCategoryIdx();

  const element = categoryList[childIndex]; // 자식 찾기

  activeProgressClass(element, childIndex, categoryDataLength);
}
