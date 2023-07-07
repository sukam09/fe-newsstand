import { news_trend_left, news_trend_right } from "./trend_ news.js";

document.addEventListener("DOMContentLoaded", () => {
    getBanner();
    window.setInterval(rollingCallback, 3000);
});

function rollingCallback() {
    let bannerArr = document.querySelectorAll(".rolling_banner");
    bannerArr.forEach((banner) => rollingBanner(banner));
}

function rollingBanner(banner) {
    //.prev 클래스 삭제
    let prev = banner.querySelector(".news_list .prev");
    prev.classList.remove("prev");

    //.current -> .prev
    let current = banner.querySelector(".news_list .current");
    current.classList.remove("current");
    current.classList.add("prev");
    //.next -> .current
    let next = banner.querySelector(".news_list .next");
    //다음 목록 요소가 널인지 체크
    if (next.nextElementSibling == null) {
        banner.querySelector(".news_list li:first-child").classList.add("next");
    } else {
        //목록 처음 요소를 다음 요소로 선택
        next.nextElementSibling.classList.add("next");
    }
    next.classList.remove("next");
    next.classList.add("current");
}

// 리스트 하나 만들기
function getNewsLi(press, title, url, idx) {
    const new_list_div = document.createElement("div");
    new_list_div.setAttribute("class", "list_div");
    const new_list = document.createElement("li");
    if (idx == 0) new_list.setAttribute("class", "current");
    else if (idx == 1) new_list.setAttribute("class", "next");
    else if (idx == 2) new_list.setAttribute("class", "prev");

    const new_press = document.createElement("span");
    new_press.innerHTML = press;

    const new_news = document.createElement("a");
    new_news.setAttribute("href", url);
    new_news.innerHTML = title;

    new_list_div.appendChild(new_press);
    new_list_div.appendChild(new_news);

    new_list.appendChild(new_list_div);
    return new_list;
}

// 전체 리스트 만들기
function getNewsUl(data) {
    const news_list = document.createElement("ul");
    news_list.setAttribute("class", "news_list");

    data.forEach((news, idx) => {
        news_list.appendChild(getNewsLi(news.press, news.title, news.url, idx));
    });

    return news_list;
}

function getBanner() {
    document.getElementById("rollingBannerLeft").appendChild(getNewsUl(news_trend_left));
    document.getElementById("rollingBannerRight").appendChild(getNewsUl(news_trend_right));
}
