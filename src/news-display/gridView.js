import { newsPressData } from "../app.js";
import { initNewsPressData } from "./initNewsPressData.js";

const MIN_PAGE_NUM = 1;
const MAX_PAGE_NUM = 4;
const PAGE_COUNT = 24;

let page = 1;
let shuffledNewsPressData = [];

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const fillEmptyCells = (currentNewsPressData, newsPressGrid) => {
    if (currentNewsPressData.length < 24) {
        const count = currentNewsPressData.length;
        for (let i = 0; i < 24 - count; i++) {
            const $li = document.createElement("li");
            $li.className = "news-press-item";
            newsPressGrid.appendChild($li);
        }
    }
};

const showNewsPressItems = () => {
    checkShowPageButton(page);
    const startIndex = PAGE_COUNT * (page - 1);
    const endIndex = startIndex + (PAGE_COUNT - 1);
    const currentNewsPressData = shuffledNewsPressData.slice(
        startIndex,
        endIndex + 1
    );

    const newsPressGrid = document.querySelector(".news-press-grid-view");
    newsPressGrid.innerHTML = "";
    currentNewsPressData.forEach((_, index) => {
        const $li = document.createElement("li");
        $li.className = "news-press-item";
        const $img = document.createElement("img");
        const { name, logo } = currentNewsPressData[index];
        $img.src = logo;
        $img.alt = name;
        $img.classList.add("news-press-item-logo");
        $li.appendChild($img);
        newsPressGrid.appendChild($li);
    });
    fillEmptyCells(currentNewsPressData, newsPressGrid);
};

const shuffleNewsPress = async () => {
    // shuffledNewsPressData = newsPressData;
    shuffledNewsPressData = shuffleArray([...newsPressData]);
    showNewsPressItems();
};

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
const setGridView = () => {
    checkShowPageButton(page);
    shuffleNewsPress();
    handleClickPrevPageButton();
    handleClickNextPageButton();
};

export { showNewsPressItems, setGridView };
