import Store from "../utils/store(temp).js";

export const GRID = "grid";
export const LIST = "list";
export const ALL = "all";
export const MY = "my";

const initState = {
  viewType: GRID,
  pressType: ALL,
};

// dispatch에서 사용될 type들을 정의해준다.
export const SET_VIEW = "SET_VIEW";
export const SET_PRESS = "SET_PRESS";

const reducer = (state = initState, action = {}) => {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, viewType: action.payload };
    case "SET_PRESS":
      return { ...state, pressType: action.payload };
    default:
      return state;
  }
};

// reducer를 정의하여 store에 넘겨준다.
export const mainStore = new Store(reducer);

// reducer에서 사용될 action을 정의해준다.
export const setView = (payload) => ({ type: SET_VIEW, payload });
export const setPress = (payload) => ({ type: SET_PRESS, payload });
