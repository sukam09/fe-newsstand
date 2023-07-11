import { customFetch, shuffleArrayRandom } from "./utils.js";
import { CATEGORY_LIST, PRESS_ICON } from "./constants.js";
import { createProgressInner, startProgress } from "./progress-bar.js";
import { setNavigationButtons } from "./navigation-button.js";
import { listPagesStore } from "./store.js";

const $categoryBar = document.querySelector(".list-view_category-bar > ul");
const $listView = document.querySelector(".list-view_main");

const listCurrentPages = listPagesStore.getInstance();

export const setCategoryBar = () => {
  const categoryList = shuffleArrayRandom(CATEGORY_LIST);

  categoryList.forEach(
    (category, idx) =>
      ($categoryBar.innerHTML +=
        idx === 0
          ? `<li class="category--selected">${createProgressInner(
              category,
              listCurrentPages.getPages(),
              81
            )}</li>`
          : `<li>${category}</li>`)
  );

  startProgress();
};

let newsList;
export const fillNewsList = (
  // newsList,
  category,
  pages
) => {
  console.log(pages);
  const { press, editTime, img, title, subNews, info } =
    newsList[category][pages];
  $listView.innerHTML = `
    <header class="list-view_main-header">
      <img src="${PRESS_ICON[press].light}" height="20px" />
      <span class="available-medium12">${editTime} 편집</span>
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

export const setList = async (currentPage) => {
  newsList = await customFetch("../mocks/newsList.json");

  fillNewsList("종합/경제", currentPage.getPages());
  setNavigationButtons(newsList, currentPage, fillNewsList);
};
