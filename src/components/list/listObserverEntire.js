import { ListViewInfo } from "./listObserver.js";
import { DOM } from "../../utils/domClassName.js";
import { renderPressNews } from "../../container/listViewTemplate.js";
import { list_news_data } from "../../../data/list_news_data.js";
import { CATEGORY_COUNT_ARR, CATEGORY_SIZE, SET_TIME } from "../../utils/constant.js";

class ListViewEntire extends ListViewInfo {
    constructor() {
        super(DOM.LIST_ENTIRE_VIEW);
        this.page_num = 0;
    }

    // 정보 변경
    setValue = async function (props) {
        this.category_old = props.category_old;
        this.category_now = props.category_now;
        this.page_num = props.page_num;
    };

    // interval 재시작
    startInterval = function () {
        this.removeInterval();
        this.interval = window.setInterval(() => {
            this.changePageNum(true).then(() => {
                const $id = list_news_data[this.category_now].news[this.page_num].press_id;
                if (this.data.includes($id))
                    renderPressNews(list_news_data[this.category_now].news[this.page_num], DOM.LIST_ENTIRE_VIEW, true);
                else
                    renderPressNews(list_news_data[this.category_now].news[this.page_num], DOM.LIST_ENTIRE_VIEW, false);
            });
        }, SET_TIME);
    };

    // DOM 초기화
    initProgressBar = function (props) {
        this.setValue(props).then(() => {
            this.changeProgressBar();
            const $id = list_news_data[this.category_now].news[this.page_num].press_id;
            if (this.data.includes($id))
                renderPressNews(list_news_data[this.category_now].news[this.page_num], DOM.LIST_ENTIRE_VIEW, true);
            else renderPressNews(list_news_data[this.category_now].news[this.page_num], DOM.LIST_ENTIRE_VIEW, false);
            this.startInterval();
        });
    };

    // 페이지 다음 or 앞으로 넘기기
    changePageNum = async function (isNext) {
        if (isNext) {
            // 다음 페이지로 이동
            if (CATEGORY_COUNT_ARR[this.category_now] - 1 === this.page_num) {
                this.category_now === CATEGORY_SIZE - 1 // 마지막 페이지면 처음으로 돌아감
                    ? this.setValue({ category_old: this.category_now, category_now: 0, page_num: 0 })
                    : this.setValue({
                          category_old: this.category_now,
                          category_now: this.category_now + 1,
                          page_num: 0,
                      });
            } else {
                this.page_num += 1;
            }
        } else {
            // 이전 페이지로 이동
            if (this.page_num === 0) {
                this.category_now === 0
                    ? this.setValue({
                          category_old: this.category_now,
                          category_now: CATEGORY_SIZE - 1,
                          page_num: CATEGORY_COUNT_ARR[CATEGORY_SIZE - 1] - 1,
                      }) // 첫번째 페이지면 마지막으로 돌아감
                    : this.setValue({
                          category_old: this.category_now,
                          category_now: this.category_now - 1,
                          page_num: CATEGORY_COUNT_ARR[this.category_now - 1] - 1,
                      });
            } else {
                this.page_num -= 1;
            }
        }

        await this.changeProgressBar();
    };

    // 화살표 버튼 클릭
    onClickArrowBtn = function (is_right) {
        this.changePageNum(is_right).then(() => {
            this.resetProgressBar();
            const $id = list_news_data[this.category_now].news[this.page_num].press_id;
            if (this.data.includes($id))
                renderPressNews(list_news_data[this.category_now].news[this.page_num], DOM.LIST_ENTIRE_VIEW, true);
            else renderPressNews(list_news_data[this.category_now].news[this.page_num], DOM.LIST_ENTIRE_VIEW, false);
            this.startInterval();
        });
    };

    update = function (state) {
        this.data = state;
    };
}

export const list_view_entire = new ListViewEntire();
