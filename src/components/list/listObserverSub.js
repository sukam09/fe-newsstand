import { ListViewInfo } from "./listObserver.js";
import { DOM } from "../../utils/domClassName.js";
import { renderPressNews, createListViewMain } from "../../container/listViewTemplate.js";
import { list_news_data } from "../../../data/list_news_data.js";
import { SET_TIME } from "../../utils/constant.js";
import { isListSubscribeView } from "../layout/mainNavEvent.js";
import { init_news_data } from "../../../data/list_news_data.js";

class ListViewSub extends ListViewInfo {
    constructor() {
        super(DOM.LIST_SUBSCRIBE_VIEW);
    }

    // interval 재시작
    startInterval = function () {
        this.removeInterval();
        this.interval = window.setInterval(() => {
            this.changeCategory(true).then(() => {
                renderPressNews(this.data[this.category_now], DOM.LIST_SUBSCRIBE_VIEW);
            });
        }, SET_TIME);
    };

    // 프로그레스바 초기화
    initProgressBar = function (props) {
        this.setValue(props).then(() => {
            this.changeProgressBar();
            if (this.data.length) {
                renderPressNews(this.data[this.category_now], DOM.LIST_SUBSCRIBE_VIEW);
                this.startInterval();
            }
        });
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

    // 화살표 버튼 클릭
    onClickArrowBtn = function (is_right) {
        this.changeCategory(is_right).then(() => {
            renderPressNews(this.data[this.category_now], DOM.LIST_SUBSCRIBE_VIEW);
            this.startInterval();
        });
    };

    // 구독한 언론사 리스트 변경이 있을 때
    update = function (state, is_add) {
        this.getData(state);
        const $container =
            this.data.length === 0
                ? createListViewMain(init_news_data, DOM.LIST_SUBSCRIBE_VIEW, true, [])
                : createListViewMain(this.data[0], DOM.LIST_SUBSCRIBE_VIEW, true, this.data);

        document.querySelector(`.${this.mode}`).children[1].replaceWith($container);

        if (!isListSubscribeView()) return;
        is_add
            ? this.initProgressBar({ category_old: this.getCategoryNow(), category_now: this.data.length - 1 })
            : this.initProgressBar({
                  category_old: this.getCategoryNow() === this.data.length ? 0 : this.getCategoryNow(),
                  category_now: this.getCategoryNow() === this.data.length ? 0 : this.getCategoryNow(),
              });
    };

    // 언론사 리스트 -> 언론사 뉴스 리스트
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

export const list_view_subscribe = new ListViewSub();
