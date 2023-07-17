import {
  MAX_NEWS_COUNT,
  NOW_CATEGORY_IDX,
  NOW_LIST_PAGE,
} from "../constant/constants.js";
import { getNewsContents } from "./api.js";
import { refreshInterval } from "./category.js";
import { $ } from "./util.js";

let cachedCategoryList = null;

// 리스트뷰 element querySelector 함수
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
export async function appendNewsList() {
  const elements = getListViewElement();
  if (cachedCategoryList === null) {
    cachedCategoryList = await getNewsContents();
  }
  elements.newsListContainer.innerHTML = "";
  const nowData =
    cachedCategoryList[NOW_CATEGORY_IDX.getValue()].data[
      NOW_LIST_PAGE.getValue() - 1
    ];
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
export async function updateListButton() {
  if (cachedCategoryList === null) {
    cachedCategoryList = await getNewsContents();
  }
  const leftListButton = $(".left_list_button");
  const rightListButton = $(".right_list_button");
  if (NOW_LIST_PAGE.getValue() === 1 && NOW_CATEGORY_IDX.getValue() === 0) {
    leftListButton.style.display = "none";
    rightListButton.style.display = "block";
  } else if (
    NOW_CATEGORY_IDX.getValue() === cachedCategoryList.length - 1 &&
    NOW_LIST_PAGE.getValue() ===
      cachedCategoryList[cachedCategoryList.length - 1].data.length
  ) {
    rightListButton.style.display = "none";
    leftListButton.style.display = "block";
  } else {
    leftListButton.style.display = "block";
    rightListButton.style.display = "block";
  }
}
export async function listArrowButtonClicked(increment) {
  if (cachedCategoryList === null) {
    cachedCategoryList = await getNewsContents();
  }
  if (NOW_LIST_PAGE.getValue() + increment === 0) {
    NOW_CATEGORY_IDX.incrementValue(-1);
    NOW_LIST_PAGE.setValue(
      cachedCategoryList[NOW_CATEGORY_IDX.getValue()].data.length
    );
  } else {
    NOW_LIST_PAGE.incrementValue(increment);
  }
  const clickedCategory = $(".category_list--clicked");
  clickedCategory.children[2].classList.remove("progressbar");
  clickedCategory.offsetWidth;
  clickedCategory.children[2].classList.add("progressbar");
  refreshInterval();
  updateListButton();
}

(function init() {
  const leftListButton = $(".left_list_button");
  const rightListButton = $(".right_list_button");
  leftListButton.addEventListener("click", () => {
    listArrowButtonClicked(-1);
  });
  rightListButton.addEventListener("click", () => {
    listArrowButtonClicked(1);
  });
})();
