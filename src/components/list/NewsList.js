import { getState } from "../../observer/observer.js";
import { PRESS_ICON } from "../../constants/constants.js";
import { categoryState, listPageState } from "../../store/store.js";

const $listView = document.querySelector(".list-view_main");

const fillNewsList = (newsList) => () => {
  const currentCategory = getState(categoryState);
  const currentPage = getState(listPageState);

  const { press, editTime, img, title, subNews, info } =
    newsList[currentCategory][currentPage];
  $listView.innerHTML = `
      <header class="list-view_main-header">
        <img src="${PRESS_ICON[press].light}" height="20px" />
        <span class="display-medium12">${editTime} 편집</span>
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

const setPageActivateState = (newsList) => () => {
  const $maxPage = document.querySelectorAll(
    ".progress-component > div > span"
  )[1];
  const currentCategory = getState(categoryState);
  const currentPage = getState(listPageState);

  if (currentPage === newsList[currentCategory].length - 1) {
    $maxPage.classList.replace("font-deactivate", "font-activate");
  } else {
    $maxPage.classList.contains("font-activate") &&
      $maxPage.classList.replace("font-activate", "font-deactivate");
  }
};

export { fillNewsList, setPageActivateState };
