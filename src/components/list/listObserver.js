import { _sub_press_list } from "../../Store.js";
import { createListViewMain, createPressNews, renderPressNews } from "../../container/listViewTemplate.js";
import { class_name } from "../../utils/domClassName.js";
import { list_news_data } from "../../../data/list_news_data.js";
import { SET_TIME } from "../../utils/constant.js";
import { isListSubscribe } from "../layout/mainNavEvent.js";

class ListSubscribe {
    constructor() {
        _sub_press_list.subscribe(this);
        this.category_old = 0;
        this.category_now = 0;
        this.interval = 0;
        this.data = [];
    }

    // interval 초기화
    removeInterval = function () {
        clearInterval(this.interval);
    };

    // interval 재시작
    startInterval = function () {
        this.removeInterval();
        this.interval = window.setInterval(() => {
            this.changeCategory(true).then(() => {
                renderPressNews(this.data[this.category_now], class_name.SUBSCRIBE);
            });
        }, SET_TIME);
    };

    // 카테고리 값 설정
    setValue = async function (props) {
        this.category_old = props.category_old;
        this.category_now = props.category_now;
    };

    // ❌ 삭제!!
    printValue = function () {
        console.log(this.category_old, this.category_now);
    };

    // 카테고리 넘기기
    changeCategory = async function (is_right) {
        const data_len = this.data.length - 1;
        if (is_right) {
            this.category_now === data_len
                ? this.setValue({ category_old: this.category_now, category_now: 0 })
                : this.setValue({ category_old: this.category_now, category_now: this.category_now + 1 });
        } else {
            this.category_now === 0
                ? this.setValue({ category_old: this.category_now, category_now: data_len })
                : this.setValue({ category_old: this.category_now, category_now: this.category_now - 1 });
        }

        await this.changeProgressBar();
    };

    // 현재 카테고리 idx
    getCategoryNow = function () {
        return this.category_now;
    };

    // 프로그레스바 초기화
    initProgressBar = function (props) {
        this.setValue(props).then(() => {
            this.changeProgressBar();
            renderPressNews(this.data[this.category_now], class_name.SUBSCRIBE);
            this.startInterval();
        });
    };

    // DOM 변경 - progressBar 이동
    changeProgressBar = function () {
        const list_view_btn = document.querySelector(".list-subscribe").querySelectorAll(".list-view-btn");
        if (!list_view_btn.length) return;

        const old_tab_item = list_view_btn[this.category_old].querySelector(".tab-item");
        const old_btn_tab_item = list_view_btn[this.category_old].querySelector(".tab-item-clicked");
        const now_tab_item = list_view_btn[this.category_now].querySelector(".tab-item");
        const now_btn_tab_item = list_view_btn[this.category_now].querySelector(".tab-item-clicked");

        old_tab_item.style.display = "flex";
        old_btn_tab_item.style.display = "none";

        now_tab_item.style.display = "none";
        now_btn_tab_item.style.display = "flex";
    };

    // DOM 변경 = progressbar 초기화  (아직 다 안 끝났을 때)
    resetProgressBar = async function () {
        const progress_list = document.querySelector(".list-subscribe").querySelectorAll(".btn-tab-progress");
        progress_list[this.category_now].classList.remove("btn-tab-progress");
        progress_list[this.category_now].offsetWidth;
        progress_list[this.category_now].classList.add("btn-tab-progress");
    };

    onClickArrowBtn = function (is_right) {
        this.changeCategory(is_right).then(() => {
            renderPressNews(this.data[this.category_now], class_name.SUBSCRIBE);
            this.startInterval();
        });
    };

    update = function (state) {
        this.getData(state);
        const $new_container = createListViewMain(this.data[0], class_name.SUBSCRIBE, true, this.data);
        document.querySelector(`.list-${class_name.SUBSCRIBE}`).children[1].replaceWith($new_container);
        this.onClickArrowBtn(true);
    };

    getData = function (state) {
        let tmp_list = [];
        state.forEach((idx) => {
            list_news_data.forEach((category) => {
                Array.from(category.news).forEach((press) => {
                    if (press.press_id === idx) {
                        tmp_list = [...tmp_list, press];
                    }
                });
            });
        });
        this.data = tmp_list;
    };
}

export const list_view_subscribe = new ListSubscribe();
