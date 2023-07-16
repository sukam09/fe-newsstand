// import { CATEGORY } from "../state.js";
// import { makeCategoryTag } from "../tag/categoryTag.js";
// import { makeButtonTag } from "../tag/buttonTag.js";
// import { getCategoryData } from "../fetchAPI.js";

// // console.log(CATEGORY);

// // 카테고리 태그, 리스트 버튼 태그 생성.
// makeCategoryTag();
// makeButtonTag(
//   ".newsstand__list-navigation-btn",
//   "left-list-button btn-disabled",
//   "right-list-button btn-disabled"
// );

// // 뉴스 데이터 가져오기
// const economyData = await getCategoryData("./data/category/economy.json");
// const broadCastData = await getCategoryData("./data/category/broadcast.json");
// const itData = await getCategoryData("./data/category/it.json");
// const englishData = await getCategoryData("./data/category/english.json");
// const sportsData = await getCategoryData("./data/category/sports.json");
// const magazineData = await getCategoryData("./data/category/magazine.json");
// const localData = await getCategoryData("./data/category/local.json");

// const categoryList = Array.from(
//   document.querySelectorAll(".newsstand__news-nav li")
// );
// const categoryDataList = [
//   economyData,
//   broadCastData,
//   itData,
//   englishData,
//   sportsData,
//   magazineData,
//   localData,
// ];
// const dummyData = [
//   economyData.length,
//   broadCastData.length,
//   itData.length,
//   englishData.length,
//   sportsData.length,
//   magazineData.length,
//   localData.length,
// ];

// const CATEROY_NUMBER = categoryList.length;
// const FIRST_CATEGORY = 0;

// const leftBtn = document.querySelector(".left-list-button");
// const rightBtn = document.querySelector(".right-list-button");
// let currentPage = 0;

// // let nowCount = 1;

// export function paintNewsCategory() {
//   addAnimationEvent();
//   makeNewsList();
//   // 사용자가 직접 카테고리를 클릭하면 움직이는 기능.
//   categoryList.map((element, idx) => {
//     element.addEventListener("click", (e) => {
//       // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
//       removeProgressAction();
//       currentPage = idx % 7;
//       startProgressAction(currentPage);

//       // 목록에 맞는 데이터 생성
//       makeNewsList();
//     });
//   });

//   // 이전 또는 다음 콘텐츠를 보여주도록 함.
//   leftBtn.addEventListener("click", () => {
//     nextContents("left");
//   });
//   rightBtn.addEventListener("click", () => {
//     nextContents("right");
//   });
// }

// // 그리드 뷰에서 리스트 뷰로 전환시 프로그래스 바를 처음부터 진행시켜주는 함수.
// export function restartProgressBar() {
//   // 이전에 선택된 li에 들어가있는 모든 클래스 삭제.
//   removeProgressAction();

//   // 종합/경제 카테고리 li에 클래스 추가.
//   startProgressAction(FIRST_CATEGORY);
// }

// // 프로그래스 바 액션을 추가.

// // 애니메이션 이벤트 추가
// // childIndex는 자식이 몇번째 위치하는지 나타냄.
// function startProgressAction() {
//   CATEGORY.page = 1;
//   const childIndex = currentPage;
//   const element = categoryList[childIndex]; // 자식 찾기
//   element.style.padding = 0; // 선택된 카테고리의 padding 제거
//   element.classList.add("newsstand__focus");
//   element.classList.add("newsstand__focus-font");
//   element.children[0].classList.add("newsstand__progress"); // 첫번째 자식: 프로그래스 바
//   element.children[1].classList.add("newsstand__progress-category"); // 두번째 자식: 카테고리 제목
//   element.children[2].classList.add("newsstand__progress-now"); // 세번째 자식: 진행상황 (1/82)
//   element.children[3].classList.add("newsstand__progress-total"); // 세번째 자식: 진행상황 (1/82)

//   // element.removeEventListener("animationiteration", whenEventIteration);

//   element.children[2].textContent = `${CATEGORY.page}`;
//   element.children[3].textContent = `/${dummyData[childIndex]}`;

//   // animationIterationCount 속성을부여해 원하는 횟수만큼 프로그래스 바 진행.
//   element.children[0].style.animationIterationCount = dummyData[childIndex];
// }

// // 각 카테고리에 애니메이션 진행중 / 완료됬을때 실행되는 이벤트리스너를 달아주는 함수.
// function addAnimationEvent() {
//   categoryList.map((element, idx) => {
//     element.addEventListener(
//       "animationiteration",
//       whenEventIteration(element, idx)
//     );
//     element.addEventListener("animationend", endEvnet);
//   });
// }

// function endEvnet() {
//   removeProgressAction();

//   ++currentPage;
//   currentPage %= CATEROY_NUMBER;

//   startProgressAction(currentPage);

//   makeNewsList(0);
// }

// function whenEventIteration(element, idx) {
//   return function () {
//     nextContents();
//     element.children[2].textContent = `${CATEGORY.page}`;
//     element.children[3].textContent = `/${dummyData[idx]}`;
//     makeNewsList(CATEGORY.page - 1);
//   };
// }

// // 다음에 보여질 페이지 넘버를 줄이거나 증가시켜 뉴스 콘텐츠를 생성함.
// function nextContents(clickPosition = "auto") {
//   const childIndex = currentPage % CATEROY_NUMBER;
//   const element = categoryList[childIndex]; // 자식 찾기

//   // 오른쪽 버튼 클릭
//   if (clickPosition === "right") {
//     ++CATEGORY.page;
//     const reCount =
//       parseInt(element.children[0].style.animationIterationCount) - 1;
//     element.children[0].style.animationIterationCount = reCount;
//   } else if (clickPosition === "left") {
//     --CATEGORY.page;
//     CATEGORY.page = CATEGORY.page <= 0 ? 1 : CATEGORY.page;
//     const reCount =
//       parseInt(element.children[0].style.animationIterationCount) + 1;
//     element.children[0].style.animationIterationCount = reCount;
//   } else {
//     ++CATEGORY.page;
//   }

//   element.children[2].textContent = `${CATEGORY.page}`;
//   element.children[3].textContent = `/${dummyData[childIndex]}`;
//   makeNewsList((CATEGORY.page - 1) % dummyData[childIndex]);
// }

// // 프로그래스 바가 진행중인 카테고리가 있다면 전부 찾아서 제거.
// function removeProgressAction() {
//   const prevSelected = Array.from(
//     document.querySelectorAll(".newsstand__focus")
//   );

//   if (prevSelected) {
//     prevSelected.map((element) => {
//       element.style.padding = "16px";
//       element.classList.remove("newsstand__focus");
//       element.classList.remove("newsstand__focus-font");
//       element.children[0].classList.remove("newsstand__progress");
//       element.children[1].classList.remove("newsstand__progress-category");
//       element.children[2].classList.remove("newsstand__progress-now");
//       element.children[2].classList.remove("newsstand__progress-total");
//       element.children[2].textContent = "";
//       element.children[3].textContent = "";

//       // animationIterationCount 제거
//       element.children[0].style.animationIterationCount = 0;
//     });
//   }

//   return prevSelected;
// }

// // 로고 / 편집일 / 구독하기 태그 생성
// function makeMainNewsNav(logo, edit) {
//   const newsNavParent = document.querySelector(".newsstand__current-view");

//   // 기존 메인 뉴스 navbar 삭제.
//   removeChildElement(newsNavParent);

//   const publisherLogo = `<div><img src=${logo} alt="" class="newsstand--publisher-logo"/></div>`;
//   const editDay = `<div class="newsstand__current-edit">${edit} 편집</div>`;
//   const subButton = `<button class="newsstand__current-button">+ 구독하기</button>`;
//   newsNavParent.innerHTML += publisherLogo;
//   newsNavParent.innerHTML += editDay;
//   newsNavParent.innerHTML += subButton;
// }

// function makeMainNews(img, title) {
//   const newsMainContentParent = document.querySelector(".newsstand__list-left");

//   // 기존 메인 뉴스 데이터 삭제.
//   removeChildElement(newsMainContentParent);

//   const thumbnailImg = `<img class="title-image" src="${img}" alt=""/>`;
//   const contentTitle = `<div class="newsstand--subtitle">${title}</div>`;

//   newsMainContentParent.innerHTML += thumbnailImg;
//   newsMainContentParent.innerHTML += contentTitle;
// }

// // idx는 뉴스 콘텐츠의 순서를 의미함. 처음 시작할때는 무조건 0, 진행중일때는 값이 변경될 수 있음.
// function makeNewsList(page = 0) {
//   const newsListParent = document.querySelector(".newsstand__list-right");

//   const data = categoryDataList[currentPage % CATEROY_NUMBER];
//   const img = data[page].imgSrc;
//   const title = data[page].title[0];
//   const logo = data[page].lightSrc;
//   const edit = data[page].edit;
//   // 기존 뉴스 목록 데이터 삭제.
//   removeChildElement(newsListParent);

//   // 메인뉴스 nav 생성
//   makeMainNewsNav(logo, edit);

//   // 왼쪽 헤더라인 생성.
//   makeMainNews(img, title);

//   data[page].title.map((it, idx) => {
//     if (idx !== 0) {
//       const li = `<li> ${it} </li>`;
//       newsListParent.innerHTML += li;
//     }
//   });
//   const li = `<li class="newsstand__edit-corp">${data[page].name} 언론사에서 직접 편집한 뉴스입니다.</li>`;
//   newsListParent.innerHTML += li;
// }

// function removeChildElement(parent) {
//   while (parent.firstChild) {
//     parent.firstChild.remove();
//   }
// }

// export function addListdButton() {
//   leftBtn.classList.remove("btn-disabled");
//   rightBtn.classList.remove("btn-disabled");
// }
// export function deleteListButton() {
//   leftBtn.classList.add("btn-disabled");
//   rightBtn.classList.add("btn-disabled");
// }
