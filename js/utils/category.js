import { removeChildElement } from "../utils/util.js";
import { CATEGORY } from "../state/categoryState.js";
// 프로그래스 바 활성화
export function activeProgressClass(element, childIndex, categoryDataLength) {
  element.style.padding = 0; // 선택된 카테고리의 padding 제거
  element.classList.add("newsstand__focus");
  element.classList.add("newsstand__focus-font");
  element.children[0].classList.add("newsstand__progress"); // 첫번째 자식: 프로그래스 바
  element.children[1].classList.add("newsstand__progress-category"); // 두번째 자식: 카테고리 제목
  element.children[2].classList.add("newsstand__progress-now"); // 세번째 자식: 진행상황 (1/82)
  element.children[3].classList.add("newsstand__progress-total"); // 세번째 자식: 진행상황 (1/82)

  element.children[2].textContent = `${CATEGORY.currentContents}`;
  element.children[3].textContent = `/${categoryDataLength[childIndex]}`;

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
  element.children[2].classList.remove("newsstand__progress-total");

  element.children[2].textContent = "";
  element.children[3].textContent = "";

  // animationIterationCount 제거
  element.children[0].style.animationIterationCount = 0;
}

// 로고 / 편집일 / 구독하기 태그 생성
function makeMainNewsNav(logo, edit) {
  const newsNavParent = document.querySelector(".newsstand__current-view");

  // 기존 메인 뉴스 navbar 삭제.
  removeChildElement(newsNavParent);

  const publisherLogo = `<div><img src=${logo} alt="" class="newsstand--publisher-logo"/></div>`;
  const editDay = `<div class="newsstand__current-edit">${edit} 편집</div>`;
  const subButton = `<button class="newsstand__current-button">+ 구독하기</button>`;
  newsNavParent.innerHTML += publisherLogo;
  newsNavParent.innerHTML += editDay;
  newsNavParent.innerHTML += subButton;
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

  const data = categoryDataList[CATEGORY.currentCategory % CATEROY_NUMBER];
  const img = data[page].imgSrc;
  const title = data[page].title[0];
  const logo = data[page].lightSrc;
  const edit = data[page].edit;
  const newsTitles = data[page].title;
  // 기존 뉴스 목록 데이터 삭제.
  removeChildElement(newsListParent);

  // 메인뉴스 nav 생성
  makeMainNewsNav(logo, edit);

  // 왼쪽 헤더라인 생성.
  makeMainNews(img, title);

  newsListParent.innerHTML = newsTitles.reduce((acc, element) => {
    return acc + `<li> ${element} </li>`;
  }, "");

  const li = `<li class="newsstand__edit-corp">${data[page].name} 언론사에서 직접 편집한 뉴스입니다.</li>`;
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
  const childIndex = CATEGORY.currentCategory % CATEROY_NUMBER;
  const element = categoryList[childIndex]; // 자식 찾기

  // 오른쪽 버튼 클릭
  if (clickPosition === "right") {
    const reCount =
      parseInt(element.children[0].style.animationIterationCount) - 1;
    element.children[0].style.animationIterationCount = reCount;
  } else if (clickPosition === "left") {
    const reCount =
      parseInt(element.children[0].style.animationIterationCount) + 1;

    if (CATEGORY.goBefore) {
      element.children[0].style.animationIterationCount = 0;
    } else {
      element.children[0].style.animationIterationCount = reCount;
    }
  }

  element.children[2].textContent = `${CATEGORY.currentContents}`;
  element.children[3].textContent = `/${categoryDataLength[childIndex]}`;
  makeNewsList(
    (CATEGORY.currentContents - 1) % categoryDataLength[childIndex],
    CATEROY_NUMBER,
    categoryDataList
  );
}

// 프로그래스 바가 진행중인 카테고리가 있다면 전부 찾아서 제거.
export function removeProgressAction() {
  const prevSelected = Array.from(
    document.querySelectorAll(".newsstand__focus")
  );

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
  rightBtn.addEventListener("click", () => {
    ++CATEGORY.currentContents;
    nextContents(
      "right",
      CATEROY_NUMBER,
      categoryList,
      categoryDataLength,
      categoryDataList
    );
  });
}

// 왼쪽 버튼 클릭했을때.
export function onUserLeftClickCategory(
  leftBtn,
  CATEROY_NUMBER,
  categoryList,
  categoryDataLength,
  categoryDataList
) {
  leftBtn.addEventListener("click", () => {
    --CATEGORY.currentContents;

    // 왼쪽 버튼이 클릭되고 현재 보여지는 콘텐츠가 0개라면 이전 카테고리로 이전하도록 goBefore 상태를 true로 바꿔줌.
    if (CATEGORY.currentContents <= 0) {
      CATEGORY.goBefore = 1;
      CATEGORY.currentContents = 1;
    }
    CATEGORY.currentContents =
      CATEGORY.currentContents <= 0 ? 1 : CATEGORY.currentContents;
    nextContents(
      "left",
      CATEROY_NUMBER,
      categoryList,
      categoryDataLength,
      categoryDataList
    );
  });
}

export function onUserClickCategory(
  CATEROY_NUMBER,
  categoryDataList,
  categoryList,
  categoryDataLength
) {
  categoryList.map((element, idx) => {
    element.addEventListener("click", (e) => {
      // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
      removeProgressAction();
      CATEGORY.currentCategory = idx % 7;
      startProgressAction(categoryList, categoryDataLength);

      // 목록에 맞는 데이터 생성
      makeNewsList(CATEGORY.FIRST_PAGE, CATEROY_NUMBER, categoryDataList);
    });
  });
}

// 카테고리 변경시 프로그래스 바 진행.
export function startProgressAction(categoryList, categoryDataLength) {
  CATEGORY.currentContents = 1;

  const childIndex = CATEGORY.currentCategory;
  const element = categoryList[childIndex]; // 자식 찾기

  activeProgressClass(element, childIndex, categoryDataLength);
}
