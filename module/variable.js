const ICON = {
  GRID_BTN_BLUE: "/icons/GridButton-Blue.svg",
  GRID_BTN: "/icons/GridButton.svg",
  LIST_BTN_BLUE: "/icons/ListButton-Blue.svg",
  LIST_BTN: "/icons/ListButton.svg",
  LEFT_BTN: "/icons/LeftButton.svg",
  RIGHT_BTN: "/icons/RightButton.svg",
  NEWS_LOGO: "/icons/NewsLogo.svg",
  ARROW: "/icons/SymbolArrow.svg",
  DIVISION: "/icons/SymbolDivision.svg",
  PLUS: "/icons/SymbolPlus.svg",
  X: "/icons/SymbolX.svg",
};

const JSONDATA = {
  NEWS_DATA: "DATA/News_Data.json",
  ROLLING_NEWS: "/Data/Rolling_News.json",
};

const GRID = {
  ROW_NUM: 4,
  COL_NUM: 6,
  NEWS_NUM: 24,
  MAX_PAGE: 3,
  MIN_PAGE: 0,
};

const ROLLING = {
  LEFT: 0,
  RIGHT: 1,
  NEWS_NUM: 5,
  DELAY_TIME: 5000,
  DELAY_GAP: 1000,
};

const BTN = {
  NEXT_PAGE: +1,
  PREV_PAGE: -1,
  GRID_VIEW: 0,
  LIST_VIEW: 1,
};

const CATEGORY = {
  ECONOMY: "종합/경제",
  BROADCAST: "방송/통신",
  IT: "IT",
  ENGLISH: "영자지",
  SPORTS: "스포츠/연예",
  MAGAZINE: "매거진/전문지",
  LOCAL: "지역",
};

const LIST = {
  SUBTITLENUM: 6,
};

const MODE = {
  GRID: 0,
  LIST: 1,
};

// 글로벌 네임스페이스
const GLOBAL = {
  grid_cur_page: 0,
  list_cur_page: 0,
  list_cur_category: CATEGORY.ECONOMY,
  cur_mode: MODE.GRID,
  news_data: null,
  list_news_data: null,
  rolling_news: null,
  total_news_num: 0,

  CATEGORY_NUM: {
    ECONOMY: 0,
    BROADCAST: 0,
    IT: 0,
    ENGLISH: 0,
    SPORTS: 0,
    MAGAZINE: 0,
    LOCAL: 0,
  },

  CATEGORY_START_INDEX: {
    ECONOMY: 0,
    BROADCAST: 0,
    IT: 0,
    ENGLISH: 0,
    SPORTS: 0,
    MAGAZINE: 0,
    LOCAL: 0,
  },

  DOM: {
    right_btn: document.querySelector(".right-btn"),
    left_btn: document.querySelector(".left-btn"),
    list_btn: document.querySelector(".list-btn"),
    grid_btn: document.querySelector(".grid-btn"),
    grid_view: document.querySelector(".grid"),
    list_view: document.querySelector(".list-view"),
    today: document.querySelector(".today"),
    first_news: document.querySelector("#first-news"),
    second_news: document.querySelector("#second-news"),
    list_press_icon: document.querySelector(".list-press-icon"),
    edit_date: document.querySelector(".edit-date"),
    main_news_title: document.querySelector(".main-news-title"),
    main_news_thumbnail: document.querySelector(".main-news-thumbnail"),
    sub_news_title: document.querySelectorAll(".sub-news-title"),
    caption: document.querySelector(".caption"),
    field_tab: document.querySelector(".field-tab"),
    progress_bar: document.querySelector(".progress-bar"),
    nav_economy: document.querySelector(".nav-economy"),
    nav_broadcast: document.querySelector(".nav-broadcast"),
    nav_it: document.querySelector(".nav-it"),
    nav_english: document.querySelector(".nav-english"),
    nav_sports: document.querySelector(".nav-sports"),
    nav_magazine: document.querySelector(".nav-magazine"),
    nav_local: document.querySelector(".nav-local"),
  },
};

export { ICON, JSONDATA, GRID, ROLLING, BTN, CATEGORY, LIST, MODE, GLOBAL };
