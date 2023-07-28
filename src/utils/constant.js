import { press_list } from "../../data/pressList.js";
import { list_news_data } from "../../data/list_news_data.js";

export const INTERVAL_TIME = 5000;
export const INTERVAL_SYNC = 1000;

export const PRESS_LIST_SIZE = press_list.length;
export const GRID_ROW_SIZE = 6;
export const GRID_COL_SIZE = 4;
export const GRID_SIZE = GRID_COL_SIZE * GRID_ROW_SIZE;
export const MAX_GRID_PAGENUM = Math.ceil(PRESS_LIST_SIZE / GRID_SIZE) - 1;

export const CATEGORY_SIZE = list_news_data.length;
export const CATEGORY_COUNT_ARR = list_news_data.map((category) => {
    return category.news.length;
});

export const SET_TIME = 5000;
export const START_PRESS_NUM = 1;
export const SNACK_BAR_TIME = 1000;

export const IMG_EXPAND = 1.05;
export const IMG_NORM = 1.0;

export const NEWS_CATEGORY = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];
export const ICON_COLOR = "invert(49%) sepia(83%) saturate(5417%) hue-rotate(218deg) brightness(87%) contrast(85%)";

export const PRESS_IDX = (function () {
    const tmp = [];
    for (let i = 1; i <= press_list.length; i++) tmp.push(i);
    return tmp;
})();
