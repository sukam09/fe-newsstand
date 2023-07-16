import { press_list } from "../data/pressList.js";

const shuffledData = press_list.slice().sort(() => Math.random() - 0.5);
const rowSize = 6;
const colSize = 4;
const maxPage = 3;
let currentPage = 0;

//onClick event
document.querySelector(".grid_view_btn-left").addEventListener("click", () => {
    currentPage -= 1;
    RenderNews(shuffledData, currentPage);
});
document.querySelector(".grid_view_btn-right").addEventListener("click", () => {
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
            img.src = item.press_light_src;
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
            document.querySelector(".grid_view_btn-left").style.visibility = "hidden";
            document.querySelector(".grid_view_btn-right").style.visibility = "visible";
            break;
        case maxPage:
            document.querySelector(".grid_view_btn-left").style.visibility = "visible";
            document.querySelector(".grid_view_btn-right").style.visibility = "hidden";
            break;
        default:
            document.querySelector(".grid_view_btn-left").style.visibility = "visible";
            document.querySelector(".grid_view_btn-right").style.visibility = "visible";
            break;
    }
}

export function renderGridNews() {
    RenderNews(shuffledData, currentPage);
}
