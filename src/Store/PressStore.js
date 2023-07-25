import Store from "../utils/store(temp).js";

const initState = {
  pressArr: [],
};

export const ADD_PRESS = "ADD_PRESS";
export const REMOVE_PRESS = "REMOVE_PRESS";

const reducer = (state = initState, action = {}) => {
  switch (action.type) {
    case "ADD_PRESS":
      return { ...state, pressArr: action.payload };
    case "REMOVE_PRESS":
      return { ...state, pressArr: action.payload };
    default:
      return state;
  }
};

// reducer를 정의하여 store에 넘겨준다.
export const pressStore = new Store(reducer);

// reducer에서 사용될 action을 정의해준다.
export const addPress = (payload) => ({ type: ADD_PRESS, payload });
export const removePress = (payload) => ({ type: REMOVE_PRESS, payload });

export default pressStore;
