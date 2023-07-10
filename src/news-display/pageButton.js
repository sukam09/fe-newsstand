const MIN_PAGE_NUM = 1;
const MAX_PAGE_NUM = 4;

const validatePage = (page) => page >= MIN_PAGE_NUM && page <= MAX_PAGE_NUM;

const prevPageButton = document.querySelector(".left-arrow-button");

const handleClickPrevPageButton = () => {
    prevPageButton.addEventListener("click", () => {
        if (!validatePage(page - 1)) return;
        page--;
        showNewsPressItems();
    });
};

const nextPageButton = document.querySelector(".right-arrow-button");

const handleClickNextPageButton = () => {
    nextPageButton.addEventListener("click", () => {
        if (!validatePage(page + 1)) return;
        page++;
        showNewsPressItems();
    });
};

const checkShowPageButton = (page) => {
    prevPageButton.classList.remove("disabled");
    nextPageButton.classList.remove("disabled");

    if (page === MIN_PAGE_NUM) prevPageButton.classList.add("disabled");
    else if (page === MAX_PAGE_NUM) nextPageButton.classList.add("disabled");
};

checkShowPageButton(page);

export { handleClickPrevPageButton, handleClickNextPageButton };
