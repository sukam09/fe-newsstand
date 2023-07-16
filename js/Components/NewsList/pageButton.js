import { convertTab, nowCategoryNewsData } from "./fieldTab.js";
import { clearProgress } from "./progress.js";

let page = 1;
let $nowPage;

const $leftButton = document.querySelector(
  ".news-section-list .left-button_content"
);
const $rightButton = document.querySelector(
  ".news-section-list .right-button_content"
);

const $pressNews = document.querySelector(".news-list__press-news");

const renderContent = () => {
  $nowPage.data = page + " ";
  clearProgress();

  $pressNews.innerHTML = `
    <div class="news-list__press-news__info">
      <img
        src=${nowCategoryNewsData[page - 1].logo}
        alt="Brandmark"
        height="24"
        class="news-list__press-news__info__brandmark"
      />
      <span class="news-list__press-news__info__date">${
        nowCategoryNewsData[page - 1].editTime
      } 편집</span>
      <img src="./assets/icons/SubscribeButton.svg" alt="Button" />
    </div>
    <div class="news-list__press-news__news">
      <div class="news-list__press-news__main">
        <div class="news-list__press-news__thumbnail">
          <img
            src="./assets/images/Thumbnail.png"
            alt="Thumbnail"
            class="news-list__press-news__thumbnail-image"
          />
        </div>
        <span class="news-list__press-news__title">${
          nowCategoryNewsData[page - 1].mainArticle.title
        }</span>
      </div>
      <div class="news-list__press-news__sub">
      ${nowCategoryNewsData[page - 1].subArticles
        .map(
          (item) =>
            `<span class="news-list__press-news__subtitle">${item.title}</span>`
        )
        .join("")}
        <span class="news-list__press-news__subcaption">${
          nowCategoryNewsData[page - 1].name
        } 언론사에서 직접 편집한 뉴스입니다.</span>
      </div>
    </div>
    `;
};

const movePage = (amount) => {
  page += amount;
  renderContent();
};

const movePageLeft = () => {
  if (page === 1) {
    convertTab(-1);
    page = nowCategoryNewsData.length;
    renderContent();
  } else {
    movePage(-1);
  }
};

const movePageRight = () => {
  page === nowCategoryNewsData.length ? convertTab(1) : movePage(1);
};

const setNowPageTag = () => {
  $nowPage = document.querySelector(".news-list__field-tab__progress-count")
    .childNodes[0];
};

const changePageTarget = () => {
  setNowPageTag();
  page = 1;
  renderContent();
};

const setListPageButton = () => {
  setNowPageTag();

  $leftButton.addEventListener("click", movePageLeft);
  $rightButton.addEventListener("click", movePageRight);
};

export {
  setListPageButton,
  movePageRight,
  changePageTarget,
  setNowPageTag,
  renderContent,
};
