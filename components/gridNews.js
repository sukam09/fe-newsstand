import { pressObjArr } from "../data/pressObj.js";

const shuffledData = pressObjArr.slice().sort(() => Math.random() - 0.5);
const rowSize = 6;
const colSize = 4;
const maxPage = 3;
let currentPage = 0;

//onClick event
document.querySelector(".left-arrow").addEventListener("click", () => {
    currentPage -= 1;
    RenderNews(shuffledData, currentPage);
});
document.querySelector(".right-arrow").addEventListener("click", () => {
    currentPage += 1;
    RenderNews(shuffledData, currentPage);
});

function RenderNews(shuffledData) {
    let news_data_container = document.querySelector(".main_news_container");
    let cnt = currentPage * 24;
    news_data_container.innerHTML = "";
    toggleArrow(currentPage);

    for (let i = 0; i < colSize; i++) {
        let ul = document.createElement("ul");
        for (let j = 0; j < rowSize; j++) {
            const item = shuffledData[cnt];
            let li = document.createElement("li");
            let img = document.createElement("img");
            if (i == colSize - 1 && j == rowSize - 1) li.setAttribute("class", "border_bottom border_right");
            else if (i == colSize - 1) li.setAttribute("class", "border_bottom");
            else if (j == rowSize - 1) li.setAttribute("class", "border_right");

            img.classList.add("news_data_img");
            img.src = item.lightSrc;
            cnt += 1;
            li.appendChild(img);
            ul.appendChild(li);
        }
        news_data_container.appendChild(ul);
    }
}

function toggleArrow() {
    switch (currentPage) {
        case 0:
            document.querySelector(".left-arrow").style.visibility = "hidden";
            document.querySelector(".right-arrow").style.visibility = "visible";
            break;
        case maxPage:
            document.querySelector(".left-arrow").style.visibility = "visible";
            document.querySelector(".right-arrow").style.visibility = "hidden";
            break;
        default:
            document.querySelector(".left-arrow").style.visibility = "visible";
            document.querySelector(".right-arrow").style.visibility = "visible";
            break;
    }
}

function init() {
    RenderNews(shuffledData, currentPage);
}

init();
