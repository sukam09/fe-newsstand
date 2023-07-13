import {
  CATEGORY_TAB_NUM,
  MAX_NEWS_COUNT,
  NOW_CATEGORY_IDX,
  NOW_LIST_PAGE,
} from "../constant/constants.js";
import { refreshInterval } from "./category.js";
import { $ } from "./util.js";

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
export function appendNewsList() {
  const elements = getListViewElement();
  elements.newsListContainer.innerHTML = "";
  const nowData =
    categoryList[NOW_CATEGORY_IDX.getValue()].data[
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
export function updateListButton() {
  const leftListButton = $(".left_list_button");
  const rightListButton = $(".right_list_button");
  if (NOW_LIST_PAGE.getValue() === 1 && NOW_CATEGORY_IDX.getValue() === 0) {
    leftListButton.style.display = "none";
    rightListButton.style.display = "block";
  } else if (
    NOW_CATEGORY_IDX.getValue() === CATEGORY_TAB_NUM &&
    NOW_LIST_PAGE.getValue() === categoryList[CATEGORY_TAB_NUM].data.length
  ) {
    rightListButton.style.display = "none";
    leftListButton.style.display = "block";
  } else {
    leftListButton.style.display = "block";
    rightListButton.style.display = "block";
  }
}
function listArrowButtonClicked(increment) {
  if (NOW_LIST_PAGE.getValue() + increment === 0) {
    NOW_CATEGORY_IDX.incrementValue(-1);
    NOW_LIST_PAGE.setValue(
      categoryList[NOW_CATEGORY_IDX.getValue()].data.length
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
