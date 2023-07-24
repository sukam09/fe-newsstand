import { CATEGORY_TABS, MAX_NEWS_COUNT } from "./core/store/constants.js";
import { getNewsContent } from "./core/utils/api.js";
import { getState, register } from "./core/observer/observer.js";
import {
  categoryIdx,
  isGrid,
  isSubTab,
  listPageIdx,
  subscribeList,
} from "./core/store/store.js";
import { $ } from "./core/utils/util.js";

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
  return () => {
    const isSubMode = getState(isSubTab);
    const nowCategoryIdx = getState(categoryIdx);
    const nowListIdx = getState(listPageIdx) - 1;
    const subList = getState(subscribeList);
    const elements = getListViewElement();
    let nowData;
    elements.newsListContainer.innerHTML = "";
    if (isSubMode) {
      nowData = newsList.filter((press) => {
        return press.name === subList[nowCategoryIdx];
      });
    } else {
      nowData = newsList.filter((press) => {
        return press.category === CATEGORY_TABS[nowCategoryIdx];
      });
    }
    elements.newsDetail.innerHTML = `${nowData[nowListIdx].name} 언론사에서 직접 편집한 뉴스입니다.`;
    elements.topicHeaderLogo.src = nowData[nowListIdx].lightSrc;
    elements.topicThumbnail.src = nowData[nowListIdx].mainNews.thumbnail;
    elements.topicMain.innerHTML = nowData[nowListIdx].mainNews.title;
    for (let i = 0; i < MAX_NEWS_COUNT; i++) {
      const newNewsList = createNewsList(nowData[nowListIdx].subNews[i]);
      elements.newsListContainer.appendChild(newNewsList);
    }
  };
}

async function setListViewEvents() {
  const newsList = await getNewsContent();
  register(listPageIdx, appendNewsList(newsList));
  register(categoryIdx, appendNewsList(newsList));
  register(isGrid, appendNewsList(newsList));
  register(isSubTab, appendNewsList(newsList));
}

export { setListViewEvents };
