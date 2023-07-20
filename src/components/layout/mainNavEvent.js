import { progress_bar_info } from "../list/progressBarEvent.js";
import { class_name } from "../../utils/domClassName.js";
import { list_view_subscribe } from "../list/listObserver.js";

const view_info_tmp = (function () {
    let is_grid_view = true;
    let is_subscribe_view = false;

    function printState() {
        console.log(is_grid_view, is_subscribe_view);
    }

    function getIsGridView() {
        return is_grid_view;
    }

    function getIsSubscribeView() {
        return is_subscribe_view;
    }

    async function setToGridView() {
        is_grid_view = true;
        is_subscribe_view = false;
    }
    async function setToListView() {
        is_grid_view = false;
        is_subscribe_view = false;
    }
    async function setToSubscribeView() {
        is_subscribe_view = true;
    }
    async function setToEntireView() {
        is_subscribe_view = false;
    }

    function changeView() {
        const grid_icon = document.querySelector(`.${class_name.NAV_GRID_ICON}`);
        const list_icon = document.querySelector(`.${class_name.NAV_LIST_ICON}`);
        const entire_btn = document.querySelector(".nav-left_entire");
        const subscribe_btn = document.querySelector(".nav-left_subscribe");
        const grid_entire_view = document.querySelector(`.${class_name.GRID_ENTIRE_VIEW}`);
        const grid_sub_view = document.querySelector(`.${class_name.GRID_SUBSCRIBE_VIEW}`);
        const list_entire_view = document.querySelector(`.${class_name.LIST_ENTIRE_VIEW}`);
        const list_sub_view = document.querySelector(`.${class_name.LIST_SUBSCRIBE_VIEW}`);

        if (is_subscribe_view) {
            entire_btn.classList.remove("selected-bold16");
            entire_btn.classList.add("available-medium16");
            subscribe_btn.classList.remove("available-medium16");
            subscribe_btn.classList.add("selected-bold16");
        } else {
            subscribe_btn.classList.remove("selected-bold16");
            subscribe_btn.classList.add("available-medium16");
            entire_btn.classList.remove("available-medium16");
            entire_btn.classList.add("selected-bold16");
        }

        if (is_grid_view) {
            grid_icon.style.filter =
                "invert(49%) sepia(83%) saturate(5417%) hue-rotate(218deg) brightness(87%) contrast(85%)";
            list_icon.style.filter = "none";
            list_entire_view.style.display = "none";
            list_sub_view.style.display = "none";
            progress_bar_info.removeInterval();
            list_view_subscribe.removeInterval();
            is_subscribe_view
                ? ((grid_entire_view.style.display = "none"), (grid_sub_view.style.display = "flex"))
                : ((grid_entire_view.style.display = "flex"), (grid_sub_view.style.display = "none"));
        } else {
            list_icon.style.filter =
                "invert(49%) sepia(83%) saturate(5417%) hue-rotate(218deg) brightness(87%) contrast(85%)";
            grid_icon.style.filter = "none";
            grid_entire_view.style.display = "none";
            grid_sub_view.style.display = "none";
            if (is_subscribe_view) {
                progress_bar_info.removeInterval();
                list_view_subscribe.initProgressBar({
                    category_old: list_view_subscribe.getCategoryNow(),
                    category_now: 0,
                });
            } else {
                list_view_subscribe.removeInterval();
                progress_bar_info.initProgressBar({
                    category_old: progress_bar_info.getCategoryNow(),
                    category_now: 1,
                    page_num: 1,
                });
            }
            is_subscribe_view
                ? ((list_entire_view.style.display = "none"), (list_sub_view.style.display = "flex"))
                : ((list_entire_view.style.display = "flex"), (list_sub_view.style.display = "none"));
        }
    }

    return { changeView, setToSubscribeView, setToEntireView, setToGridView, setToListView, printState };
})();

export function onClickSubBtn(is_subscribe) {
    is_subscribe
        ? view_info_tmp.setToSubscribeView().then(view_info_tmp.changeView)
        : view_info_tmp.setToEntireView().then(view_info_tmp.changeView);
}

export function onClickViewBtn(is_grid) {
    is_grid
        ? view_info_tmp.setToGridView().then(view_info_tmp.changeView)
        : view_info_tmp.setToListView().then(view_info_tmp.changeView);
}
