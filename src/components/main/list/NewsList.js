import {
  checkIsAllType,
  checkIsDarkMode,
  checkIsGridView,
} from "../../../utils/utils.js";
import {
  categoryState,
  listPageState,
  selectedSubscribeState,
  subscribeListPageState,
} from "../../../store/store.js";
import { getState } from "../../../observer/observer.js";
import { PRESS_ICON } from "../../../constants/constants.js";
import { _querySelector } from "../../../utils/my-query-selector.js";
import { getSubscribeButton } from "../subscribe-button/SubscribeButton.js";

const $listView = _querySelector(".list-view_main");

const fillNewsList = (newsList, pressNewsList) => () => {
  const isGridView = checkIsGridView();
  if (isGridView) return;

  const currentNewsList = getCurrentNewsList(newsList, pressNewsList);
  const { press, editTime, img, title, subNews, info } = currentNewsList;

  $listView.innerHTML = "";
  $listView.appendChild(createNewsHeader(press, editTime));
  $listView.appendChild(createNewsList(img, title, subNews, info));
};

const getCurrentNewsList = (newsList, pressNewsList) => {
  const isSubscribeType = !checkIsAllType();

  if (isSubscribeType) {
    const currentPage = getState(subscribeListPageState);
    const currentPress = getState(selectedSubscribeState);
    return pressNewsList[currentPress][currentPage];
  } else {
    const currentCategory = getState(categoryState);
    const currentPage = getState(listPageState);
    return newsList[currentCategory][currentPage];
  }
};

const createNewsHeader = (press, editTime) => {
  const isDarkMode = checkIsDarkMode();
  const imgSrc = isDarkMode ? PRESS_ICON[press].dark : PRESS_ICON[press].light;

  const $header = document.createElement("header");
  $header.className = "list-view_main-header";
  $header.innerHTML = ` 
      <img
        src="${imgSrc}"
        height="20px"
      />
      <div>
        <span class="display-medium12">${editTime} 편집</span>
      </div>`;
  const $subscribeButton = getSubscribeButton(press);
  $header.appendChild($subscribeButton);

  return $header;
};

const createNewsList = (img, title, subNews, info) => {
  const $listBox = document.createElement("div");

  $listBox.className = "list-view_main-box";
  $listBox.innerHTML = `
      <div class="list-view_main-news">
        <div class="main-news_img-wrapper">
          <img src="${img}" />
        </div>
        <span class="available-medium16">${title}</span>
      </div>
      <ul class="list-view_news-list">
        ${subNews.reduce((acc, cur) => {
          return (acc += `<li class="hover-underline available-medium16">${cur}</li>`);
        }, "")}
        <li class="display-medium14">${info}</li>
      </ul>`;

  return $listBox;
};

export { fillNewsList };
