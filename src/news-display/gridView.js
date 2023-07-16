import { gridPage, newsPressData } from "../app.js";
import { checkShowPageButton } from "./handlePageButton.js";
import { initNewsPressData } from "./initNewsPressData.js";

const PAGE_COUNT = 24;

// let gridPage = 1;
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
    checkShowPageButton(gridPage);
    const startIndex = PAGE_COUNT * (gridPage - 1);
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
    shuffledNewsPressData = shuffleArray([...newsPressData]);
    showNewsPressItems();
};

const setGridView = () => {
    checkShowPageButton(gridPage);
    shuffleNewsPress();
};

export { showNewsPressItems, setGridView };
