import { $ } from "./util.js";

let now_list_page = 1;
let now_category = 0;
const MAX_NEWS_COUNT = 6;
const CATEGORY_TAB_NUM = categoryList.length - 1;

// 카테고리 탭 전환 시간
const CATEGORY_TAB_TIME = 20000;

// 프로그레스에 맞춘 탭 자동 넘김 Interval
let categoryInterval = setInterval(() => {
  listPageUp();
  updateCategoryClicked();
  updateListButton();
}, CATEGORY_TAB_TIME);

function stopCategoryInterval() {
  clearInterval(categoryInterval);
}
function startCategoryInterval() {
  categoryInterval = setInterval(() => {
    listPageUp();
    updateCategoryClicked();
    updateListButton();
  }, CATEGORY_TAB_TIME);
}

// 자동 탭 넘김 인터벌 새로고침
function refreshInterval() {
  stopCategoryInterval();
  startCategoryInterval();
  updateListButton();
  updateCategoryClicked();
}

function setFirstListPage() {
  now_list_page = 1;
  now_category = 0;
  refreshInterval();
}

// 카테고리 메뉴 클릭시 전환
function categoryClicked(item) {
  const targetOn = $(`#category${item.id}`);
  const targetOff = $(".category_list--clicked");
  targetOff.classList.remove("category_list--clicked");
  targetOn.classList.add("category_list--clicked");
  now_list_page = 1;
  now_category = item.id - 1;
  refreshInterval();
}

function listPageUp() {
  now_list_page += 1;
}

// 카테고리 리스트 추가
function appendCategoryList() {
  const categoryListContainer = $(".category_list_container");
  categoryList.forEach((item, idx) => {
    const newCategory = createCategoryList(item, idx);
    categoryListContainer.appendChild(newCategory);
  });
}

// 카테고리 리스트 태그 생성
function createCategoryList(item, idx) {
  // li 생성
  const newList = document.createElement("li");
  idx === 0
    ? (newList.className = "category_list category_list--clicked")
    : (newList.className = "category_list");
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
  nowPage.innerHTML = `${now_list_page} / `;
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

// 현재 리스트 페이지에 카테고리 동기화
function updateCategoryClicked() {
  const clickedCategory = $(".category_list--clicked");
  clickedCategory.classList.remove("category_list--clicked");
  const targetOn = $(".category_list_container");
  targetOn.children[now_category].classList.add("category_list--clicked");
  updateCategoryTabNum();
}

// 카테고리 탭 숫자 업데이트
function updateCategoryTabNum() {
  const firstCategory = $(".category_list");
  const clickedCategory = $(".category_list--clicked");
  clickedCategory.children[1].children[0].innerHTML = `${now_list_page} / `;
  if (
    parseInt(now_list_page) >=
    parseInt(clickedCategory.children[1].children[1].innerHTML) + 1
  ) {
    if (clickedCategory.nextElementSibling === null) {
      firstCategory.classList.add("category_list--clicked");
      firstCategory.children[1].children[0].innerHTML = "1 /";
      now_category = 0;
    } else {
      clickedCategory.nextElementSibling.classList.add(
        "category_list--clicked"
      );
      clickedCategory.nextElementSibling.children[1].children[0].innerHTML =
        "1 /";
      now_category += 1;
    }
    clickedCategory.classList.remove("category_list--clicked");
    now_list_page = 1;
  }
  appendNewsList();
}

function getListViewElement() {
  return {
    newsListContainer: $(".news_list__container"),
    topicHeaderLogo: $(".list_container__wrapper__header__logo"),
    topicThumbnail: $(".topic__thumbnail"),
    topicMain: $(".topic_mainTitle"),
    newsDetail: $(".news_list_detail"),
  };
}

// 리스트 뷰의 뉴스 append
function appendNewsList() {
  const elements = getListViewElement();
  elements.newsListContainer.innerHTML = "";
  const nowData = categoryList[now_category].data[now_list_page - 1];

  elements.newsDetail.innerHTML = `${nowData.name} 언론사에서 직접 편집한 뉴스입니다.`;
  elements.topicHeaderLogo.src = nowData.logoSrc;
  elements.topicThumbnail.src = nowData.imgSrc;
  elements.topicMain.innerHTML = nowData.mainTitle;
  for (let i = 0; i < MAX_NEWS_COUNT; i++) {
    const newNewsList = createNewsList(nowData.subTitleList[i].title);
    elements.newsListContainer.appendChild(newNewsList);
  }
}

// content가 들어간 뉴스 리스트 태그 생성
function createNewsList(content) {
  const newList = document.createElement("li");
  newList.className = "news_list";
  newList.innerHTML = content;
  return newList;
}

// 좌우 리스트 버튼 display 변경
function updateListButton() {
  const leftListButton = $(".left_list_button");
  const rightListButton = $(".right_list_button");
  if (now_list_page === 1 && now_category === 0) {
    leftListButton.style.display = "none";
    rightListButton.style.display = "block";
  } else if (
    now_category === CATEGORY_TAB_NUM &&
    now_list_page === categoryList[CATEGORY_TAB_NUM].data.length
  ) {
    rightListButton.style.display = "none";
    leftListButton.style.display = "block";
  } else {
    leftListButton.style.display = "block";
    rightListButton.style.display = "block";
  }
}
function listArrowButtonClicked(increment) {
  now_list_page + increment === 0
    ? ((now_category -= 1),
      (now_list_page = categoryList[now_category].data.length))
    : (now_list_page += increment);
  const clickedCategory = $(".category_list--clicked");
  clickedCategory.children[2].classList.remove("progressbar");
  clickedCategory.offsetWidth;
  clickedCategory.children[2].classList.add("progressbar");
  refreshInterval();
  updateListButton();
}

(function init() {
  updateListButton();
  const leftListButton = $(".left_list_button");
  const rightListButton = $(".right_list_button");
  leftListButton.addEventListener("click", () => {
    listArrowButtonClicked(-1);
  });
  rightListButton.addEventListener("click", () => {
    listArrowButtonClicked(1);
  });
})();

export {
  appendCategoryList,
  appendNewsList,
  updateCategoryClicked,
  setFirstListPage,
  stopCategoryInterval,
  startCategoryInterval,
};
