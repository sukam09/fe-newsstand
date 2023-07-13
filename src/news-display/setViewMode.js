import { gridPage, setListPageIndex } from "../app.js";
import { checkShowPageButton } from "./handlePageButton.js";

const gridIcon = document.querySelector(".news-display-grid-button");
const listIcon = document.querySelector(".news-display-list-button");
const gridView = document.querySelector(".news-press-grid-view");
const listView = document.querySelector(".news-press-list-view");

const gridPrevButton = document.querySelector(".grid-left-arrow-button");
const gridNextButton = document.querySelector(".grid-right-arrow-button");
const listPrevButton = document.querySelector(".list-left-arrow-button");
const listNextButton = document.querySelector(".list-right-arrow-button");

const handleClickViewIcon = () => {
    gridIcon.addEventListener("click", () => {
        checkShowPageButton(gridPage);

        listIcon.classList.remove("news-display-active");
        gridIcon.classList.add("news-display-active");

        gridView.classList.remove("hidden");
        listView.classList.add("hidden");

        gridPrevButton.classList.remove("hidden");
        gridNextButton.classList.remove("hidden");

        listPrevButton.classList.add("hidden");
        listNextButton.classList.add("hidden");
    });

    listIcon.addEventListener("click", () => {
        setListPageIndex(0);

        gridIcon.classList.remove("news-display-active");
        listIcon.classList.add("news-display-active");

        listView.classList.remove("hidden");
        gridView.classList.add("hidden");

        listPrevButton.classList.remove("hidden");
        listNextButton.classList.remove("hidden");

        gridPrevButton.classList.add("hidden");
        gridNextButton.classList.add("hidden");
    });
};

export { handleClickViewIcon };
