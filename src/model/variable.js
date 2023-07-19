const PATH = {
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
  NEWS_DATA: "DATA/News_Data.json",
  ROLLING_NEWS: "/Data/Rolling_News.json",
};

const CONSTANT = {
  ROLLING_NEWS_NUM: 5,
  ROLLING_DELAY_GAP: 1000,
  ROLLING_TIME: 5000,

  GRID_ROW_NUM: 4,
  GRID_COL_NUM: 6,
  GRID_NEWS_NUM: 24,
  GRID_MAX_PAGE: 3,

  LIST_SUBNEWS_NUM: 6,

  SNACK_BAR_TIME: 5000,
};

const STATE = {
  MOVE_GRID_LEFT: 1,
  MOVE_GRID_RIGHT: 2,
  MOVE_GRID_ALL: 3,
  MOVE_GRID_SUB: 4,
  MOVE_LIST_ALL: 5,
  MOVE_LIST_SUB: 6,
  SUBSCRIBE_NEWS: 7,
  UNSUBSCRIBE_NEWS: 8,
  SHOW_SNACKBAR: 9,
  SHOW_ALERT: 10,
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

const MODE = {
  GRID_ALL: 1,
  GRID_SUB: 2,
  LIST_ALL: 3,
  LIST_SUB: 4,
};

const GLOBAL = {
  CURRENT_MODE: MODE.GRID_ALL,

  GRID_CURRENT_PAGE: 0,
  LIST_CURRENT_PAGE: 0,
  LIST_CURRENT_CATEGORY: CATEGORY.ECONOMY,

  NEWS_DATA: null,
  LIST_NEWS_DATA: null,
  TOTAL_NEWS_NUM: 0,

  SUBSCRIBE_NEWS_DATA: [],
  SUBSCRIBE_NEWS_NUM: 0,

  ROLLING_NEWS: [],

  TEMP_TARGET: null,

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
};

export { PATH, CONSTANT, STATE, CATEGORY, MODE, GLOBAL };
