import { MAX_GRID_PAGENUM } from "../../utils/constant.js";
import { press_list } from "../../../data/pressList.js";

// grid view page 정보
export const grid_view_info = {
    current_page: 0,
    shuffle_press_list: press_list.slice().sort(() => Math.random() - 0.5),

    // 클래스 or return 할 수 있도록 바꾸기!
    getCurrentPage: function () {
        return this.current_page;
    },
    setNextPage: function () {
        this.current_page += 1;
    },
    setPrevPage: function () {
        this.current_page -= 1;
    },
    getShuffleList: function () {
        return this.shuffle_press_list;
    },
};

// 페이지 넘길 때 첫번째 마지막 페이지 화살표 숨김
export function toggleArrow() {
    const left_btn = document.querySelector(".grid_view_btn-left");
    const right_btn = document.querySelector(".grid_view_btn-right");

    switch (grid_view_info.current_page) {
        case 0:
            left_btn.style.visibility = "hidden";
            right_btn.style.visibility = "visible";
            break;
        case MAX_GRID_PAGENUM:
            left_btn.style.visibility = "visible";
            right_btn.style.visibility = "hidden";
            break;
        default:
            left_btn.style.visibility = "visible";
            right_btn.style.visibility = "visible";
    }
}
