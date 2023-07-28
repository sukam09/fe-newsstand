import Store from "../utils/Store.js";
import { MY, mainStore } from "./MainStore.js";
import { fetchNews, fetchPress } from "../api/fetchNews.js";

export const pressNews = await fetchPress();
export const categoryNews = await fetchNews();

export const FIRST_CATEGORY = 0;
export const FIRST_PAGE = 1;
export const FIRST_LASTPAGE =
  categoryNews[FIRST_CATEGORY][FIRST_PAGE - 1].materials.length;

const initState = {
  category: FIRST_CATEGORY,
  page: FIRST_PAGE,
  lastPage: FIRST_LASTPAGE,
};

// dispatch에서 사용될 type들을 정의해준다.
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_PAGE = "SET_PAGE";
export const SET_LASTPAGE = "SET_LASTPAGE";
export const SET_LIST = "SET_LIST";

export const timer = [];

export const cancelAnimation = () => {
  timer.forEach((timer) => {
    cancelAnimationFrame(timer);
  });
};

const reducer = (state = initState, action = {}) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return {
        category: action.payload,
        page: FIRST_PAGE,
        lastPage:
          mainStore.getState().pressType === MY
            ? 1
            : categoryNews[action.payload].length,
      };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_LASTPAGE":
      return { ...state, lastPage: action.payload };

    default:
      return state;
  }
};

// reducer를 정의하여 store에 넘겨준다.
export const listStore = new Store(reducer);

// reducer에서 사용될 action을 정의해준다.
export const setCategory = (payload) => ({ type: SET_CATEGORY, payload });
export const setListPage = (payload) => ({ type: SET_PAGE, payload });
export const setLastPage = (payload) => ({ type: SET_LASTPAGE, payload });
