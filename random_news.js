import { fetchPressData } from "./utils.js";

// rowSize, colSize, maxPage, currentPage is main size variable
const rowSize = 6;
const colSize = 4;
const maxPage = 3;
let currentPage = 0;

// move page
function movePage(data) {
    document.querySelector(".left_arrow").addEventListener("click", () => {
        currentPage -= 1;
        renderNews(data);
    });
    document.querySelector(".right_arrow").addEventListener("click", () => {
        currentPage += 1;
        renderNews(data);
    });
}

// render news
function renderNews(shuffledData) {
    const news_data_container = document.querySelector(".main_news_container");
    let cnt = currentPage * 24;
    news_data_container.innerHTML = "";
    toggleArrow(currentPage);

    for (let i = 0; i < colSize; i++) {
        let ul = document.createElement("ul");
        for (let j = 0; j < rowSize; j++) {
            const item = shuffledData[cnt] || { name: "empty", url: "" };
            let li = document.createElement("li");
            let img = document.createElement("img");
            img.classList.add("news_data_img");
            img.src = item.url;
            cnt += 1;
            li.appendChild(img);
            ul.appendChild(li);
        }
        news_data_container.appendChild(ul);
    }
}

// toggle arrow
function toggleArrow() {
    switch (currentPage) {
        case 0:
            document.querySelector(".left_arrow").style.display = "none";
            document.querySelector(".right_arrow").style.display = "block";
            break;
        case maxPage:
            document.querySelector(".left_arrow").style.display = "block";
            document.querySelector(".right_arrow").style.display = "none";
            break;
        default:
            document.querySelector(".left_arrow").style.display = "block";
            document.querySelector(".right_arrow").style.display = "block";
            break;
    }
}

function renderPress() {
    const promise_data = fetchPressData();

    promise_data.then((data) => {
        renderNews(data);
        movePage(data);
    });
}

export { renderPress };
