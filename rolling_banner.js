import { news_trend_left, news_trend_right } from "./trend_ news.js";

document.addEventListener("DOMContentLoaded", () => {
    getBanner();
});

// 리스트 하나 만들기
function getNewsLi(press, title, url) {
    const new_list = document.createElement("li");

    const new_press = document.createElement("span");
    new_press.innerHTML = press;

    const new_news = document.createElement("a");
    new_news.setAttribute("href", url);
    new_news.innerHTML = title;

    new_list.appendChild(new_press);
    new_list.appendChild(new_news);
    return new_list;
}

// 전체 리스트 만들기
function getNewsUl(data) {
    const news_list = document.createElement("ul");

    data.forEach((news, idx) => {
        news_list.appendChild(getNewsLi(news.press, news.title, news.url, idx));
    });

    return news_list;
}

function getBanner() {
    document.getElementById("sectionLeft").appendChild(getNewsUl(news_trend_left));
    document.getElementById("sectionRight").appendChild(getNewsUl(news_trend_right));
}
