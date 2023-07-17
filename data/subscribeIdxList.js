import { press_list } from "./pressList.js";
import { list_news_data } from "./list_news_data.js";

const subscribe_idx_list = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    32, 33, 34, 35, 36, 37, 38, 39, 40,
];

export const subscribe_press_list = (function () {
    return press_list.filter((press) => {
        if (subscribe_idx_list.includes(press.id)) return press;
    });
})();

export const subscribe_news_list = (function () {
    let subscribe_news = [];
    list_news_data.forEach((category) => {
        Array.from(category.news).forEach((press) => {
            if (subscribe_idx_list.includes(press.press_id)) {
                subscribe_news = [...subscribe_news, press];
            }
        });
    });
    return subscribe_news;
})();
