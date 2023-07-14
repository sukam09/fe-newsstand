import { pageIndex, setListPageIndex } from "../app.js";
import insertHTML from "../utils/insertHTML.js";
import {
    categoryList,
    currentCategory,
    getCategoryNewsCount,
    initCategoryNewsData,
    setCategoryProgressNum,
    setCurrentCategory,
    updateListView,
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
                <div class="main-image">
                    <img src=${newsData.mainArticle.thumbnail} alt=${
        newsData.mainArticle.title
    } />
                </div>
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

const getArticle = (newsData) => {
    return `
        ${getArticleHead(newsData)}
        ${getArticleMain(newsData)}
    `;
};

const listViewMain = document.querySelector(".list-view-main-container");

const renderListView = () => {
    listViewMain.innerHTML = "";
    insertHTML(listViewMain, getArticle(categoryNewsData[pageIndex]));
};

const getNextCategoryIndex = (currentCategory) => {
    const currentCategoryIndex = categoryList.indexOf(currentCategory);
    if (currentCategoryIndex + 1 === categoryList.length) return 0;
    return currentCategoryIndex + 1;
};

const categoryBar = document.querySelector(".list-view-category-bar");

const setNextCategoryActive = () => {
    const currentCategoryElement = categoryBar.querySelector(
        ".list-view-category-selected"
    );

    let nextCategoryElement = currentCategoryElement.nextElementSibling;
    if (nextCategoryElement === null) {
        nextCategoryElement = categoryBar.querySelector("ul").firstElementChild;
    }

    currentCategoryElement.classList.remove("list-view-category-selected");
    currentCategoryElement.classList.remove("selected-bold14");
    currentCategoryElement.lastElementChild.remove();

    updateListView(nextCategoryElement);
};

const updateCurrentIndex = (pageIndex) => {
    const progressNumber = document.querySelector(".category-progress-number");
    progressNumber.innerHTML = pageIndex + 1;
};

let listViewInterval;
const startListViewInterval = () => {
    listViewInterval = window.setInterval(() => {
        renderListView();

        if (pageIndex === categoryNewsData.length - 1) {
            setCurrentCategory(
                categoryList[getNextCategoryIndex(currentCategory)]
            );
            categoryNewsData = initCategoryNewsData(currentCategory);
            setListPageIndex(0);
            setNextCategoryActive();
        } else {
            setListPageIndex(pageIndex + 1);
        }
        updateCurrentIndex(pageIndex);
    }, 20000);
};

const setListView = () => {
    categoryNewsData = initCategoryNewsData(currentCategory);

    renderListView();
    clearInterval(listViewInterval);
    startListViewInterval();
};

export { setListView, startListViewInterval, listViewInterval };
