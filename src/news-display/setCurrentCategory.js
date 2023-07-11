const setCurrentCategory = () => {
    const categoryBar = document.querySelector(".list-view-category-bar");
    const categories = categoryBar.querySelectorAll("ul > li");
    // console.log(categories);

    categories.forEach((item) => {
        item.addEventListener("click", () => {
            item.classList.add("list-view-category-selected");
        });
    });
};

export { setCurrentCategory };
