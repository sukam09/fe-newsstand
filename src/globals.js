import {
    viewReducer,
    gridReducer,
    listReducer,
    subscribeReducer,
} from "./reducers.js";

export const view_option = {
    // initalize and render option
    press: "all",
    main: "grid",
    mode: "light-mode",
    target: "all",

    //hot_topic
    hot_topic_data: [],

    observers: [],

    getState(values) {
        const state = {};
        values.forEach((value) => {
            state[value] = this[value];
        });
        return state;
    },

    subscribe(observers) {
        this.observers.push(observers);
    },

    dispatch(action, value) {
        this[value] = viewReducer(this[value], action, value);
        this.notify(value);
    },

    notify(value) {
        this.observers.forEach((observer) => observer(this[value]));
    },
};

export const grid_option = {
    press_data: {},
    page: 0,
    subscribe_page: 0,
};

export const list_option = {
    page: 0,
    subscribe_page: 0,
    category: 0,
    unrefined_new_data: {},
    news_data: {},
    category_size: 7,
    progress_interval: new Object(),
    progress_max: 200,
    progress_time: 0,
};

export const subscribe_option = {
    subscribe_press: {},
    subscribe_categories: [],
    subscribe_current: 0,
    subscribe_news_data: {},
};
