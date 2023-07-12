import { stopInterval, startInterval } from "./global.js";

let now_list_page = 1;
let now_tab = 0;
const MAX_NEWS_COUNT = 6;

function refreshInterval() {
  stopInterval();
  startInterval();
}

// 카테고리 메뉴 클릭시 전환
function categoryClicked(item) {
  const targetOn = document.querySelector(`#category${item.id}`);
  const targetOff = document.querySelector(".category_list--clicked");
  targetOff.classList.remove("category_list--clicked");
  targetOn.classList.add("category_list--clicked");
  now_list_page = 1;
  now_tab = item.id - 1;
  updateCategory();
  refreshInterval();
}

function listPageUp() {
  now_list_page += 1;
}

// 카테고리 리스트 추가
function appendCategoryList() {
  const categoryListContainer = document.getElementsByClassName(
    "category_list_container"
  );
  categoryList.forEach((item, idx) => {
    const newCategory = createCategoryList(item, idx);
    categoryListContainer[0].appendChild(newCategory);
  });
}

// 카테고리 리스트 태그 생성
function createCategoryList(item, idx) {
  // li 생성
  const newList = document.createElement("li");
  if (idx == 0) {
    newList.className = "category_list category_list--clicked";
  } else {
    newList.className = "category_list";
  }
  newList.addEventListener("click", () => {
    categoryClicked(item);
  });
  newList.id = `category${item.id}`;

  // 제목 생성
  const title = document.createElement("span");
  title.className = "category_list__title";
  title.innerHTML = `${item.categoryName}`;
  newList.appendChild(title);

  // 페이지 카운터 생성
  const counterContainer = document.createElement("wrapper");
  counterContainer.className = "page_count_wrapper";
  const nowPage = document.createElement("span");
  const allPage = document.createElement("span");
  nowPage.className = "now_page";
  nowPage.innerHTML = `${now_list_page} /`;
  allPage.className = "all_page";
  allPage.innerHTML = `${item.data.length}`;
  counterContainer.appendChild(nowPage);
  counterContainer.appendChild(allPage);
  newList.appendChild(counterContainer);

  // 프로그레스 바 생성
  const progressBar = document.createElement("div");
  progressBar.className = "progressbar";
  newList.appendChild(progressBar);
  return newList;
}

// 카테고리 업데이트
function updateCategory() {
  const firstCategory = document.getElementsByClassName("category_list")[0];
  const clickedCategory = document.getElementsByClassName(
    "category_list--clicked"
  )[0];
  clickedCategory.children[1].children[0].innerHTML = `${now_list_page} /`;
  if (
    parseInt(now_list_page) >=
    parseInt(clickedCategory.children[1].children[1].innerHTML) + 1
  ) {
    if (clickedCategory.nextElementSibling == null) {
      firstCategory.classList.add("category_list--clicked");
      firstCategory.children[1].children[0].innerHTML = "1 /";
      now_tab = 0;
    } else {
      clickedCategory.nextElementSibling.classList.add(
        "category_list--clicked"
      );
      clickedCategory.nextElementSibling.children[1].children[0].innerHTML =
        "1 /";
      now_tab += 1;
    }
    clickedCategory.classList.remove("category_list--clicked");
    now_list_page = 1;
  }
  appendNewsList();
}

// 리스트 뷰의 뉴스 append
function appendNewsList() {
  const newsListContainer = document.querySelector(".news_list__container");
  const topicHeaderLogo = document.querySelector(
    ".list_container__wrapper__header__logo"
  );
  const topicThumbnail = document.querySelector(".topic__thumbnail");
  const topicMain = document.querySelector(".topic_mainTitle");
  const newsDetail = document.querySelector(".news_list_detail");
  topicThumbnail.innerHTML = "";
  newsListContainer.innerHTML = "";
  topicHeaderLogo.innerHTML = "";
  newsDetail.innerHTML = `${
    categoryList[now_tab].data[now_list_page - 1].name
  } 언론사에서 직접 편집한 뉴스입니다.`;
  topicHeaderLogo.src = categoryList[now_tab].data[now_list_page - 1].logoSrc;
  topicThumbnail.src = categoryList[now_tab].data[now_list_page - 1].imgSrc;
  topicMain.innerHTML = categoryList[now_tab].data[now_list_page - 1].mainTitle;
  for (let i = 0; i < MAX_NEWS_COUNT; i++) {
    const newNewsList = createNewsList(
      categoryList[now_tab].data[now_list_page - 1].subTitleList[i].title
    );
    newsListContainer.appendChild(newNewsList);
  }
}

function createNewsList(content) {
  const newList = document.createElement("li");
  newList.className = "news_list";
  newList.innerHTML = content;
  return newList;
}

export { appendCategoryList, appendNewsList, updateCategory, listPageUp };
