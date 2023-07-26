import Store from "../utils/store(temp).js";

export const FIRST_PAGE = 1;

const initState = {
  currentPage: FIRST_PAGE,
};

// dispatch에서 사용될 type들을 정의해준다.
export const SET_PAGE = "SET_PAGE";
export const SET_LAST = "SET_LAST";

const reducer = (state = initState, action = {}) => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

// reducer를 정의하여 store에 넘겨준다.
export const gridStore = new Store(reducer);

// reducer에서 사용될 action을 정의해준다.
export const setPage = (payload) => ({ type: SET_PAGE, payload });
