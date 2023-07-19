import { press_list } from "./pressList.js";
import { list_news_data } from "./list_news_data.js";

// 구독한 언론사 리스트
export const subscribe_idx_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
export const press_idx = (function () {
    const tmp = [];
    for (let i = 1; i <= press_list.length; i++) tmp.push(i);
    return tmp;
})();

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
