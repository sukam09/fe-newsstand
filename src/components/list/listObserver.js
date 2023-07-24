import { _sub_press_list } from "../../Store.js";
import { DOM } from "../../utils/domClassName.js";

export class ListViewInfo {
    constructor(mode) {
        _sub_press_list.subscribe(this); // observer 추가
        this.category_old = 0;
        this.category_now = 0;
        this.interval = 0;
        this.data = [];
        this.mode = mode;
    }

    // interval 초기화
    removeInterval = function () {
        clearInterval(this.interval);
    };

    // 카테고리 값 설정
    setValue = async function (props) {
        this.category_old = props.category_old;
        this.category_now = props.category_now;
    };

    // 현재 카테고리 번호 반환
    getCategoryNow = function () {
        return this.category_now;
    };

    // DOM 변경 - progressBar 이동
    changeProgressBar = function () {
        const list_view_btn = document.querySelector(`.${this.mode}`).querySelectorAll(".list-view-btn");
        if (!list_view_btn.length) return;

        const old_tab_item = list_view_btn[this.category_old].querySelector(`.${DOM.TAB_ITEM}`);
        const old_btn_tab_item = list_view_btn[this.category_old].querySelector(`.${DOM.TAB_CLICKED}`);
        const now_tab_item = list_view_btn[this.category_now].querySelector(`.${DOM.TAB_ITEM}`);
        const now_btn_tab_item = list_view_btn[this.category_now].querySelector(`.${DOM.TAB_CLICKED}`);

        old_tab_item.style.display = "flex";
        old_btn_tab_item.style.display = "none";

        now_tab_item.style.display = "none";
        now_btn_tab_item.style.display = "flex";
        if (this.mode === DOM.LIST_ENTIRE_VIEW)
            now_btn_tab_item.querySelector(".btn-tab-count-present").innerHTML = this.page_num + 1;
    };

    // DOM 변경 = progressbar 초기화  (아직 다 안 끝났을 때)
    resetProgressBar = async function () {
        const progress_list = document.querySelector(`.${this.mode}`).querySelectorAll(".btn-tab-progress");
        progress_list[this.category_now].classList.remove("btn-tab-progress");
        progress_list[this.category_now].offsetWidth;
        progress_list[this.category_now].classList.add("btn-tab-progress");
    };
}
