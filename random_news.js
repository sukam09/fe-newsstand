const shuffledData = news_data.slice().sort(() => Math.random() - 0.5);
const rowSize = 6;
const colSize = 4;
const maxPage = 3;
let currentPage = 0;

//onClick event
document.querySelector(".left_arrow").addEventListener("click", () => {
    currentPage -= 1;
    RenderNews(shuffledData);
});
document.querySelector(".right_arrow").addEventListener("click", () => {
    currentPage += 1;
    RenderNews(shuffledData);
});

function RenderNews(shuffledData) {
    let news_data_container = document.querySelector(".main_news_container");
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

function init() {
    RenderNews(shuffledData);
}

init();
