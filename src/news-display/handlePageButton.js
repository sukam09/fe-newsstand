import { gridPage, pageIndex, setGridPage, setListPageIndex } from "../app.js";
import { showNewsPressItems } from "./gridView.js";
import {
    setListView,
    updateCurrentIndex,
    updateNextListPageIndex,
    updatePrevListPageIndex,
} from "./listView.js";

const MIN_PAGE_NUM = 1;
const MAX_PAGE_NUM = 4;

const validatePage = (page) => page >= MIN_PAGE_NUM && page <= MAX_PAGE_NUM;

const prevPageButton = document.querySelector(".grid-left-arrow-button");
const nextPageButton = document.querySelector(".grid-right-arrow-button");
const listPrevPageButton = document.querySelector(".list-left-arrow-button");
const listNextPageButton = document.querySelector(".list-right-arrow-button");

const clickGridPrev = () => {
    if (!validatePage(gridPage - 1)) return;
    setGridPage(gridPage - 1);
    showNewsPressItems();
};

const clickGridNext = () => {
    if (!validatePage(gridPage + 1)) return;
    setGridPage(gridPage + 1);
    showNewsPressItems();
};

const clickListPrev = () => {
    // setListPageIndex(pageIndex - 1);
    updatePrevListPageIndex(pageIndex);
    updateCurrentIndex(pageIndex);
    setListView();
};

const clickListNext = () => {
    // console.log("click next");
    // setListPageIndex(pageIndex + 1);
    updateNextListPageIndex(pageIndex);
    updateCurrentIndex(pageIndex);
    setListView();
};

const handleClickGridPrevButton = () => {
    prevPageButton.addEventListener("click", () => {
        clickGridPrev();
    });
};

const handleClickGridNextButton = () => {
    nextPageButton.addEventListener("click", () => {
        clickGridNext();
    });
};

const handleClickListPrevButton = () => {
    listPrevPageButton.addEventListener("click", () => {
        clickListPrev();
    });
};

const handleClickListNextButton = () => {
    listNextPageButton.addEventListener("click", () => {
        clickListNext();
    });
};

const checkShowPageButton = (page) => {
    prevPageButton.classList.remove("disabled");
    nextPageButton.classList.remove("disabled");

    if (page === MIN_PAGE_NUM) prevPageButton.classList.add("disabled");
    else if (page === MAX_PAGE_NUM) nextPageButton.classList.add("disabled");
};

export {
    checkShowPageButton,
    handleClickGridPrevButton,
    handleClickGridNextButton,
    handleClickListPrevButton,
    handleClickListNextButton,
};
