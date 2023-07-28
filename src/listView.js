import { CATEGORY_TABS, MAX_NEWS_COUNT } from "./core/store/constants.js";
import { getNewsContent } from "./core/utils/api.js";
import { getState, register, setState } from "./core/observer/observer.js";
import {
  deletePress,
  isAlertOn,
  isDarkMode,
  isGrid,
  isSnackOn,
  isSubTab,
  listIdx,
  subscribeList,
} from "./core/store/store.js";
import { $ } from "./core/utils/util.js";

const subButton = $(".list_sub_button");
const unSubButton = $(".list_unsub_button");

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
    const isGridMode = getState(isGrid);
    if (!isGridMode) {
      const isSubMode = getState(isSubTab);
      const currentIdx = getState(listIdx);
      const nowCategoryIdx = currentIdx.category;
      const nowListIdx = currentIdx.list - 1;
      const subList = getState(subscribeList);
      const elements = getListViewElement();
      const isDark = getState(isDarkMode);
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
      if (nowData[nowListIdx] === undefined) return;
      $(".list_container").dataset.press = nowData[nowListIdx].name;
      elements.newsDetail.innerHTML = `${nowData[nowListIdx].name} 언론사에서 직접 편집한 뉴스입니다.`;
      elements.topicHeaderLogo.src = isDark
        ? nowData[nowListIdx].darkSrc
        : nowData[nowListIdx].lightSrc;
      elements.topicThumbnail.src = nowData[nowListIdx].mainNews.thumbnail;
      elements.topicMain.innerHTML = nowData[nowListIdx].mainNews.title;
      updateSubButtons(nowData);
      for (let i = 0; i < MAX_NEWS_COUNT; i++) {
        const newNewsList = createNewsList(nowData[nowListIdx].subNews[i]);
        elements.newsListContainer.appendChild(newNewsList);
      }
    }
  };
}

function updateSubButtons(nowData) {
  const subList = getState(subscribeList);
  const nowListIdx = getState(listIdx).list - 1;

  if (subList.includes(nowData[nowListIdx].name)) {
    subButton.style.display = "none";
    unSubButton.style.display = "block";
  } else {
    subButton.style.display = "block";
    unSubButton.style.display = "none";
  }
}

function subButtonClicked() {
  const currentSubList = getState(subscribeList);
  setState(subscribeList, [
    ...currentSubList,
    $(".list_container").dataset.press,
  ]);
  setState(isSnackOn, true);
}

function unSubButtonClicked() {
  setState(isAlertOn, true);
  setState(deletePress, $(".list_container").dataset.press);
}

async function setListViewEvents() {
  const newsList = await getNewsContent();
  subButton.addEventListener("click", subButtonClicked);
  unSubButton.addEventListener("click", unSubButtonClicked);
  register(listIdx, appendNewsList(newsList));
  register(isGrid, appendNewsList(newsList));
  register(isSubTab, appendNewsList(newsList));
  register(subscribeList, appendNewsList(newsList));
  register(isDarkMode, appendNewsList(newsList));
}

export { setListViewEvents };
