import { removeChildElement } from "../utils/util.js";

// 프로그래스 바 활성화
export function activeProgressClass(
  element,
  childIndex,
  currentContents,
  dummyData
) {
  element.style.padding = 0; // 선택된 카테고리의 padding 제거
  element.classList.add("newsstand__focus");
  element.classList.add("newsstand__focus-font");
  element.children[0].classList.add("newsstand__progress"); // 첫번째 자식: 프로그래스 바
  element.children[1].classList.add("newsstand__progress-category"); // 두번째 자식: 카테고리 제목
  element.children[2].classList.add("newsstand__progress-now"); // 세번째 자식: 진행상황 (1/82)
  element.children[3].classList.add("newsstand__progress-total"); // 세번째 자식: 진행상황 (1/82)

  element.children[2].textContent = `${currentContents}`;
  element.children[3].textContent = `/${dummyData[childIndex]}`;

  // animationIterationCount 속성을부여해 원하는 횟수만큼 프로그래스 바 진행.
  element.children[0].style.animationIterationCount = dummyData[childIndex];
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

  const thumbnailImg = `<img class="title-image" src="${img}" alt=""/>`;
  const contentTitle = `<div class="newsstand--subtitle">${title}</div>`;

  newsMainContentParent.innerHTML += thumbnailImg;
  newsMainContentParent.innerHTML += contentTitle;
}

// idx는 뉴스 콘텐츠의 순서를 의미함. 처음 시작할때는 무조건 0, 진행중일때는 값이 변경될 수 있음.
export function makeNewsList(
  page = 0,
  CATEROY_NUMBER,
  currentCategory,
  categoryDataList
) {
  const newsListParent = document.querySelector(".newsstand__list-right");

  const data = categoryDataList[currentCategory % CATEROY_NUMBER];
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

  data[page].title.map((it, idx) => {
    if (idx !== 0) {
      const li = `<li> ${it} </li>`;
      newsListParent.innerHTML += li;
    }
  });
  const li = `<li class="newsstand__edit-corp">${data[page].name} 언론사에서 직접 편집한 뉴스입니다.</li>`;
  newsListParent.innerHTML += li;
}

// 다음에 보여질 페이지 넘버를 줄이거나 증가시켜 뉴스 콘텐츠를 생성함.
export function nextContents(
  clickPosition,
  currentCategory,
  currentContents,
  CATEROY_NUMBER,
  categoryList,
  dummyData,
  categoryDataList,
  goBefore = false
) {
  const childIndex = currentCategory % CATEROY_NUMBER;
  const element = categoryList[childIndex]; // 자식 찾기

  // 오른쪽 버튼 클릭
  if (clickPosition === "right") {
    const reCount =
      parseInt(element.children[0].style.animationIterationCount) - 1;
    element.children[0].style.animationIterationCount = reCount;
  } else if (clickPosition === "left") {
    const reCount =
      parseInt(element.children[0].style.animationIterationCount) + 1;

    if (goBefore) {
      element.children[0].style.animationIterationCount = 0;
    } else {
      element.children[0].style.animationIterationCount = reCount;
    }
  }

  element.children[2].textContent = `${currentContents}`;
  element.children[3].textContent = `/${dummyData[childIndex]}`;
  makeNewsList(
    (currentContents - 1) % dummyData[childIndex],
    CATEROY_NUMBER,
    currentCategory,
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
