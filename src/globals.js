const view_option = {
    // initalize
    press: "all",
    main: "grid",

    //grid view
    press_data: [],
    grid_current_page: 0,

    //list view
    list_current_page: 0,
    category: 0,
    news_data: [],
    categorys: [
        "종합/경제",
        "방송/통신",
        "IT",
        "영자지",
        "스포츠/연예",
        "매거진/전문지",
        "지역",
    ],
    category_size: 7,
    progress_interval: new Object(),
    progress_max: 20,
    progress_time: 0,
};

const theme_option = {
    // initalize
    theme: "light",
    size: "medium",
};

export { view_option, theme_option };
