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

// 글로벌 네임스페이스
const GLOBAL = {
  grid_cur_page: 0,
  news_icon: null,
  rolling_news: null,
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
  },
};

export { ICON, JSONDATA, GRID, ROLLING, BTN, GLOBAL };
