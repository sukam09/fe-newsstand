import { SET_TIME } from "../../utils/constant.js";
import { list_news_data } from "../../../data/list_news_data.js";
import { CATEGORY_SIZE, CATEGORY_COUNT_ARR } from "../../utils/constant.js";
import { renderPressNews } from "../../container/listViewTemplate.js";
import { class_name } from "../../utils/domClassName.js";
import { _sub_press_list } from "../../Store.js";

class ListEntire {
    constructor() {
        this.interval = 0;
        this.category_old = 1;
        this.category_now = 1;
        this.page_num = 1;
        this.data = [];
        _sub_press_list.subscribe(this);
    }

    // interval 초기화
    removeInterval = function () {
        clearInterval(this.interval);
    };

    // interval 재시작
    startInterval = function () {
        this.removeInterval();
        this.interval = window.setInterval(() => {
            this.changePageNum(true).then(() => {
                const $id = list_news_data[this.category_now - 1].news[this.page_num - 1].press_id;
                if (this.data.includes($id))
                    renderPressNews(
                        list_news_data[this.category_now - 1].news[this.page_num - 1],
                        class_name.ENTIRE,
                        true
                    );
                else
                    renderPressNews(
                        list_news_data[this.category_now - 1].news[this.page_num - 1],
                        class_name.ENTIRE,
                        false
                    );
            });
        }, SET_TIME);
    };

    // 변수 값 변경
    setValue = async function (props) {
        if (props.category_old) this.category_old = props.category_old;
        if (props.category_now) this.category_now = props.category_now;
        if (props.page_num) this.page_num = props.page_num;
    };

    // 현재 카테고리 번호 반환
    getCategoryNow = function () {
        return this.category_now;
    };

    // 페이지 다음 앞으로 넘기기
    changePageNum = async function (isNext) {
        if (isNext) {
            // 다음 페이지로 이동
            if (CATEGORY_COUNT_ARR[this.category_now - 1] === this.page_num) {
                this.category_now === CATEGORY_SIZE
                    ? this.setValue({ category_old: this.category_now, category_now: 1, page_num: 1 }) // 마지막 페이지면 처음으로 돌아감
                    : this.setValue({
                          category_old: this.category_now,
                          category_now: this.category_now + 1,
                          page_num: 1,
                      });
            } else {
                this.page_num += 1;
            }
        } else {
            // 이전 페이지로 이동
            if (this.page_num === 1) {
                this.category_now === 1
                    ? this.setValue({
                          category_old: this.category_now,
                          category_now: CATEGORY_SIZE,
                          page_num: CATEGORY_COUNT_ARR[CATEGORY_SIZE - 1],
                      }) // 첫번째 페이지면 마지막으로 돌아감
                    : this.setValue({
                          category_old: this.category_now,
                          category_now: this.category_now - 1,
                          page_num: CATEGORY_COUNT_ARR[this.category_now - 2],
                      });
            } else {
                this.page_num -= 1;
            }
        }

        await this.changeProgressBar();
    };

    // DOM 초기화
    initProgressBar = function (props) {
        this.setValue(props).then(() => {
            this.changeProgressBar();
            const $id = list_news_data[this.category_now - 1].news[this.page_num - 1].press_id;
            if (this.data.includes($id))
                renderPressNews(list_news_data[this.category_now - 1].news[this.page_num - 1], class_name.ENTIRE, true);
            else
                renderPressNews(
                    list_news_data[this.category_now - 1].news[this.page_num - 1],
                    class_name.ENTIRE,
                    false
                );
            this.startInterval();
        });
    };

    // DOM 변경 - progressbar 이동
    changeProgressBar = function () {
        const list_view_btn = document.querySelector(".list-entire").querySelectorAll(".list-view-btn");

        const old_tab_item = list_view_btn[this.category_old - 1].querySelector(".tab-item");
        const old_btn_tab_item = list_view_btn[this.category_old - 1].querySelector(".tab-item-clicked");
        const new_tab_item = list_view_btn[this.category_now - 1].querySelector(".tab-item");
        const new_btn_tab_item = list_view_btn[this.category_now - 1].querySelector(".tab-item-clicked");

        old_tab_item.style.display = "flex";
        old_btn_tab_item.style.display = "none";

        new_tab_item.style.display = "none";
        new_btn_tab_item.style.display = "flex";
        new_btn_tab_item.querySelector(".btn-tab-count-present").innerHTML = this.page_num;
    };

    // DOM 변경 - progressbar 변경
    resetProgressBar = async function () {
        const progress_list = document.querySelector(".list-entire").querySelectorAll(".btn-tab-progress");
        progress_list[this.category_now - 1].classList.remove("btn-tab-progress");
        progress_list[this.category_now - 1].offsetWidth;
        progress_list[this.category_now - 1].classList.add("btn-tab-progress");
    };

    // 화살표 버튼 클릭
    onClickArrowBtn = function (is_right) {
        this.changePageNum(is_right).then(() => {
            this.resetProgressBar();
            const $id = list_news_data[this.category_now - 1].news[this.page_num - 1].press_id;
            if (this.data.includes($id))
                renderPressNews(list_news_data[this.category_now - 1].news[this.page_num - 1], class_name.ENTIRE, true);
            else
                renderPressNews(
                    list_news_data[this.category_now - 1].news[this.page_num - 1],
                    class_name.ENTIRE,
                    false
                );
            this.startInterval();
        });
    };

    update = function (state) {
        this.data = state;
    };

    // getData = function (state) {
    //     let tmp_list = [];
    //     state.forEach((idx) => {
    //         list_news_data.forEach((category) => {
    //             Array.from(category.news).forEach((press) => {
    //                 if (press.press_id === idx) {
    //                     tmp_list = [...tmp_list, press];
    //                 }
    //             });
    //         });
    //     });
    //     this.data = tmp_list;
    // };
}

export const list_view_entire = new ListEntire();
