import { createStore } from "./core/Store.js";

// 초기 state의 값을 정의해준다.
const initialState = {
    subscribeList: [],
};

// dispatch에서 사용될 type들을 정의해준다.
export const INIT_SUBSCRIBE = "INIT_SUBSCRIBE";
export const ADD_SUBSCRIBE = "ADD_SUBSCRIBE";
export const CANCEL_SUBSCRIBE = "CANCEL_SUBSCRIBE";

// reducer를 정의하여 store에 넘겨준다.
export const subscribeStore = createStore(
    (state = initialState, action = {}) => {
        let newState = [];

        switch (action.type) {
            case "INIT_SUBSCRIBE":
                return { subscribeList: action.payload };
            case "ADD_SUBSCRIBE":
                newState = {
                    subscribeList: [...state.subscribeList, action.payload],
                };
                return newState;
            case "CANCEL_SUBSCRIBE":
                newState = state.subscribeList.filter(
                    (item) => item.name !== action.payload
                );
                return { subscribeList: newState };
            default:
                return state;
        }
    }
);

// reducer에서 사용될 action을 정의해준다.
export const initSubscribe = (payload) => ({ type: INIT_SUBSCRIBE, payload });
export const addSubscribe = (payload) => ({ type: ADD_SUBSCRIBE, payload });
export const cancelSubscribe = (payload) => ({
    type: CANCEL_SUBSCRIBE,
    payload,
});
