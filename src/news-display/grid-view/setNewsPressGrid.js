const PAGE_COUNT = 24;

let page = 1;
let newsPressData = [];

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const initNewsPressData = () => {
    fetch("../data/press-info.json")
        .then((response) => response.json())
        .then((jsonData) => {
            newsPressData = shuffleArray(jsonData);
            showNewsPressItems();
        });
};

const showNewsPressItems = () => {
    checkShowPageButton(page);
    const startIndex = PAGE_COUNT * (page - 1);
    const endIndex = startIndex + (PAGE_COUNT - 1);
    const currentNewsPressData = newsPressData.slice(startIndex, endIndex + 1);

    const newsPressGrid = document.querySelector(".news-press-grid");
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
};

export { initNewsPressData, showNewsPressItems };
