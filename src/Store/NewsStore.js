import Store from "../utils/store(temp).js";
import { fetchNews, fetchPress } from "../api/fetchNews.js";

export const categoryNews = fetchNews();
export const pressNews = fetchPress();

const FIRST_PAGE = 1;
const initState = {
  page: FIRST_PAGE,
};

export const SET_PAGE = "SET_PAGE";

const reducer = (state = initState, action = {}) => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

// reducer를 정의하여 store에 넘겨준다.
export const pressStore = new Store(reducer);

// reducer에서 사용될 action을 정의해준다.
export const addPress = (payload) => ({ type: ADD_PRESS, payload });
export const removePress = (payload) => ({ type: REMOVE_PRESS, payload });
