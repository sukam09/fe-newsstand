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
  PROGRESS_SEC: 1,
};

const MODE = {
  GRID: 0,
  LIST: 1,
};

const POPUP = {
  SNACK_BAR_TIME: 5000,
};

// 글로벌 네임스페이스
const GLOBAL = {
  GRID_CURRENT_PAGE: 0,
  LIST_CURRENT_PAGE: 0,
  LIST_CURRENT_CATEGORY: CATEGORY.ECONOMY,
  CURRENT_MODE: MODE.GRID,
  NEWS_DATA: null,
  LIST_NEWS_DATA: null,
  ROLLING_NEWS: null,
  TOTAL_NEWS_NUM: 0,

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
    TODAY: document.querySelector(".today"),

    RIGHT_BTN: document.querySelector(".right-btn"),
    LEFT_BTN: document.querySelector(".left-btn"),
    LIST_BNT: document.querySelector(".list-btn"),
    GRID_BTN: document.querySelector(".grid-btn"),
    SNACK_BAR: document.querySelector(".snack-bar"),
    ALERT: document.querySelector(".alert"),
    ALERT_YES_BTN: document.querySelector(".yes-btn"),
    ALERT_NO_BTN: document.querySelector(".no-btn"),

    GRID_VIEW: document.querySelector(".grid"),
    LIST_VIEW: document.querySelector(".list-view"),

    FIRST_NEWS: document.querySelector("#first-news"),
    SECOND_NEWS: document.querySelector("#second-news"),

    FIELD_TAB: document.querySelector(".field-tab"),
    PROGRESS_BAR: document.querySelector(".progress-bar"),
    NAV_ECONOMY: document.querySelector(".nav-economy"),
    NAV_BROADCAST: document.querySelector(".nav-broadcast"),
    NAV_IT: document.querySelector(".nav-it"),
    NAV_ENGLISH: document.querySelector(".nav-english"),
    NAV_SPORTS: document.querySelector(".nav-sports"),
    NAV_MAGAZINE: document.querySelector(".nav-magazine"),
    NAV_LOCAL: document.querySelector(".nav-local"),

    LIST_PRESS_ICON: document.querySelector(".list-press-icon"),
    EDIT_DATE: document.querySelector(".edit-date"),
    MAIN_NEWS_THUMBNAIL: document.querySelector(".main-news-thumbnail"),
    MANI_NEWS_TITLE: document.querySelector(".main-news-title"),
    SUB_NEWS_TITLE_ALL: document.querySelectorAll(".sub-news-title"),
    CAPTION: document.querySelector(".caption"),
  },
};

export { ICON, JSONDATA, GRID, ROLLING, BTN, CATEGORY, LIST, MODE, POPUP, GLOBAL };
