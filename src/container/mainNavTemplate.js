import { ICON_LIST_VIEW_URL, ICON_GRID_VIEW_URL } from "../utils/iconURL.js";
import {
    onClickEntire,
    onClickGrid,
    onClickList,
    onClickSubBtn,
    onClickSubscribe,
    onClickViewBtn,
} from "../components/layout/mainNavEvent.js";
import { create } from "../utils/createElement.js";
import { DOM } from "../utils/domClassName.js";
import { onClickModeBtn } from "../components/layout/darkModeEvent.js";

// 메인 네비게이션 왼쪽 사이드 생성
function createMainNavLeft() {
    const $container = create.div({ className: `${DOM.MAIN_NAV}-left` });
    const $btn_entire = create.span({
        className: "nav-left_entire selected-bold16",
        txt: "전체 언론사",
        events: { click: onClickEntire },
    });
    const $btn_subscribe = create.span({
        className: "nav-left_subscribe available-medium16",
        txt: "내가 구독한 언론사",
        events: { click: onClickSubscribe },
    });
    $container.append($btn_entire, $btn_subscribe);

    return $container;
}

// 메인 네비게이션 오른쪽 사이드 생성
function createMainNavRight() {
    const $container = create.div({ className: `${DOM.MAIN_NAV}-right` });
    const $btn_dark = create.button({
        className: "nav-right_dark_btn",
        txt: "다크 모드",
        events: { click: () => ($btn_dark.innerHTML = onClickModeBtn() ? "라이트 모드" : "다크 모드") },
    });

    const $btn_list = create.img({
        className: "nav-right_list_icon icon",
        attributes: { src: ICON_LIST_VIEW_URL, alt: "icon-list-view" },
        events: { click: onClickList },
    });

    const $btn_grid = create.img({
        className: "nav-right_grid_icon icon",
        attributes: { src: ICON_GRID_VIEW_URL, alt: "icon-grid-view" },
        events: { click: onClickGrid },
    });

    $container.append($btn_dark, $btn_list, $btn_grid);
    return $container;
}

// 메인 네비게이션 바 생성
export function createMainNav() {
    const $container = document.querySelector(`.${DOM.MAIN_NAV}`);
    $container.append(createMainNavLeft(), createMainNavRight());
}
