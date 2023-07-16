import { ICON_NEWSPAPER_URL } from "../utils/iconURL.js";
import { showTodayDate } from "../components/common/date.js";
import { create } from "../utils/createElement.js";

// 헤더 왼쪽 사이드 생성
function createHeaderLeft() {
    const $container = create.div({ className: "header-left display-bold24" });
    const $img = create.img({
        className: "header-left-icon-newspaper icon",
        attributes: { src: ICON_NEWSPAPER_URL, alt: "icon-newspaper" },
    });
    const $title = create.span({ txt: "뉴스스탠드" });
    $container.append($img, $title);
    return $container;
}

// 헤더 오른쪽 사이드 생성
function createHeaderRight() {
    const $container = create.div({ className: "header-right", txt: showTodayDate() });
    return $container;
}

// 헤더 생성
export function createHeader() {
    const $container = document.querySelector(".container_header");
    $container.append(createHeaderLeft(), createHeaderRight());
}
