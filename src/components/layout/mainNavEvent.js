import { _mode } from "../../Store.js";
import { ICON_COLOR } from "../../utils/constant.js";
import { DOM } from "../../utils/domClassName.js";
import { list_view_entire } from "../list/listObserverEntire.js";
import { list_view_subscribe } from "../list/listObserverSub.js";

const view_info = (function () {
    let is_grid_view = true;
    let is_subscribe_view = false;

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

    function changeFont(cont1, cont2) {
        cont1.classList.replace("selected-bold16", "available-medium16");
        cont2.classList.replace("available-medium16", "selected-bold16");
    }
    function changeIcon(cont1, cont2) {
        cont1.style.filter = ICON_COLOR;
        cont2.style.filter = "none";
    }
    function hideView(conts) {
        conts.forEach((cont) => (cont.style.display = "none"));
    }
    function replaceView(cont1, cont2) {
        cont1.style.display = "none";
        cont2.style.display = "flex";
    }

    function changeView(is_init) {
        const grid_icon = document.querySelector(`.${DOM.NAV_GRID_ICON}`);
        const list_icon = document.querySelector(`.${DOM.NAV_LIST_ICON}`);
        const entire_btn = document.querySelector(`.${DOM.NAV_ENTIRE}`);
        const subscribe_btn = document.querySelector(`.${DOM.NAV_SUBSCRIBE}`);
        const grid_entire = document.querySelector(`.${DOM.GRID_ENTIRE_VIEW}`);
        const grid_sub = document.querySelector(`.${DOM.GRID_SUBSCRIBE_VIEW}`);
        const list_entire = document.querySelector(`.${DOM.LIST_ENTIRE_VIEW}`);
        const list_sub = document.querySelector(`.${DOM.LIST_SUBSCRIBE_VIEW}`);

        is_subscribe_view ? changeFont(entire_btn, subscribe_btn) : changeFont(subscribe_btn, entire_btn);
        is_grid_view ? changeIcon(grid_icon, list_icon) : changeIcon(list_icon, grid_icon);

        if (is_grid_view) {
            hideView([list_entire, list_sub]);
            list_view_entire.removeInterval();
            list_view_subscribe.removeInterval();
            is_subscribe_view ? replaceView(grid_entire, grid_sub) : replaceView(grid_sub, grid_entire);
        } else {
            hideView([grid_entire, grid_sub]);
            if (is_subscribe_view) {
                list_view_entire.removeInterval();
                is_init &&
                    list_view_subscribe.initProgressBar({
                        category_old: list_view_subscribe.getCategoryNow(),
                        category_now: 0,
                    });
            } else {
                list_view_subscribe.removeInterval();
                list_view_entire.initProgressBar({
                    category_old: list_view_entire.getCategoryNow(),
                    category_now: 0,
                    page_num: 0,
                });
            }
            is_subscribe_view ? replaceView(list_entire, list_sub) : replaceView(list_sub, list_entire);
        }
    }

    return {
        changeView,
        setToSubscribeView,
        setToEntireView,
        setToGridView,
        setToListView,
        getIsGridView,
        getIsSubscribeView,
    };
})();

export function onClickSubBtn(is_subscribe, is_init) {
    _mode.setState({ is_grid_view: null, is_sub_view: is_subscribe });
    is_subscribe
        ? view_info.setToSubscribeView().then(() => {
              view_info.changeView(is_init);
          })
        : view_info.setToEntireView().then(() => {
              view_info.changeView(is_init);
          });
}

export function onClickViewBtn(is_grid) {
    _mode.setState({ is_grid_view: is_grid, is_sub_view: null });
    is_grid
        ? view_info.setToGridView().then(view_info.changeView)
        : view_info.setToListView().then(view_info.changeView);
}

export function isListSubscribeView() {
    if (!view_info.getIsGridView() && view_info.getIsSubscribeView()) return true;
    return false;
}
