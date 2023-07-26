import Store from "../utils/store(temp).js";

export const FIRST_CATEGORY = 0;

const initState = {
  category: FIRST_CATEGORY,
};

// dispatch에서 사용될 type들을 정의해준다.
export const SET_CATEGORY = "SET_CATEGORY";

const reducer = (state = initState, action = {}) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

// reducer를 정의하여 store에 넘겨준다.
export const listStore = new Store(reducer);

// reducer에서 사용될 action을 정의해준다.
export const setCategory = (payload) => ({ type: SET_CATEGORY, payload });
