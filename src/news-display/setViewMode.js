const gridIcon = document.querySelector(".news-display-grid-button");
const listIcon = document.querySelector(".news-display-list-button");

const handleClickViewIcon = () => {
    gridIcon.addEventListener("click", () => {
        listIcon.classList.remove("news-display-active");
        gridIcon.classList.add("news-display-active");
    });

    listIcon.addEventListener("click", () => {
        gridIcon.classList.remove("news-display-active");
        listIcon.classList.add("news-display-active");
    });
};

export { handleClickViewIcon };
