import { gridPage, pageIndex, setGridPage, setListPageIndex } from "../app.js";
import { showNewsPressItems } from "./gridView.js";
import { setListViewContent } from "./listView.js";

const MIN_PAGE_NUM = 1;
const MAX_PAGE_NUM = 4;

const validatePage = (page) => page >= MIN_PAGE_NUM && page <= MAX_PAGE_NUM;

const prevPageButton = document.querySelector(".left-arrow-button");
const nextPageButton = document.querySelector(".right-arrow-button");

const handleClickGridPrevButton = () => {
    prevPageButton.addEventListener("click", () => {
        if (!validatePage(gridPage - 1)) return;
        // gridPage--;
        setGridPage(gridPage - 1);
        showNewsPressItems();
    });
};

const handleClickGridNextButton = () => {
    nextPageButton.addEventListener("click", () => {
        if (!validatePage(gridPage + 1)) return;
        // gridPage++;
        setGridPage(gridPage + 1);
        showNewsPressItems();
    });
};

const checkShowPageButton = (page) => {
    prevPageButton.classList.remove("disabled");
    nextPageButton.classList.remove("disabled");

    if (page === MIN_PAGE_NUM) prevPageButton.classList.add("disabled");
    else if (page === MAX_PAGE_NUM) nextPageButton.classList.add("disabled");
};

// const validatePage = (page) => page >= MIN_PAGE_NUM && page <= MAX_PAGE_NUM;

const handleClickListPrevButton = () => {
    prevPageButton.addEventListener("click", () => {
        // if (!validatePage(page - 1)) return;
        // pageIndex--;
        setListPageIndex(pageIndex - 1);
        setListViewContent();
    });
};

const handleClickListNextButton = () => {
    nextPageButton.addEventListener("click", () => {
        // if (!validatePage(page + 1)) return;
        // pageIndex++;
        setListPageIndex(pageIndex + 1);
        setListViewContent();
    });
};

const initPageButton = (page) => {
    prevPageButton.classList.remove("disabled");
    nextPageButton.classList.remove("disabled");
};

const handlePageButton = (viewMode) => {
    // console.log(viewMode);
    if (viewMode === "grid") {
        handleClickGridPrevButton();
        handleClickGridNextButton();
    } else {
        initPageButton();
        handleClickListPrevButton();
        handleClickListNextButton();
    }
};

export { checkShowPageButton, handlePageButton };
