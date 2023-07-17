import { GRID_SIZE } from "../../utils/constant.js";
import { press_list } from "../../../data/pressList.js";
import { class_name } from "../../utils/domClassName.js";
import { subscribe_press_list } from "../../../data/subscribeIdxList.js";

class gridViewInfo {
    constructor(data, isSub) {
        this.current_page = 0;
        this.data = data;
        this.left_btn_name = `.${class_name.GRID_LEFT_BTN}-${isSub}`;
        this.right_btn_name = `.${class_name.GRID_RIGHT_BTN}-${isSub}`;
        this.class_name = `.grid-${isSub}`;
    }

    getCurrentPage = function () {
        return this.current_page;
    };

    getMaxPage = function () {
        return Math.ceil(this.data.length / GRID_SIZE) - 1;
    };

    getData = function () {
        return this.data;
    };

    getLeftBtn = function () {
        return this.left_btn_name;
    };

    getRightBtn = function () {
        return this.right_btn_name;
    };

    getClassName = function () {
        return this.class_name;
    };

    setPage = function (isRight) {
        isRight ? (this.current_page += 1) : (this.current_page -= 1);
    };
}

// grid view page 정보 (main)
export const grid_view_info_entire = new gridViewInfo(
    press_list.slice().sort(() => Math.random() - 0.5),
    class_name.ENTIRE
);
// grid view page 정보 (sub)
export const grid_view_info_sub = new gridViewInfo(subscribe_press_list, class_name.SUBSCRIBE);

// 페이지 넘길 때 첫번째 마지막 페이지 화살표 숨김
export function toggleArrow(grid_view_info) {
    const left_btn = document.querySelector(grid_view_info.getLeftBtn());
    const right_btn = document.querySelector(grid_view_info.getRightBtn());
    const current_page = grid_view_info.getCurrentPage();
    const max_page = grid_view_info.getMaxPage();
    if (current_page === 0) left_btn.style.visibility = "hidden";
    if (current_page === max_page) right_btn.style.visibility = "hidden";
    if (current_page !== 0 && current_page !== max_page) {
        left_btn.style.visibility = "visible";
        right_btn.style.visibility = "visible";
    }
}
