import { createStore } from "../core/Store.js";

const initState = {
  subscribe: [],
};

export const SET_SUBSCRIBE = "SET_SUBSCRIBE";
export const SET_UNSUBSCRIBE = "SET_UNSUBSCRIBE";

export const subscribeStore = createStore((state = initState, action = {}) => {
  const subscribeState = [...state.subscribe];

  switch (action.type) {
    case "SET_SUBSCRIBE":
      subscribeState.push(action.payload);
      return { ...state, subscribe: subscribeState };
    case "SET_UNSUBSCRIBE":
      return {
        ...state,
        subscribe: subscribeState.filter((item) => item !== action.payload),
      };
    default:
      return state;
  }
});

export const setSubscribe = (payload) => ({ type: SET_SUBSCRIBE, payload });
export const setUnSubscribe = (payload) => ({ type: SET_UNSUBSCRIBE, payload });
