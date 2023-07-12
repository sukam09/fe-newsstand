import { getState } from "../../observer/observer.js";
import { PRESS_ICON } from "../../constants/constants.js";
import { categoryState, listPageState } from "../../store/store.js";

const $listView = document.querySelector(".list-view_main");

const fillNewsList = (newsList) => () => {
  const currentCategory = getState(categoryState);
  const currentPage = getState(listPageState);
  const currentNewsList = newsList[currentCategory][currentPage];

  $listView.innerHTML = createNewsList(currentNewsList);
};

const createNewsList = (currentNewsList) => {
  const { press, editTime, img, title, subNews, info } = currentNewsList;

  return `
    <header class="list-view_main-header" >
        <img src="${PRESS_ICON[press].light}" height="20px" />
        <div>
            <span class="display-medium12">${editTime} 편집</span>
        </div>
        <div>구독하기</div>
    </header>
    <div class="list-view_main-box">
        <div class="list-view_main-news">
        <img
            src="${img}"
            width="320px"
            height="200px"
        />
        <span class="available-medium16">${title}</span>
        </div>
        <ul class="list-view_news-list available-medium16">
            ${subNews.reduce((acc, cur) => {
              return (acc += `<li>${cur}</li>`);
            })}
            <li class="display-medium14">${info}</li>
        </ul>
    </div>`;
};

export { fillNewsList };
