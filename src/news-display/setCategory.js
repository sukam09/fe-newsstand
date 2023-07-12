const categoryBar = document.querySelector(".list-view-category-bar");

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

const setCategoryProgressNum = (newData) => {
    return `
        <div class="category-progress-number-container">
            <div class="category-progress-number">
                1
            </div>
            <div>/</div>
            <div>81</div>
        </div>
        `;
};

const initCategoryClass = (item) => {
    if (item.classList.contains("list-view-category-selected")) {
        item.classList.remove("list-view-category-selected");
        item.classList.remove("selected-bold14");
    }
};

const setCurrentCategory = () => {
    const categories = categoryBar.querySelectorAll("ul > li");

    categories.forEach((item) => {
        item.insertAdjacentHTML("beforeend", setCategoryProgressNum());
        item.addEventListener("click", () => {
            categories.forEach((item) => initCategoryClass(item));
            item.classList.add("list-view-category-selected");
            item.classList.add("selected-bold14");
        });
    });
};

const setFirstCategoryActive = () => {
    const firstCategory = categoryBar.querySelector("ul > li");

    firstCategory.classList.add("list-view-category-selected");
    firstCategory.classList.add("selected-bold14");
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

export { setCategories };
