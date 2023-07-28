import { headline_news_left, headline_news_right } from "../../data/headlineNews.js";
import { stopRolling, startRolling } from "../components/layout/bannerRolling.js";
import { create } from "../utils/createElement.js";

// 배너 리스트 생성
function createHeadlineList(headline_news) {
    const $container = create.ul({ className: "container_sec-banner-list available-medium14" });
    headline_news.forEach((news_item, idx) => {
        let list_class_name = "container_sec_li-banner";
        if (idx === 0) list_class_name += " current";
        else if (idx === 1) list_class_name += " next";
        else if (idx === 2) list_class_name += " prev";

        const $list_item = create.li({ className: list_class_name });
        const $title = create.a({
            txt: news_item.title,
            attributes: { url: news_item.url },
            events: { mouseover: stopRolling, mouseout: startRolling },
        });
        $list_item.appendChild($title);
        $container.appendChild($list_item);
    });

    return $container;
}

// 좌우 각각 배너 생성
function createBannerItem(news_data) {
    const $container = create.div({ className: "container_section-banner" });
    const $press_name = create.span({
        className: "container_section-banner-press display-bold14",
        txt: news_data.press,
    });

    $container.append($press_name, createHeadlineList(news_data.news));
    return $container;
}

// 배너 섹션 이벤트 추가
export function createBanner() {
    const $container = document.querySelector(".container_section");
    $container.append(createBannerItem(headline_news_left), createBannerItem(headline_news_right));
    startRolling();
}
