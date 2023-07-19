import { _sub_press_list } from "../../Store.js";
import { createListViewMain } from "../../container/listViewTemplate.js";
import { class_name } from "../../utils/domClassName.js";
import { list_news_data } from "../../../data/list_news_data.js";

class ListSubscribe {
    constructor() {
        _sub_press_list.subscribe(this);
        this.data = [];
    }

    update = function (state) {
        this.data = state;
        const $new_container = createListViewMain(this.getData()[0], class_name.SUBSCRIBE, true, this.getData());
        document.querySelector(`.list-${class_name.SUBSCRIBE}`).children[1].replaceWith($new_container);
    };

    getData = function () {
        let subscribe_news = [];
        this.data.forEach((idx) => {
            list_news_data.forEach((category) => {
                Array.from(category.news).forEach((press) => {
                    if (press.press_id === idx) {
                        subscribe_news = [...subscribe_news, press];
                    }
                });
            });
        });
        return subscribe_news;
    };
}

export const list_view_subscribe = new ListSubscribe();
