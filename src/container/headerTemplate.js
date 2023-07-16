import * as elem from "../utils/createElement.js";
import { ICON_NEWSPAPER_URL } from "../utils/iconURL.js";
import { showTodayDate } from "../components/common/date.js";

// 헤더 왼쪽 사이드 생성
function createHeaderLeft() {
    const container = elem.createDiv({ className: "header-left display-bold24" });
    const img = elem.createImg({
        className: "header-left-icon-newspaper icon",
        src: ICON_NEWSPAPER_URL,
        alt: "icon-newspaper",
    });
    const title = elem.createSpan({ txt: "뉴스스탠드" });
    elem.createChild(container, [img, title]);
    return container;
}

// 헤더 오른쪽 사이드 생성
function createHeaderRight() {
    const container = elem.createDiv({ className: "header-right", txt: showTodayDate() });
    return container;
}

// 헤더 생성
export function createHeader() {
    const container = document.querySelector(".container_header");
    elem.createChild(container, [createHeaderLeft(), createHeaderRight()]);
}
