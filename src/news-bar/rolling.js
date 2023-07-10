const setRollingEvent = (rollingElement) => {
    window.setInterval(() => {
        rollingElement.style.transitionDuration = "400ms";
        rollingElement.style.marginTop = "-26px";

        window.setTimeout(() => {
            rollingElement.removeAttribute("style");
            rollingElement.appendChild(rollingElement.firstElementChild);
        }, 1000);
    }, 5000);
};

const infiniteRolling = () => {
    const rollingElement = document.querySelectorAll(".news-bar-rolling > ul");
    rollingElement.forEach((item) => setRollingEvent(item));
};

const getNewsBarElement = (newData) => {
    const { press, headline } = newData;
    return `
        <li>
            <span class="display-bold14 news-bar-press">${press}</span>
            <span class="available-medium14 news-bar-headline">${headline}</span>
        </li>
        `;
};

const createNewsBarData = (item, index) => {
    const $ul = document.createElement("ul");
    fetch(`../data/news-bar-data${index + 1}.json`)
        .then((response) => response.json())
        .then((jsonData) => {
            jsonData.forEach((item) =>
                $ul.insertAdjacentHTML("beforeend", getNewsBarElement(item))
            );
        });
    item.appendChild($ul);
};

const setNewsBarRolling = () => {
    const newsBarRolling = document.querySelectorAll(".news-bar-rolling");
    newsBarRolling.forEach((item, index) => createNewsBarData(item, index));
};

export { setNewsBarRolling, infiniteRolling };
