import { createMainGrid } from "../../container/gridViewTemplate.js";
import { DOM } from "../../utils/domClassName.js";
import { grid_view_info_entire, grid_view_info_sub } from "../grid/gridObserver.js";

export const dark_mode = (function () {
    let isDark = false;

    function changeMode() {
        isDark = !isDark;
    }

    function getMode() {
        return isDark;
    }

    return { changeMode, getMode };
})();

const renderMode = () => {
    const $body = document.querySelector("body");
    const isDark = dark_mode.getMode();
    createMainGrid(grid_view_info_entire, false, isDark);
    createMainGrid(grid_view_info_sub, false, isDark);
    isDark ? $body.classList.add(DOM.DARK) : $body.classList.remove(DOM.DARK);
};

export const onClickModeBtn = () => {
    dark_mode.changeMode();
    renderMode();
    return dark_mode.getMode();
};
