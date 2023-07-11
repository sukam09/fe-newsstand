const gridIcon = document.querySelector(".news-display-grid-button");
const listIcon = document.querySelector(".news-display-list-button");
const gridView = document.querySelector(".news-press-grid-view");
const listView = document.querySelector(".news-press-list-view");

const handleClickViewIcon = () => {
    gridIcon.addEventListener("click", () => {
        listIcon.classList.remove("news-display-active");
        gridIcon.classList.add("news-display-active");

        gridView.classList.remove("hidden");
        listView.classList.add("hidden");
    });

    listIcon.addEventListener("click", () => {
        gridIcon.classList.remove("news-display-active");
        listIcon.classList.add("news-display-active");

        listView.classList.remove("hidden");
        gridView.classList.add("hidden");
    });
};

export { handleClickViewIcon };
