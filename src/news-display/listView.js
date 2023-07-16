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

const getPrevCategoryIndex = (currentCategory) => {
    const currentCategoryIndex = categoryList.indexOf(currentCategory);
    if (currentCategoryIndex === 0) return categoryList.length - 1;
    return currentCategoryIndex - 1;
};

const getNextCategoryIndex = (currentCategory) => {
    const currentCategoryIndex = categoryList.indexOf(currentCategory);
    if (currentCategoryIndex + 1 === categoryList.length) return 0;
    return currentCategoryIndex + 1;
};

const categoryBar = document.querySelector(".list-view-category-bar");

const getNewCategoryElement = (state, currentCategory) => {
    if (state === "prev") {
        return currentCategory.previousElementSibling === null
            ? categoryBar.querySelector("ul").lastElementChild
            : currentCategory.previousElementSibling;
    } else {
        return currentCategory.nextElementSibling === null
            ? categoryBar.querySelector("ul").firstElementChild
            : currentCategory.nextElementSibling;
    }
};

const updateCategoryActive = (state) => {
    const currentCategoryElement = categoryBar.querySelector(
        ".list-view-category-selected"
    );

    const newCategory = getNewCategoryElement(state, currentCategoryElement);

    currentCategoryElement.classList.remove("list-view-category-selected");
    currentCategoryElement.classList.remove("selected-bold14");
    currentCategoryElement.lastElementChild.remove();

    updateListView(newCategory);
};

const updateCurrentIndex = (pageIndex) => {
    const progressNumber = document.querySelector(".category-progress-number");
    progressNumber.innerHTML = pageIndex + 1;
};

const updatePrevListPageIndex = (pageIndex) => {
    if (pageIndex === 0) {
        setCurrentCategory(categoryList[getPrevCategoryIndex(currentCategory)]);
        categoryNewsData = initCategoryNewsData(currentCategory);
        setListPageIndex(categoryNewsData.length - 1);
        updateCategoryActive("prev");
    } else {
        setListPageIndex(pageIndex - 1);
    }
};

const updateNextListPageIndex = (pageIndex) => {
    if (pageIndex === categoryNewsData.length - 1) {
        setCurrentCategory(categoryList[getNextCategoryIndex(currentCategory)]);
        categoryNewsData = initCategoryNewsData(currentCategory);
        setListPageIndex(0);
        updateCategoryActive("next");
    } else {
        setListPageIndex(pageIndex + 1);
    }
};

let listViewInterval;
const startListViewInterval = () => {
    listViewInterval = window.setInterval(() => {
        renderListView();

        updateNextListPageIndex(pageIndex);
        updateCurrentIndex(pageIndex);
    }, 2000);
};

const setListView = () => {
    categoryNewsData = initCategoryNewsData(currentCategory);

    renderListView();
    clearInterval(listViewInterval);
    startListViewInterval();
};

export {
    setListView,
    startListViewInterval,
    listViewInterval,
    updateNextListPageIndex,
    updatePrevListPageIndex,
    updateCurrentIndex,
};
