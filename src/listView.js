import { MAX_NEWS_COUNT } from "../constant/constants.js";
import { getNewsContents } from "./api.js";
import { getState, resister } from "./observer/observer.js";
import { categoryIdx, isGrid, listPageIdx } from "./store/store.js";
import { $ } from "./util.js";

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
function appendNewsList(newsList) {
  const elements = getListViewElement();
  elements.newsListContainer.innerHTML = "";
  const nowData =
    newsList[getState("categoryIdx")].data[getState(listPageIdx) - 1];
  elements.newsDetail.innerHTML = `${nowData.name} 언론사에서 직접 편집한 뉴스입니다.`;
  elements.topicHeaderLogo.src = nowData.logoSrc;
  elements.topicThumbnail.src = nowData.imgSrc;
  elements.topicMain.innerHTML = nowData.mainTitle;
  for (let i = 0; i < MAX_NEWS_COUNT; i++) {
    const newNewsList = createNewsList(nowData.subTitleList[i].title);
    elements.newsListContainer.appendChild(newNewsList);
  }
}

async function setListViewEvents() {
  const newsList = await getNewsContents();
  resister(listPageIdx, () => {
    appendNewsList(newsList);
  });
  resister(isGrid, () => {
    appendNewsList(newsList);
  });
  resister(categoryIdx, () => {
    appendNewsList(newsList);
  });
}

export { setListViewEvents };
