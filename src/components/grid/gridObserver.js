import { GRID_SIZE, PRESS_IDX } from "../../utils/constant.js";
import { press_list } from "../../../data/pressList.js";
import { DOM } from "../../utils/domClassName.js";
import { createMainGrid } from "../../container/gridViewTemplate.js";
import { _mode, _sub_press_list } from "../../Store.js";
import { dark_mode } from "../layout/darkModeEvent.js";

class gridViewInfo {
    constructor(data, isSub) {
        _sub_press_list.subscribe(this);
        // _mode.subscribe(this);
        this.current_page = 0;
        this.data = data;
        this.left_btn_name = `.${DOM.GRID_LEFT_BTN}-${isSub}`;
        this.right_btn_name = `.${DOM.GRID_RIGHT_BTN}-${isSub}`;
        this.class_name = `.grid-${isSub}`;
    }

    getCurrentPage = function () {
        return this.current_page;
    };

    getMaxPage = function () {
        return Math.ceil(this.data.length / GRID_SIZE) - 1;
    };

    getData = function () {
        return this.data.map((idx) => {
            return press_list[idx - 1];
        });
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

// grid view page 정보 - 전체 언론사 (관찰자)
class gridViewEntire extends gridViewInfo {
    // 구독한 언론사 리스트가 변경될 경우 뷰 업데이트
    update = function (state) {
        createMainGrid(this, false, dark_mode.getMode());
    };

    updateMode = function (state) {
        console.log("grid entire");
    };
}

// grid view page 정보 - 내가 구독한 언론사 (관찰자)
class gridViewSub extends gridViewInfo {
    // 구독한 언론사 리스트가 변경될 경우 뷰 업데이트
    update = function (state) {
        this.data = state;
        if (this.getCurrentPage() > this.getMaxPage() && this.getMaxPage() >= 0) {
            this.setPageNum(this.getMaxPage());
        }
        createMainGrid(this, false, dark_mode.getMode());
    };

    setPageNum = function (page_num) {
        this.current_page = page_num;
    };

    updateMode = function (state) {
        console.log("grid sub");
    };
}

export const grid_view_info_entire = new gridViewEntire(
    PRESS_IDX.slice().sort(() => Math.random() - 0.5),
    DOM.ENTIRE
);
export const grid_view_info_sub = new gridViewSub([], DOM.SUBSCRIBE);
