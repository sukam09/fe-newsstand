import { newsPressData, pageIndex, setListPageIndex } from "../app.js";
import { setListViewContent } from "./listView.js";

const categoryBar = document.querySelector(".list-view-category-bar");

let currentCategory = "종합/경제";
// let pageIndex = 0;

const categoryList = [
    "종합/경제",
    "방송/통신",
    "IT",
    "영자지",
    "스포츠/연예",
    "매거진/전문지",
    "지역",
];

const getCategoryList = (category) => {
    return `
        <li>
            <div class="category-text">
                ${category}
            </div>
        </li>
    `;
};

const setCategoryProgressNum = (count) => {
    return `
        <div class="category-progress-number-container">
            <div class="category-progress-number">
                1
            </div>
            <div>/</div>
            <div class="category-total-number">${count}</div>
        </div>
        `;
};

const setCategoryPageCount = (categoryElement) => {
    const category = categoryElement
        .querySelector(".category-text")
        .textContent.trim();
    return category;
};

const initCategoryClass = (item) => {
    if (item.classList.contains("list-view-category-selected")) {
        item.classList.remove("list-view-category-selected");
        item.classList.remove("selected-bold14");
        item.lastElementChild.remove();
    }
};

const setCurrentCategory = () => {
    const categories = categoryBar.querySelectorAll("ul > li");

    categories.forEach((item) => {
        item.addEventListener("click", () => {
            setListPageIndex(0);
            currentCategory = setCategoryPageCount(item);
            categories.forEach((item) => initCategoryClass(item));
            item.insertAdjacentHTML(
                "beforeend",
                setCategoryProgressNum(getCategoryNewsCount(currentCategory))
            );
            setListViewContent();
            item.classList.add("list-view-category-selected");
            item.classList.add("selected-bold14");
        });
    });
};

const setFirstCategoryActive = () => {
    const firstCategory = categoryBar.querySelector("ul > li");

    firstCategory.classList.add("list-view-category-selected");
    firstCategory.classList.add("selected-bold14");
    firstCategory.insertAdjacentHTML(
        "beforeend",
        setCategoryProgressNum(getCategoryNewsCount(currentCategory))
    );
};

const setCategories = () => {
    const $ul = document.createElement("ul");
    categoryList.forEach((category) => {
        $ul.insertAdjacentHTML("beforeend", getCategoryList(category));
    });
    categoryBar.appendChild($ul);
    setFirstCategoryActive();
    setCurrentCategory();
};

const initCategoryNewsData = (currentCategory) => {
    return newsPressData.filter((item) => item.category === currentCategory);
};

const getCategoryNewsCount = (currentCategory) => {
    return newsPressData.filter((item) => item.category === currentCategory)
        .length;
};

export { setCategories, currentCategory, initCategoryNewsData };
