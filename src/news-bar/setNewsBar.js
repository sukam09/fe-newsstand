import insertHTML from "../utils/insertHTML.js";

const getNewsBarElement = (newData) => {
    const { press, headline } = newData;
    return `
        <li>
            <span class="display-bold14 news-bar-press">${press}</span>
            <span class="available-medium14 news-bar-headline">${headline}</span>
        </li>
        `;
};

const createNewsBar = (item, index) => {
    const $ul = document.createElement("ul");
    fetch(`../data/news-bar-data-${index + 1}.json`)
        .then((response) => response.json())
        .then((jsonData) => {
            jsonData.forEach((item) =>
                insertHTML($ul, getNewsBarElement(item))
            );
        });
    item.appendChild($ul);
};

export { createNewsBar };
