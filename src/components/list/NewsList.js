import { getState } from "../../observer/observer.js";
import { PRESS_ICON } from "../../constants/constants.js";
import { categoryState, isDarkMode, listPageState } from "../../store/store.js";
import { createSubscribeButton } from "../subscribe-button/SubscribeButton.js";
import { _querySelector } from "../../utils/my-query-selector.js";

const $listView = _querySelector(".list-view_main");

const fillNewsList = (newsList) => () => {
  const currentCategory = getState(categoryState);
  const currentPage = getState(listPageState);
  const currentNewsList = newsList[currentCategory][currentPage];

  $listView.innerHTML = createNewsList(currentNewsList);
};

const createNewsList = (currentNewsList) => {
  const currentMode = getState(isDarkMode);
  const { press, editTime, img, title, subNews, info } = currentNewsList;

  return `
    <header class="list-view_main-header" >
        <img src="${
          currentMode ? PRESS_ICON[press].dark : PRESS_ICON[press].light
        }" height="20px" />
        <div>
            <span class="display-medium12">${editTime} 편집</span>
        </div>
        ${createSubscribeButton()}
    </header>
    <div class="list-view_main-box">
        <div class="list-view_main-news">
          <div class="main-news_img-wrapper">
            <img src="${img}"/>
          </div>
          <span class="available-medium16">${title}</span>
        </div>
        <ul class="list-view_news-list">
            ${subNews.reduce((acc, cur) => {
              return (acc += `<li class="hover-underline available-medium16">${cur}</li>`);
            }, "")}
            <li class="display-medium14">${info}</li>
        </ul>
    </div>`;
};

export { fillNewsList };
