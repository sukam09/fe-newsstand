import { MAX_NEWS_COUNT } from "../constant/constants.js";
import { getNewsContents } from "./api.js";
import { refreshInterval } from "./category.js";
import { getState, resister, setState } from "./observer/observer.js";
import { categoryIdx, listPageIdx } from "./store/store.js";
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

// content가 들어간 뉴스 리스트 태그 생성
function createNewsList(content) {
  const newList = document.createElement("li");
  newList.className = "news_list";
  newList.innerHTML = content;
  return newList;
}

// 리스트 뷰의 뉴스 append
async function appendNewsList() {
  const elements = getListViewElement();
  if (cachedCategoryList === null) {
    cachedCategoryList = await getNewsContents();
  }
  elements.newsListContainer.innerHTML = "";
  const nowData =
    cachedCategoryList[getState("categoryIdx")].data[getState(listPageIdx) - 1];
  elements.newsDetail.innerHTML = `${nowData.name} 언론사에서 직접 편집한 뉴스입니다.`;
  elements.topicHeaderLogo.src = nowData.logoSrc;
  elements.topicThumbnail.src = nowData.imgSrc;
  elements.topicMain.innerHTML = nowData.mainTitle;
  for (let i = 0; i < MAX_NEWS_COUNT; i++) {
    const newNewsList = createNewsList(nowData.subTitleList[i].title);
    elements.newsListContainer.appendChild(newNewsList);
  }
}

function setListViewEvents() {
  resister(listPageIdx, appendNewsList);
}

export { setListViewEvents };

// 좌우 리스트 버튼 display 변경

// export async function listArrowButtonClicked(increment) {
//   if (cachedCategoryList === null) {
//     cachedCategoryList = await getNewsContents();
//   }
//   if (getState(listPageIdx) + increment === 0) {
//     setState(categoryIdx, getState(categoryIdx) - 1);
//     setState(
//       listPageIdx,
//       cachedCategoryList[getState("categoryIdx")].data.length
//     );
//   } else {
//     setState(listPageIdx, getState(listPageIdx) + increment);
//   }
//   const clickedCategory = $(".category_list--clicked");
//   clickedCategory.children[2].classList.remove("progressbar");
//   clickedCategory.offsetWidth;
//   clickedCategory.children[2].classList.add("progressbar");
//   refreshInterval();
//   updateListButton();
// }
