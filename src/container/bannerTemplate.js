import * as elem from "../utils/createElement.js";
import { headline_news_left, headline_news_right } from "../../data/headlineNews.js";
import { stopRolling, startRolling } from "../components/layout/bannerRolling.js";

// 배너 리스트 생성
function createHeadlineList(headline_news) {
    const container = elem.createUl({ className: "container_sec-banner-list" });

    headline_news.forEach((news_item, idx) => {
        let list_class_name = "container_sec_li-banner";
        if (idx === 0) list_class_name += " current";
        else if (idx === 1) list_class_name += " next";
        else if (idx === 2) list_class_name += " prev";

        const list_item = elem.createLi({ className: list_class_name });
        const title = elem.createA({ className: "available-medium14", url: news_item.url, txt: news_item.title });
        title.addEventListener("mouseover", stopRolling);
        title.addEventListener("mouseout", startRolling);
        elem.createChild(list_item, [title]);
        elem.createChild(container, [list_item]);
    });

    return container;
}

// 좌우 각각 배너 생성
function createBannerItem(news_data) {
    const container = elem.createDiv({ className: "container_section-banner" });
    const press_name = elem.createSpan({
        className: "container_section-banner-press display-bold14",
        txt: news_data.press,
    });

    elem.createChild(container, [press_name, createHeadlineList(news_data.news)]);
    return container;
}

// 배너 섹션 이벤트 추가
export function createBanner() {
    const container = document.querySelector(".container_section");
    elem.createChild(container, [createBannerItem(headline_news_left), createBannerItem(headline_news_right)]);
    startRolling();
}
