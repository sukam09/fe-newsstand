import {
    currentCategory,
    initCategoryNewsData,
    pageIndex,
} from "./setCategory.js";
import { subscribeButton } from "./subscribeButton.js";

let categoryNewsData = [];

const getArticleHead = (newsData) => {
    return `
        <div class="press-head-container">
            <img src=${newsData.logo} alt=${newsData.name} />
            <div class="edit-time display-medium12">
                2023.10.04. 11:22 편집
            </div>
            ${subscribeButton(newsData.subscribed)}
        </div>
    `;
};

const getArticleMain = (newsData) => {
    return `
        <div class="articles-container available-medium16">
            <div class="main-article">
                <img src=${newsData.mainArticle.thumbnail} alt=${
        newsData.mainArticle.title
    } />
                <div class="main-title">
                    ${newsData.mainArticle.title}
                </div>
            </div>
            <div class="sub-articles">
                <ul>
                ${newsData.subArticles
                    .map((el) => `<li>${el.title}</li>`)
                    .join("")}
                </ul>
                <div class="press-description display-medium14">
                    ${newsData.name} 언론사에서 직접 편집한 뉴스입니다.
                </div>
            </div>
        </div>
    `;
};

// const validatePage = (page) => page >= MIN_PAGE_NUM && page <= MAX_PAGE_NUM;

const prevPageButton = document.querySelector(".left-arrow-button");

const handleClickPrevPageButton = () => {
    prevPageButton.addEventListener("click", () => {
        // if (!validatePage(page - 1)) return;
        pageIndex--;
        setListViewContent();
    });
};

const nextPageButton = document.querySelector(".right-arrow-button");

const handleClickNextPageButton = () => {
    nextPageButton.addEventListener("click", () => {
        // if (!validatePage(page + 1)) return;
        pageIndex++;
        setListViewContent();
    });
};

const checkShowPageButton = (page) => {
    prevPageButton.classList.remove("disabled");
    nextPageButton.classList.remove("disabled");

    if (page === 0) prevPageButton.classList.add("disabled");
    else if (page === 80) nextPageButton.classList.add("disabled");
};

const setListViewContent = async () => {
    checkShowPageButton(pageIndex);
    categoryNewsData = initCategoryNewsData(currentCategory);
    const listViewMain = document.querySelector(".list-view-main-container");
    listViewMain.innerHTML = "";
    listViewMain.insertAdjacentHTML(
        "beforeend",
        getArticleHead(categoryNewsData[pageIndex])
    );
    listViewMain.insertAdjacentHTML(
        "beforeend",
        getArticleMain(categoryNewsData[pageIndex])
    );
};

const setListView = () => {
    checkShowPageButton(pageIndex);
    setListViewContent();
    handleClickPrevPageButton();
    handleClickNextPageButton();
};

export { setListView, pageIndex, setListViewContent };
