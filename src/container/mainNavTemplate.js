import * as elem from "../utils/createElement.js";
import { ICON_LIST_VIEW_URL, ICON_GRID_VIEW_URL } from "../utils/iconURL.js";
import { viewIconClickEvent } from "../components/layout/mainNavEvent.js";

// 메인 네비게이션 왼쪽 사이드 생성
function createMainNavLeft() {
    const container = elem.createDiv({ className: "container_main_nav-left" });
    const btn_entire = elem.createSpan({ className: "nav-left selected-bold16", txt: "전체 언론사" });
    const btn_subscribe = elem.createSpan({ className: "nav-left available-medium16", txt: "내가 구독한 언론사" });
    elem.createChild(container, [btn_entire, btn_subscribe]);
    return container;
}

// 메인 네비게이션 오른쪽 사이드 생성
function createMainNavRight() {
    const container = elem.createDiv({ className: "container_main_nav-right" });
    const btn_list = elem.createImg({
        className: "nav-right_list_icon icon",
        src: ICON_LIST_VIEW_URL,
        alt: "icon-list-view",
    });
    btn_list.addEventListener("click", () => {
        viewIconClickEvent(false);
    });

    const btn_grid = elem.createImg({
        className: "nav-right_grid_icon icon",
        src: ICON_GRID_VIEW_URL,
        alt: "icon-grid-view",
    });
    btn_grid.addEventListener("click", () => {
        viewIconClickEvent(true);
    });

    elem.createChild(container, [btn_list, btn_grid]);
    return container;
}

// 메인 네비게이션 바 생성
export function createMainNav() {
    const container = document.querySelector(".container_main_nav");
    elem.createChild(container, [createMainNavLeft(), createMainNavRight()]);
}
